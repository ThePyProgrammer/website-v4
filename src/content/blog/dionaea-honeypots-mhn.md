---
title: "~~money~~ honey is all you need: Deploying Dionaea Honeypots using the Modern Honeypot Network (MHN)"
date: "2023-09-02"
tags: [security]
category: security
excerpt: "Spinning up a Dionaea honeypot on Google Cloud with the Modern Honeypot Network, and watching 65,000 attacks roll in from around the world."
coverImage: "/img/blog/dionaea-mhn/honeymap.png"
splash: true
wip: true
---

```sidebar title="the cast"
| thing | what it is |
|---|---|
| **MHN** | Modern Honeypot Network, the admin layer that wires it all together |
| **Dionaea** | a malware-catching honeypot, GSoC 2009 baby |
| **Honeymap** | real-time world map that lights up when you get poked |
| `mhn-admin` | the GCP VM running the dashboard |
| `mhn-honeypot` | the VM that gets attacked (on purpose) |
| `hpfeeds` | the protocol the two VMs gossip on (port 10000) |
```

So here's a question: what happens if you put a server on the open
internet with a big neon "please attack me" sign on it? Turns out,
a lot. Like, about 1,500 attacks a day kind of a lot.

This is the story of how I stood up a [Dionaea](https://github.com/DinoTools/dionaea)
honeypot on Google Cloud for roughly a week in August 2023, watched
65,000+ attacks roll in, and tried to make sense of who was knocking
and why.

## What even is a honeypot?

A honeypot is a machine that exists to be compromised. That's it.
That's the whole gag. You set up a system that *looks* vulnerable,
park it on the internet, and wait for attackers to try to break in.
When they do, you log everything: where they came from, what ports
they hit, what payloads they dropped.

The trap is the point. The attacker thinks they're popping a box.
You think you're collecting free threat intel. Everyone wins, except
the attacker, who is actually the only one losing.

There's a zoo of honeypots out there:

- **Cowrie** fakes an SSH shell. Attackers log in, get a convincing
  mock console, and flail around while Cowrie records every keystroke.
- **Dionaea** is the one we care about today. It poses as a machine
  running a bunch of vulnerable services (SMB, HTTP, FTP, MSSQL, etc.)
  and specifically tries to catch malware samples.
- **ElasticHoney** pretends to be an old, exploitable Elasticsearch
  instance. Cute, but we didn't get to it this time.

We went with Dionaea because it promised actual malware samples, not
just connection logs. Spoiler: we got 19 samples in a week.

## The setup

The whole thing runs on the [Modern Honeypot Network
(MHN)](https://github.com/CSIRT-UMM/mhn), which is basically the
glue layer. You run one VM as the admin server (dashboard, map,
data aggregation) and any number of VMs as honeypots that report
back to it over `hpfeeds`.

Here's the topology:

```text
mhn-admin            mhn-honeypot
(dashboard, map)  ◄─ hpfeeds :10000 ─  (Dionaea, getting wrecked)
     ▲
     │ HTTP :80
     ▼
   you
```

Both VMs are `n1-standard-1` boxes running Ubuntu 20.04 in
`us-central1-f`, with 10GB standard disks. Nothing fancy.

### Firewall rules, because YOLO has limits

Before any of the VMs are useful, GCP needs to know which ports
to let through. Four rules, each targeting a specific VM tag:

| rule | ports | target | purpose |
|---|---|---|---|
| `http` | `tcp:80` | `mhn-admin` | dashboard at `/ui/dashboard` |
| `honeymap` | `tcp:3000` | `mhn-admin` | the live attack map |
| `hpfeeds` | `tcp:10000` | `mhn-admin` | honeypot reports home |
| `wideopen` | `tcp,udp 0.0.0.0/0` | `mhn-honeypot` | come at me |

That last one is the fun one. `wideopen` explicitly allows all TCP
and UDP traffic from anywhere in the world to the honeypot VM. This
is the "please attack me" sign. Do not, under any circumstances,
put this rule on a VM you care about.

Here's the `gcloud` incantation for `wideopen`:

```bash title="wideopen.sh"
gcloud compute firewall-rules create wideopen \
  --description="Allow TCP and UDP from Anywhere" \
  --direction ingress \
  --priority=1000 \
  --network=default \
  --action=allow \
  --rules=tcp,udp \
  --source-ranges=0.0.0.0/0 \
  --target-tags="mhn-honeypot"
```

### Bringing up the admin server

SSH into `mhn-admin`, then:

```bash title="install-mhn.sh"
sudo apt update && sudo apt install git python-magic -y
cd /opt/
git clone https://github.com/CSIRT-UMM/mhn
cd mhn/
# Pin Flask-SQLAlchemy to a version that actually installs
sudo sed -i 's/Flask-SQLAlchemy==2.3.2/Flask-SQLAlchemy==2.5.1/'g \
  server/requirements.txt
./install.sh
```

`install.sh` drops you into an interactive prompt. The important bits:

```text title="MHN install prompts"
Do you wish to run in Debug mode?: n
Superuser email: someone@something.somewhere   # don't use a real one
Superuser password: ****                        # ditto
Server base url: <enter>                        # accept default
Honeymap url:    <enter>
Mail server:     <enter> (decline TLS, SSL)
Path for log file: <enter>
Integrate with Splunk? n
Install ELK?        n
Add MHN rules to UFW? n
```

Heads up on that email and password: MHN stores them in plaintext
for internal auth, and the admin UI is exposed on port 80. Treat
this account as throwaway.

Once it finishes churning, the dashboard is live at
`http://<SERVER_IP>/ui/dashboard`.

### Bringing up the honeypot

This is where I hit the one annoying snag. Dionaea needs
`libemu-dev`, which is missing from the default Ubuntu 20.04 repos.
You have to grab the `.deb` files manually from the Ubuntu archive
before running MHN's deploy script:

```bash title="install-dionaea.sh"
sudo apt update

# Grab libemu from the universe archive
wget http://archive.ubuntu.com/ubuntu/pool/universe/libe/libemu/libemu2_0.2.0+git20120122-1.2build1_amd64.deb
wget http://archive.ubuntu.com/ubuntu/pool/universe/libe/libemu/libemu-dev_0.2.0+git20120122-1.2build1_amd64.deb

sudo apt install \
  ./libemu2_0.2.0+git20120122-1.2build1_amd64.deb \
  ./libemu-dev_0.2.0+git20120122-1.2build1_amd64.deb

# Paste the command the MHN dashboard gave you
# (Deploy tab > "Ubuntu/Raspberry Pi - Dionaea")
<deploy_command>
```

That's it. The moment this finishes, Dionaea starts listening on
a pile of ports and reporting back to `mhn-admin` over `hpfeeds`.

Within minutes, the Honeymap starts painting red dots.

## A week in the wild

I left the honeypot up for roughly seven days. Here's what the
Honeymap looked like by the end:

![Honeymap after 50 mins of running](/img/blog/dionaea-mhn/honeymap.png)

That's already a lot of red, and that was after *50 minutes*. By
the end of the week I had enough data to build a proper picture.

### Where the attacks came from

I pulled everything into a Pandas dataframe and threw it at `plotly`
and `folium`. The choropleth tells the headline story:

![Choropleth of attacks by country](/img/blog/dionaea-mhn/choropleth.png)

And the heatmap shows where the hotspots actually concentrate:

![Heatmap of attack origins](/img/blog/dionaea-mhn/heatmap.png)

The top 10 attacking cities were genuinely surprising:

*Top 10 cities by attack count:*

| rank | city | attacks | favourite port | duration |
|---|---|---|---|---|
| 1 | Frankfurt am Main, Germany | 14,236 | 1900 only | 20 minutes |
| 2 | Suqian, Jiangsu, China | 14,147 | 1900 only | 9 hours |
| 3 | Ryazan', Russia | 5,901 | 445 (5,893x) | ~4 days |
| 4 | Thiruvananthapuram, India | 4,299 | 445 (4,277x) | 1 day |
| 5 | Lima, Paraguay | 3,878 | 445 (3,876x) | 37 minutes |
| 6 | Hillsboro, Oregon, USA | 3,687 | 1900 only | 52 minutes |
| 7 | Shijiazhuang, China | 1,462 | 445 (1,439x) | ~5 days |
| 8 | Los Angeles, USA | 1,372 | port sweep | 14 hours |
| 9 | Mexico City, Mexico | 1,012 | 445 (1,010x) | 3 minutes |

Frankfurt sent 14,236 hits in **20 minutes**. That's 711 per minute,
or almost 12 a second, from one city, all hammering port 1900 and
only port 1900. That's not a person. That's a script.

### Two ports tell most of the story

Across the entire dataset, two ports dominated:

```text
port 1900: 32,263 attacks  ████████████████████████████████
port  445: 18,695 attacks  ███████████████████
everything else:           ▌
```

Port **1900** is SSDP (Simple Service Discovery Protocol), and the
classic abuse pattern here is an [SSDP reflection/amplification
DDoS](https://www.cloudflare.com/learning/ddos/ssdp-ddos-attack/).
Attackers spray SSDP probes at the internet looking for devices
that will happily reflect amplified traffic at a victim. The
Frankfurt, Suqian, and Hillsboro bursts all smell like this.

Port **445** is SMB, and attacks here are almost always scanning
for unpatched Windows file-sharing vulnerabilities (think EternalBlue
and friends). [SMB scanning
101](https://www.hackingarticles.in/smb-penetration-testing-port-445/)
if you want a refresher. The Russia, India, Paraguay, and Mexico
traffic all fit this profile.

### The country leaderboard

At the country level, the USA ran away with it by volume:

*Attacks per country:*

| country | attacks | top port | main region |
|---|---|---|---|
| USA | 40,151 | 1900 (3,726x) | South Carolina |
| China | 18,470 | 1900 (14,152x) | Jiangsu |
| Germany | 16,101 | 1900 (14,280x) | Hesse |
| UK | 14,162 | 10255 (122x) | England |
| Russia | 10,773 | 445 (5,949x) | Ryazan Oblast |
| Netherlands | 8,794 | 8080 (285x) | North Holland |
| India | 5,349 | 445 | Kerala |
| Paraguay | 3,884 | 445 (3,881x) | San Pedro |
| Bulgaria | 2,657 | 9401 (12x) | Sofia-Capital |

Not a shock. High internet penetration plus cheap compute plus
lots of compromised-and-reused infrastructure gets you a lot of
outbound scanning.

### The actual malware

The whole reason we picked Dionaea over Cowrie was the promise of
catching real samples. Over the week we got **19 samples**, all
delivered via `microsoft-ds` (the Windows SMB service on port 445),
which is consistent with Windows executable payloads. Most of them
came from Vietnam and Indonesia.

I *wanted* to detonate these in a Cuckoo Sandbox and see what each
one did, but sandboxing takes more VM horsepower than I had
budgeted. So those samples are sitting in cold storage, waiting
for a rainy weekend.

## What this actually taught me

Three things stuck:

1. **The internet is noisy, mostly automated, and always on.** 1,500
   attacks a day, on a random GCP VM with no DNS record, no published
   IP, nothing. You don't have to advertise. They find you.

2. **Two ports carry most of the load.** SSDP reflection (1900) and
   SMB scanning (445) make up most of the traffic, which means
   closing or hardening those two ports blocks most of the
   background radiation you'll ever see.

3. **Attribution is hard.** "Attacks from Germany" mostly means "a
   compromised box in Germany is reflecting traffic from somewhere
   else." The city-level data is about infrastructure geography,
   not attacker geography.

## What I'd do next

Stuff I didn't get to, in roughly the order I'd pick them up:

- **Run the 19 samples through Cuckoo** on a beefier VM. Find out
  what we actually caught.
- **Add a Cowrie honeypot** alongside Dionaea. SSH brute-force
  traffic is a totally different flavour from SMB scanning, and MHN
  handles multiple honeypots out of the box.
- **Try ElasticHoney.** Elasticsearch-targeted attacks are much
  more targeted and much less noisy, which would be a nice contrast
  to the SSDP/SMB firehose.
- **Plot attacks over time per city.** The burst from Frankfurt
  happened in a 20-minute window. What was the shape of that window?

## Want to try it yourself?

Everything here is reproducible with a free-tier GCP account, one
afternoon, and a healthy disregard for what ends up in your VM's
logs.

The MHN fork I used (patched for Ubuntu 20.04) is at
[`CSIRT-UMM/mhn`](https://github.com/CSIRT-UMM/mhn). The setup is
the two algorithms above, in order, and the dashboard does
basically everything else.

Fair warning: once your honeypot IP leaks into scanner botnets'
target lists, it stays there for a while. Tear it down when you're
done, or you'll keep paying GCP egress to be a punching bag.

Happy honeypotting.
