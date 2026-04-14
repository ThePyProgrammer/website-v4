import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { ArrowDown, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { workExperience } from '@/data/experience';
import { researchProjects } from '@/data/research';
import { projects } from '@/data/projects';
import { clubExperience } from '@/data/clubs';
import { experienceContent, researchContent, clubsContent, reccsContent } from '@/content';
import { MarkdownContent } from '@/components/MarkdownContent';
import { ScanlineOverlay } from '@/blog/components/ScanlineOverlay';
import '@/blog/blog.css';

const contactLinks = [
  { href: 'mailto:prannayagupta@programmer.net', text: 'prannayagupta@programmer.net', Icon: Mail },
  { href: 'https://github.com/ThePyProgrammer', text: 'github.com/ThePyProgrammer', Icon: Github },
  { href: 'https://www.linkedin.com/in/prannaya-gupta', text: 'linkedin.com/in/prannaya-gupta', Icon: Linkedin },
  { href: 'https://x.com/PrannayaG', text: 'x.com/PrannayaG', Icon: Twitter },
  { href: '/cv.pdf', text: 'My Resume', Icon: FileText },
];

const sectionAccent = {
  experience: { hex: '#00d4fd', text: 'text-[#00d4fd]', bg: 'bg-[#00d4fd]/15' },
  research: { hex: '#ff2e63', text: 'text-[#ff2e63]', bg: 'bg-[#ff2e63]/15' },
  projects: { hex: '#ffd93d', text: 'text-[#ffd93d]', bg: 'bg-[#ffd93d]/15' },
  clubs: { hex: '#ff58e7', text: 'text-[#ff58e7]', bg: 'bg-[#ff58e7]/15' },
} as const;

type Accent = typeof sectionAccent[keyof typeof sectionAccent];

function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0e0e10]/90 backdrop-blur z-50 flex justify-between items-center px-8 border-b border-[#262528]">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-[#00d4fd] drop-shadow-[0_0_8px_rgba(0,212,253,0.4)] font-headline tracking-tighter uppercase">
          [prannay.dev]
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-headline tracking-tighter uppercase text-sm text-[#00d4fd]/60 hover:text-[#00d4fd] hover:bg-[#00d4fd]/10 px-2 py-1 transition-colors">[ home ]</Link>
          <Link to="/blog" className="font-headline tracking-tighter uppercase text-sm text-[#00d4fd]/60 hover:text-[#00d4fd] hover:bg-[#00d4fd]/10 px-2 py-1 transition-colors">[ blog ]</Link>
          <span className="font-headline tracking-tighter uppercase text-sm text-[#00d4fd] border-b-2 border-[#00d4fd] pb-1 px-2 py-1">[ about ]</span>
        </nav>
      </div>
      <div className="hidden lg:flex items-center bg-[#1f1f22] px-3 py-1 text-[#00d4fd] text-[10px] font-mono">
        SYS_STATUS: OPTIMAL
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(/img/cern.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/50 via-[#0e0e10]/60 to-[#0e0e10]" />
      <ScanlineOverlay className="z-10 opacity-40" />

      <div className="relative z-20 pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap gap-2 items-center mb-6 font-mono text-sm">
            <span className="text-[#00d2fd] font-bold">prannay@terminal</span>
            <span className="text-[#adaaad]">:</span>
            <span className="text-[#ff58e7]">~</span>
            <span className="text-[#adaaad]">$</span>
            <span className="text-[#f9f5f8]">whoami</span>
          </div>

          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6 text-[#f9f5f8]">
            <span className="text-[#00d4fd] mr-3">[#]</span>MY_NAME_IS<br />
            <span className="text-[#00d4fd]">PRANNAYA_GUPTA</span>
          </h1>

          <p className="font-headline text-2xl md:text-3xl tracking-tight text-[#adaaad]">
            <span className="text-[#ff58e7]">{'>'}</span> I'm a{' '}
            <span className="text-[#f9f5f8]">
              <ReactTyped
                strings={['Student', 'Developer', 'Engineer', 'Researcher']}
                typeSpeed={100}
                backSpeed={50}
                backDelay={2000}
                loop
              />
            </span>
            <span className="cursor-blink inline-block w-2 h-6 md:h-8 bg-[#00d4fd] ml-1 align-middle" />
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="mt-24 flex items-center gap-2 text-[#00d4fd]/60 font-headline text-xs uppercase tracking-widest"
        >
          <ArrowDown className="h-4 w-4" />
          <span>scroll_to_continue</span>
        </motion.div>
      </div>
    </section>
  );
}

function BioTerminal() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 max-w-6xl mx-auto">
      <div className="bg-black relative border border-[#48474a]/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <ScanlineOverlay className="z-10" />

        <div className="flex items-center justify-between px-4 py-2 bg-[#262528] border-b border-[#48474a]/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-[#d53d18]" />
            <div className="w-3 h-3 bg-[#00677e]" />
            <div className="w-3 h-3 bg-[#00b8e0]" />
          </div>
          <div className="text-[#00d4fd]/60 font-headline text-[10px] tracking-widest uppercase">
            USER_SESSION: prannay@watchtower
          </div>
          <div className="flex gap-3 text-[#00d4fd]/40 text-xs">
            <span>-</span><span>□</span><span>×</span>
          </div>
        </div>

        <div className="p-6 md:p-10 font-mono text-[#00d4fd] text-sm md:text-base leading-relaxed relative z-20 space-y-12">
          <div>
            <Prompt>cat bio.txt</Prompt>
            <div className="text-[#00d4fd]/90 space-y-4 font-body md:max-w-3xl border-l border-[#00d4fd]/20 pl-6">
              <p>
                <span className="text-[#00d4fd] mr-2">[#]</span>
                I am a recent graduate of the <BioLink href="https://www.nushigh.edu.sg/">NUS High School of Math and Science</BioLink>.
                I recently completed my National Service at the <BioLink href="https://rsaf-agile-inno-digital.defence.gov.sg/">RSAF Agile Innovation Digital (RAiD)</BioLink> as an AI Researcher under the AETHER Branch.
                I also currently serve as the Youth Community Lead at <BioLink href="https://better.sg/">better.sg</BioLink>, as part of the larger volunteer-composed executive committee.
              </p>
              <p>
                <span className="text-[#00d4fd] mr-2">[#]</span>
                I have previously conducted research at <BioLink href="https://github.com/walledai">Walled AI Labs</BioLink> as a volunteer research assistant while serving my NS obligations.
                I also served as the Overall-in-Charge at <BioLink href="https://buildingblocs.sg/">BuildingBloCS</BioLink> in 2023, and as president of NUS High's computing club, <BioLink href="https://nush.app/">AppVenture</BioLink>.
              </p>
            </div>
          </div>

          <div>
            <Prompt>ls -la ~/links</Prompt>
            <div className="space-y-2 text-[#00d4fd]/80 text-sm font-mono">
              {contactLinks.map(({ href, text, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-[#00d4fd] transition-colors group"
                >
                  <span className="text-[#00d4fd]/40">drwxr-xr-x</span>
                  <Icon className="h-4 w-4 text-[#00d2fd] group-hover:text-[#00d4fd]" />
                  <span className="text-[#00d2fd] group-hover:text-[#00d4fd] underline decoration-dotted underline-offset-4">{text}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[#00d2fd] font-bold">prannay@terminal</span>
            <span className="text-[#adaaad]">:</span>
            <span className="text-[#ff58e7]">~</span>
            <span className="text-[#adaaad]">$</span>
            <div className="w-2.5 h-5 bg-[#00d4fd] cursor-blink" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BioLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-[#ff58e7] hover:text-[#00d4fd] underline decoration-dotted underline-offset-4 transition-colors">
      {children}
    </a>
  );
}

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-2 items-center mb-6 font-mono">
      <span className="text-[#00d2fd] font-bold">prannay@terminal</span>
      <span className="text-[#adaaad]">:</span>
      <span className="text-[#ff58e7]">~</span>
      <span className="text-[#adaaad]">$</span>
      <span className="text-[#f9f5f8]">{children}</span>
    </div>
  );
}

function SectionHeader({ index, heading, count, accent }: { index: number; heading: string; count: number; accent: Accent }) {
  return (
    <div className="flex items-baseline gap-4 mb-10">
      <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tighter text-[#f9f5f8]">
        <span className={accent.text}>{String(index).padStart(2, '0')}_</span>{heading}
      </h2>
      <span className="h-[2px] flex-1 bg-[#262528]" />
      <span className="font-headline text-xs text-[#767577] uppercase tracking-widest">
        {count} {count === 1 ? 'entry' : 'entries'}
      </span>
    </div>
  );
}

function ExperienceSection() {
  const accent = sectionAccent.experience;
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={1} heading="EXPERIENCE" count={workExperience.length} accent={accent} />
      <div className="space-y-12">
        {workExperience.map(exp => (
          <article
            key={exp.slug}
            className="bg-[#131315] border-l-2 border-transparent hover:border-[color:var(--accent)] transition-colors p-6 md:p-8"
            style={{ ['--accent' as string]: accent.hex }}
          >
            <header className="flex items-start gap-4 mb-6">
              <img src={exp.iconUrl} alt={exp.title} className="w-12 h-12 object-contain bg-[#0e0e10] p-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className={`font-headline text-xl md:text-2xl font-bold tracking-tight ${accent.text}`}>
                  {exp.title}
                </h3>
                <p className="font-headline text-xs text-[#767577] uppercase tracking-widest mt-1 tabular-nums">[{exp.timeline}]</p>
              </div>
            </header>

            <div className="prose-invert max-w-none text-[#adaaad] leading-relaxed markdown-cyber">
              <MarkdownContent content={experienceContent[exp.slug] ?? ''} />
            </div>

            {exp.images.length > 0 && (
              <div className="mt-8">
                <h4 className="font-headline text-[10px] text-[#767577] uppercase tracking-widest mb-3">// gallery</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {exp.images.map(img => (
                    <img key={img} src={img} alt="" className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  ))}
                </div>
              </div>
            )}

            {exp.reccs.length > 0 && (
              <div className="mt-8">
                <h4 className="font-headline text-[10px] text-[#767577] uppercase tracking-widest mb-3">// recommendations</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {exp.reccs.map(r => (
                    <div key={r.slug} className="bg-[#0e0e10] border border-[#262528] p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img src={r.avatarUrl} alt={r.name} className="w-12 h-12 object-cover rounded-full" />
                        <div className="flex-1 min-w-0">
                          <a href={r.link} target="_blank" rel="noreferrer" className={`font-headline font-bold text-sm ${accent.text} hover:underline block`}>
                            {r.name}
                          </a>
                          <p className="text-[10px] text-[#767577] uppercase font-headline tracking-widest">{r.relationship} // {r.role}</p>
                          <p className="text-[10px] text-[#adaaad] font-mono mt-1">{r.currentJob}</p>
                        </div>
                      </div>
                      <div className="text-[13px] text-[#adaaad] leading-relaxed italic border-l border-[#262528] pl-3 markdown-cyber">
                        <MarkdownContent content={reccsContent[r.slug] ?? ''} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function ResearchSection() {
  const accent = sectionAccent.research;
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={2} heading="RESEARCH" count={researchProjects.length} accent={accent} />
      <div className="space-y-16">
        {researchProjects.map(p => (
          <article
            key={p.codename}
            className="bg-[#131315] border-l-2 border-transparent hover:border-[color:var(--accent)] transition-colors"
            style={{ ['--accent' as string]: accent.hex }}
          >
            {p.cover && (
              <div className="relative h-56 md:h-64 overflow-hidden bg-black">
                <img src={p.cover} alt="" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#131315]" />
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 ${accent.bg} ${accent.text} text-[10px] font-headline uppercase border border-[color:var(--accent)]/30`}>[research]</span>
                <span className="px-2 py-0.5 bg-[#262528] text-[#adaaad] text-[10px] font-headline uppercase tabular-nums">{p.timeline}</span>
              </div>

              <h3 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-[#f9f5f8] mb-2">
                {p.title}
              </h3>
              <p className="text-[#adaaad] text-sm md:text-base leading-relaxed mb-4">{p.subtitle}</p>

              {p.awards.length > 0 && (
                <ul className="space-y-1 mb-4">
                  {p.awards.map((a, i) => (
                    <li key={i} className={`font-headline text-[11px] uppercase tracking-widest ${accent.text}`}>
                      [*] <MarkdownInline text={a} />
                    </li>
                  ))}
                </ul>
              )}

              {p.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-[#0e0e10] border border-[#262528] hover:border-[color:var(--accent)] transition-colors px-3 py-1.5 text-[11px] font-headline uppercase tracking-widest text-[#adaaad] hover:text-[#f9f5f8]"
                    >
                      <img src={l.icon} alt="" className="h-4 w-4 object-contain" />
                      {l.text}
                    </a>
                  ))}
                </div>
              )}

              {researchContent[p.codename] && (
                <div className="text-[#adaaad] leading-relaxed markdown-cyber border-t border-[#262528] pt-6">
                  <MarkdownContent content={researchContent[p.codename]} />
                </div>
              )}

              {p.imgs.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-headline text-[10px] text-[#767577] uppercase tracking-widest mb-3">// gallery</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {p.imgs.map(img => (
                      <img key={img} src={img} alt="" className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-opacity" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MarkdownInline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="text-[#f9f5f8]">{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function ProjectsSection() {
  const accent = sectionAccent.projects;
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={3} heading="PROJECTS" count={projects.length} accent={accent} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => {
          const body = (
            <article className="bg-[#131315] hover:bg-[#1f1f22] transition-colors p-6 h-full flex flex-col border-l-2 border-transparent hover:border-[color:var(--accent)]">
              {p.image && (
                <div className="mb-4 h-40 bg-black overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-80" />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-0.5 ${accent.bg} ${accent.text} text-[10px] font-headline uppercase border border-[color:var(--accent)]/30`}>[project]</span>
                <span className="px-2 py-0.5 bg-[#262528] text-[#adaaad] text-[10px] font-headline uppercase tabular-nums">{p.date}</span>
              </div>
              <h3 className={`font-headline text-lg font-bold tracking-tight text-[#f9f5f8] mb-2`}>{p.title}</h3>
              <p className="text-[#adaaad] text-sm italic mb-3">{p.subtitle}</p>
              <p className="text-[#adaaad]/80 text-sm leading-relaxed mb-4 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.technologies.map(t => (
                  <span key={t} className="text-[10px] font-headline uppercase tracking-widest text-[#adaaad] bg-[#262528] px-1.5 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <span className={`mt-auto inline-flex items-center gap-2 ${accent.text} text-[10px] font-headline tracking-widest uppercase`}>
                  visit_project →
                </span>
              )}
            </article>
          );
          return p.link ? (
            <a key={p.codename} href={p.link} target="_blank" rel="noreferrer" style={{ ['--accent' as string]: accent.hex }} className="block h-full">
              {body}
            </a>
          ) : (
            <div key={p.codename} style={{ ['--accent' as string]: accent.hex }} className="h-full">
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ClubsSection() {
  const accent = sectionAccent.clubs;
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={4} heading="CLUBS_AND_VOLUNTEERING" count={clubExperience.length} accent={accent} />
      <div className="space-y-12">
        {clubExperience.map(c => (
          <article
            key={c.slug}
            className="bg-[#131315] border-l-2 border-transparent hover:border-[color:var(--accent)] transition-colors p-6 md:p-8"
            style={{ ['--accent' as string]: accent.hex }}
          >
            <header className="flex items-start gap-4 mb-6">
              <img src={c.iconUrl} alt={c.title} className="w-12 h-12 object-contain bg-[#0e0e10] p-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className={`font-headline text-xl md:text-2xl font-bold tracking-tight ${accent.text}`}>
                  {c.title}
                </h3>
                <p className="font-headline text-xs text-[#767577] uppercase tracking-widest mt-1 tabular-nums">[{c.timeline}]</p>
              </div>
            </header>

            <div className="text-[#adaaad] leading-relaxed markdown-cyber">
              <MarkdownContent content={clubsContent[c.slug] ?? ''} />
            </div>

            {c.images.length > 0 && (
              <div className="mt-8">
                <h4 className="font-headline text-[10px] text-[#767577] uppercase tracking-widest mb-3">// gallery</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {c.images.map(img => (
                    <img key={img} src={img} alt="" className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function PageFooter() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 max-w-6xl mx-auto border-t border-[#262528] mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="font-headline text-[10px] text-[#767577] uppercase tracking-widest">
          END_OF_FILE // prannaya_gupta.about
        </p>
        <div className="flex gap-4">
          <Link to="/" className="font-headline text-xs text-[#00d4fd]/60 hover:text-[#00d4fd] uppercase tracking-widest">[ home ]</Link>
          <Link to="/blog" className="font-headline text-xs text-[#00d4fd]/60 hover:text-[#00d4fd] uppercase tracking-widest">[ blog ]</Link>
        </div>
      </div>
    </footer>
  );
}

export function About() {
  return (
    <div className="blog min-h-screen w-full bg-[#0e0e10] text-[#f9f5f8] font-body">
      <TopNav />
      <main>
        <Hero />
        <BioTerminal />
        <ExperienceSection />
        <ResearchSection />
        <ProjectsSection />
        <ClubsSection />
        <PageFooter />
      </main>
    </div>
  );
}
