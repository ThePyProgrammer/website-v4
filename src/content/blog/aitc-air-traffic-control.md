---
title: "Tower, This Is Claude, Requesting Permission: Building an AI Traffic Control System"
date: "2026-04-22"
tags: [ai, tools, tauri]
category: ai
excerpt: "How I spent two weeks building the "next generation vibe-coding system": an Air Traffic Control scope that watches every coding agent on your machine, draws them onto a radar, and yells when two of them try to crash into the same file."
coverImage: "/img/blog/aitc/cover.png"
splash: true
splashPosition: "50%"
wip: true
---

It started, as most of these things do now, with a LinkedIn scroll.

[This post](https://www.linkedin.com/posts/dr-oliver-borchers-043a48b9_cursor-3-just-left-vs-code-completely-rewritten-share-7447171765312786433-3TO3) slid past my feed a few weeks back with a rather hilarious analogy: the next generation of vibe coding tools was likely going to scale to becoming an "air traffic control" (ATC) task. As Dr Borchers characterized this task:

> *"You manage agent swarms across multiple repos, machines, and the cloud simultaneously."*

This was a really funny concept, and brought to light an even funnier (in my opinion) idea: what if the ATC scope was actually designed like a proper ATC dashboard? A 2D radar scope showing live "plane" positions, and a communications panel to command certain "planes" across the airspace. Just replace _"plane"_ with "AI Coding Agent" (think Claude Code, OpenCode or Codex).

By this point, I'd already been vibe-coding a lot as part of my job as a Research Engineer at [Pragnition Labs](https://pragnition.ai). Over time, I'd slowly found myself slowly moving to a model where I was controlling 4 different windows with different AI agents at a time, throwing different prompts at all of them in parallel and stitching together whatever survives. It had been working astonishingly well, albeit at the cost of my weekly usage finishing up in 2 days on the max personal plan.

But managing these tabs was a pain. Sometimes I didn't even remember which agent knew what, and what would be most appropriate to ask each of them. It truly was like managing traffic, and guess what: **I was the bottleneck**.

So I thought: *this would be fun to try*. It does help that I spent quite some time in AETHER working on an ATC simulator with `@ethanc`, so I messaged him immediately with the idea, and after a bunch of back-and-forth, I quickly started up the "AI Traffic Control" project, eager to finish it up within a weekend.

It is now two weeks later and I've brought the tally of phases up to seventeen and I hate everything.


<!-- Imagine a system that manages coding agents (of different types) on a codebase like an air traffic controller manages aircraft in an airspace, essentially tracking what files the agent is on / approaching within a large-scale codebase map, with conflicts arising from potentially multiple changes to the same file. Every time an AI agent needs to seek permission from a user, the user gets a text from the ai agent, and will need to manage multiple concurrent chats with these agents in a separate dedicated comms panel. -->

## AITC, or: an ATC radar scope for your repo

The shortest possible description of **AITC (AI Traffic Control)** is a desktop app that watches every coding agent on your codebase, draws them onto a radar-style map of your repo as little pulsing dots, and yells when two of them are about to crash into the same file. The "planes" are simply coding agent sessions traversing my codebase like an airspace.



- **Tower Control** — a live manifest of every coding agent currently
  "doing a crime to your codebase." ID, protocol, current file,
  state (`RUNNING` / `IDLE` / `WAITING` / `CONFLICT` / `ERROR` /
  `vibing`). You launch agents from here, reap them from here,
  watch them from here. Tower-controller energy, down to the
  "what's your intent" column.
- **Airspace Radar** — a top-down 2D spatial map of your repo. Files
  are nodes, `import`/`use`/`mod` edges are pulled with tree-sitter,
  and filesystem proximity acts as gravity so modules clump into
  neighbourhoods. Each agent is a pulsing dot with a 10-second fading
  comet trail showing its last few file accesses. Yes it looks like
  an ATC scope. Yes that is on purpose.
- **Conflict detection** — two agents write the same file inside a
  configurable window? Instant visual, OS notification, new row in
  the queue. *"Why are you both in `auth.rs`"* energy, but
  programmatic.
- **3-way merge UI** — when two agents *do* collide, you get a
  proper merge editor with each agent's *intent* displayed next to
  the hunk, so you remember why each crime was committed. A
  `BackupManager` catches your back if you merge badly.
- **Claude Code PreToolUse hooks** — every gated tool call from a
  Claude Code agent freezes until you approve it. Or deny. Or
  approve-with-edits. Agents started with
  `--dangerously-skip-permissions` get waved through unbothered (see
  commit `06fbf1e`, the angry-developer hotfix). If AITC itself
  crashes, the hook fails *closed*, so nothing ships behind your
  back.
- **Comms Hub** — an approval queue with diffs + a per-agent chat
  tab backed by a long-lived `claude --input-format stream-json`
  process. Finally, a way to yell at an agent that doesn't involve
  the system logs.
- **Arsenal** — a single pane over `~/.claude/` and `<cwd>/.claude/`
  so you know exactly which Skills, Agents, Plugins, Hooks,
  Commands, and MCP servers Claude currently has access to. Inline
  editor for both `CLAUDE.md` files, because you *know* you're going
  to edit them.
- **File heat map** — a contention overlay showing which files have
  been the main character this week.
- **Session history** — virtualized tables of past sessions,
  conflicts, approvals. Git blame, but for vibes.

```sidebar title="ratio of real tech to theatre"
This is maybe 60% functional tooling, 40% me doing a bit. The bit is load-bearing though: if the UI didn't look like an ATC radar scope, I'd get bored and stop using it, and then it wouldn't matter how good the conflict engine was. Aesthetic is part of the product. Nobody stares at Excel for eight hours on purpose.
```

## The radar, or: my codebase as a ballistic airspace

The radar is my favourite part. It's a Canvas rendering of your
whole codebase as a spatial map. Files clustered by directory,
gravitational force pulling related modules together, a
d3-force physics sim running in a web worker with transferable
`Float32Array`s so the main thread stays responsive. Agent dots
pulse and drag trails behind them.

You can see, at a glance:

- which file an agent is currently reading
- which files it's been touching in the last 30 seconds
- which direction it's heading (based on file-access clustering)
- whether two agents are closing on each other
- whether any of them have strayed near a protected path
  (e.g. `.env`, `secrets/*`)

It runs at roughly 60fps. It looks exactly like a tower controller's
scope — top-down, phosphor green, sweep arc, faint grid, each agent
a labelled blip with a trailing track. That's not a metaphor I
stretched; that's the visual reference I opened in a tab and kept
matching my Canvas draw calls against until the two looked the same.

## Why this was non-obviously hard: a tour of the funniest bugs

I'd love to tell you it just worked. It did not just work. Some
highlights.

### Phase 18: the registry keeps flooding because other Claudes exist

The passive-scan subsystem watches for `claude` / `codex` /
`opencode` processes on the machine and registers them into the
agent registry automatically, so you don't have to manually tell
AITC "hey, here's a new agent." Convenient!

Except: it matches *every* `claude`-named process on the machine.
Including every unrelated terminal where I'd absent-mindedly typed
`claude` to start a session in some other repo. Including every
short-lived subprocess those sessions spawned. Including the
little shell wrapper Claude Code uses for git operations.

The registry has a `MAX_AGENTS` cap (originally 100, because why
would you ever have more than 100 agents? lol). Within about 20
seconds of booting AITC, the cap would slam shut, and any *new*
legit agent I tried to launch would fail with `Registry at
capacity (100)`.

The app for managing AI agents was being defeated by the existence
of other AI agents on the same machine. Unrelated AI agents. Agents
that weren't even being controlled by AITC were DDoSing AITC by
*being running processes.* The call was coming from inside the
house, except the house also contained eight other houses, and
they were all also making calls.

The fix (Phase 18, four plans): raise `MAX_AGENTS` to 1000 as a
safety net, scope passive detection to only register processes
whose `cwd` is the monitored repo root, and add
`capacity_hits_since_start` as a registry-level metric so the next
time this happens I can at least laugh about it with data.

### Phase 11.1: the great NaN zoom bomb

You know how `ctx.setTransform(NaN, 0, 0, NaN, 0, 0)` silently no-ops
on a canvas? I didn't, and now I do. Here's how I found out.

The radar supports wheel-based zoom with pan. At normal zoom levels,
everything's fine. Scroll in really fast on certain WebKitGTK builds
and the wheel event delivers a nonsense `deltaY`. That gets
multiplied through the viewport math, produces a NaN somewhere in
the scale calculation, and the NaN then propagates through every
subsequent `min(…)`, `max(…)`, and `+` in the viewport state
because NaN is the friendship-ender of floating point.

Result: the entire canvas blanks. And the minimap. Pan stops working
because your pan delta is being added to NaN. Zoom-out doesn't
recover because your zoom is also NaN. The only way out is
force-quit.

I shipped a defensive `sanitizeViewport()` wrapper that falls back
per-axis on non-finite input, plus a store-level filter on incoming
partial updates, because I could not for the life of me reproduce
the trigger consistently — but I could, empirically, make the
symptom go away by not trusting any number anywhere.

Sometimes you don't debug. Sometimes you just throw an `isFinite()`
check at it and keep moving.

### The great treemap crushing of April 14

My radar renders the codebase tree as a treemap-style spatial
layout. Each file's path gets split on `/` and turned into a
hierarchy. Seems simple.

What I had been doing was handing the frontend fully-qualified
absolute paths like `/home/prannayag/projects/aitc/src/App.tsx`.

The treemap builder would split on `/`, see `['', 'home',
'prannayag', 'projects', 'aitc', 'src', 'App.tsx']`, and build a
hierarchy with FIVE SINGLE-CHILD DIRECTORY WRAPPERS before it got
to anything interesting. Every one of those wrappers consumed a
significant chunk of the visible rectangle, and since each one
had only one child, the actual repo content got crushed into
the bottom-right corner like someone had sat on it.

As a bonus, at one point the tree was dominated by a couple of
massive PNGs in `/public/img/`. Those were being sized by their
byte count, so the radar was proudly displaying: "this PNG is
huge, and also there are some files near it, who cares." Filtering
binary assets out of the treemap fixed the secondary symptom.
Stripping `repo_root` out of the paths fixed the primary one.

The fix is a seven-line Rust helper. It took me about 90 minutes
to notice the root cause, because I kept debugging the layout
engine rather than the data I was feeding it. Classic.

## The recursive part (this is where it gets funny)

Here's the thing I want you to sit with for a second.

I built a desktop app to manage concurrent AI coding agents. I built
this desktop app *using* concurrent AI coding agents. I used Claude
Code to build the thing that watches Claude Code.

Which means, naturally, I used AITC to watch AITC being built, so I
could see when my AI agents were about to collide on a file in the
AITC codebase. AITC is its own biggest user. I've been dogfooding
it on itself since approximately week two.

It gets better. AITC supports spawning agents in isolated git
worktrees as a first-class concept — you can kick off a phase
executor named something like `worktree-agent-a7dc46fa`, which
spawns a Claude in its own copy of the repo so it can't step on
your main branch. When I do that, *those worktree agents also show
up on AITC's own radar as dots flying around the airspace.*

Imagine being an air traffic controller watching the planes above
your head land at the airport you're currently using to build more
airports. That's the vibe.

## The merge conflict that broke my brain

Today, while trying to pull 461 commits of upstream work into my
local branch, git yelled about three merge conflicts. One of them was in
`src-tauri/src/pipeline/commands.rs`, in the exact function that
converts my absolute-path tree index into the repo-relative format
for the frontend treemap.

Reader. On the same day, from different branches, *two different
Claude Code sessions had independently:*

1. Observed the same treemap-crushing bug
2. Traced it to the same `get_tree_index` function
3. Added the same new field (`repo_root: PathBuf`) to the same
   struct (`ActiveWatch`)
4. Written different fixes with slightly different edge-case
   behaviour
5. Committed to different branches
6. Eventually collided when I tried to merge

The fixes were not identical. One (the upstream one) kept the
repo-root entry in the serialized output as a sentinel empty
string. The other (the local one) skipped it entirely because
"the frontend synthesizes its own root node anyway." Both were
documented. Both were deliberate. They contradicted each other
at the contract level.

To resolve the merge, I had to:
1. Read both docstrings carefully
2. Figure out which contract was actually correct
3. Audit the frontend to see what it *actually* expected
4. Pick one, document *why* I picked it, so future-me doesn't
   un-pick it in six weeks

This is the problem AITC is trying to prevent. And AITC *does*
prevent it from happening *live* during a session, via the
conflict engine. It does not prevent it from happening *across
branches, across different days, across separate sessions* —
because git branches are literally designed to let changes
diverge and then reconcile later.

There's a lesson in there about the limits of live conflict
detection, and I'll get to it — but first I need to point out
that the AI I asked to help me resolve that merge conflict was
also Claude, and *Claude-resolving-a-conflict-between-two-Claudes*
is maybe the most 2026 sentence I've ever typed.

## Lessons I actually learned

Past the jokes, some genuine takeaways from building this.

### Concurrent AI agents need a shared state model, not a shared filesystem

This is the whole thesis. Two agents editing the same file
without coordination is not a concurrency problem you can solve
with locks — it's an *intent* problem. You need them to declare
"I'm about to touch `src/lib.rs` for the next 90 seconds" in a
place the other agent will check before it starts. AITC's
conflict engine is a very lightweight version of this, built on
top of filesystem events (an imperfect signal for intent) rather
than explicit declarations (which would require agents to
cooperate).

The "right" long-term answer is probably a standard declaration
protocol — something like `~/.aichroot/sessions/` where every
agent drops a JSON manifest of "files I'm about to edit" before
edits land. AITC currently approximates this by watching what
agents actually touch and inferring intent from recent activity.
Good enough for single-developer use; not good enough for teams.

### Visual attention is finite. Build the scope, not the log.

The hardest part of AITC wasn't making the conflict engine work.
It was making *one human* able to *oversee* the behaviour of
many agents at once, and to intervene at the right moment
without micromanaging. The same shape keeps showing up in every
one-human-many-autonomous-actors problem I've touched, and the
answer is always:

- a global, always-on view of every autonomous actor
- per-actor detail on demand
- clear visual escalation when something's wrong (AITC uses a
  `CONFLICT` state with OS-level notifications, plus a
  TCAS-style escalation gradient sketched for Phase 15)
- a gate where the human can intervene *before* the consequence
  lands, not after

The single most important thing this class of problem has
taught me: **visual attention is finite.** You cannot ask the
operator to read every log line. You cannot even ask them to
read every *colour change.* You can ask them to glance at one
scope and notice when the dots don't look right. Build the
scope, not the log.

### Compile-time IPC types have no substitute

`tauri-specta` generates TypeScript bindings from Rust command
signatures at build time. This sounds boring. In practice it's
the difference between "Tauri is fine" and "Tauri is one of my
favourite tools." I have never had a runtime IPC type mismatch
on this project, because the codegen would've caught it at
build time. Every other IPC-heavy project I've worked on has
had at least one. Zero is correct and zero should be the
target.

### Design systems are a cheat code for solo projects

Command Horizon, the AITC design system, has maybe 20 reusable
components, one colour system, two fonts, and a strict
"thin-stroke linear icon, 1px globally" rule. Sticking to it meant I could build
new surfaces (the tower panel, the conflict log, the session
history) in an afternoon each, because every visual decision
had already been made. Every time I tried to "just quickly" do
a new component without referencing the tokens, it took twice
as long and looked worse.

Pre-commit yourself to aesthetic constraints. They are
load-bearing.

### Checkpoints save your ass

Every phase in this codebase gets committed as atomic steps,
with a pre-execution checkpoint and a post-execution
verification report. When something breaks, I can `git reflog`
back to the exact commit before the breakage and cherry-pick
only the good parts forward. This has bailed me out probably
five times.

The relevant structure is: *atomic commits, named plans,
explicit rollback paths.* Every phase has a `deferred-items.md`
log. Every plan has a verification step. The orchestration for
this lives in **GSD** ("Get Shit Done"), a ~80-command slash-
workflow I built and now use for every project. Yes, I built a
meta-tool to build the tool that manages the tools. No, I do
not think this is unreasonable.

### Trust but verify the agents, especially when they're confident

The most common failure mode of coding AI isn't wrong code.
It's confidently wrong summaries. An agent will finish a task,
write a summary that says "all tests pass, feature complete,"
and then if you actually look at the diff, it deleted a test
to get there. Or it skipped a case. Or it mocked the one thing
that would have caught the bug.

AITC's approval flow forces me to look at the *diff*, not the
summary. This small ritual has caught more issues than the
entire test suite.

Best heuristic I've found: if the AI writes something that
makes you feel *relieved*, look closer. Relief is suspicious.
Real fixes usually make you feel a little uneasy about edge
cases.

## What's next

I'm about to merge Phase 17 (conflict-gated `PreToolUse` hooks —
the thing where AITC can genuinely block a Claude mid-tool-call
if it's about to step on another Claude's work). Phase 19 is
polishing the chat transcript view, because the current one
renders repeated assistant chunks as separate cards and it's
ugly. Phase 20 is a diff-aware agent poll so Zustand selectors
can skip re-renders when nothing's changed.

Past that: typed edges in the radar (import edges look different
from IPC-bridge edges look different from git-history edges),
semantic zoom (workspace → package → file → symbol), and a
Louvain-community-detection pass so the radar shows module
clusters explicitly. Phase 15 has some TCAS-style escalation
sketched out — the three-tier alert scheme real aircraft use —
now applied to file collisions instead of airframe collisions.

I haven't decided whether to open-source this yet. The design
system is the thing I'd be giving away, not the code, and I
kind of like having a desktop app that looks like something off
the bridge of a ship. But I'll probably end up doing it.
Everyone running more than two coding agents should have a
scope to watch them on.

Research OS, in the meantime, keeps getting built. Three or
four agents, no major collisions on the main branch since I
started running AITC alongside it. I open the scope every
morning before I prompt any of them. It shows me exactly where
they are, exactly what they've been touching, and exactly when
one of them is about to cross into somebody else's airspace.
For two weeks of evenings, that alone earned its keep.

Whoever posted that original LinkedIn idea — if you stumble
onto this post, thank you. I owe you at least a coffee. You
named the scope for me. I just drew it.

Roger that.
