import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { ArrowDown, ChevronLeft, ChevronRight, ExternalLink, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { workExperience } from '@/data/experience';
import { researchProjects } from '@/data/research';
import { projects } from '@/data/projects';
import { clubExperience } from '@/data/clubs';
import { experienceContent, researchContent, clubsContent } from '@/content';
import { MarkdownContent } from '@/components/MarkdownContent';
import { ScanlineOverlay } from '@/blog/components/ScanlineOverlay';
import { BlogFooter } from '@/blog/BlogFooter';
import '@/blog/blog.css';

const contactLinks = [
  { href: 'mailto:prannayagupta@programmer.net', text: 'prannayagupta@programmer.net', Icon: Mail, label: 'email' },
  { href: 'https://github.com/ThePyProgrammer', text: 'github.com/ThePyProgrammer', Icon: Github, label: 'github' },
  { href: 'https://www.linkedin.com/in/prannaya-gupta', text: 'linkedin.com/in/prannaya-gupta', Icon: Linkedin, label: 'linkedin' },
  { href: 'https://x.com/PrannayaG', text: 'x.com/PrannayaG', Icon: Twitter, label: 'twitter' },
  { href: '/cv.pdf', text: 'My Resume', Icon: FileText, label: 'resume' },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>?/';
const IDLE_TEXT = 'drwxr-xr-x';

function ScrambleLabel({ target }: { target: string }) {
  const [display, setDisplay] = useState(IDLE_TEXT);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clear = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => () => clear(), []);

  const scrambleTo = (finalText: string) => {
    clear();
    const maxLen = IDLE_TEXT.length;
    const padded = finalText.padStart(maxLen, ' ');
    const totalSteps = 18;
    let step = 0;

    const tick = () => {
      step += 1;
      const revealCount = Math.floor((step / totalSteps) * maxLen);
      let out = '';
      for (let i = 0; i < maxLen; i += 1) {
        if (i < revealCount) {
          out += padded[i] === ' ' ? '\u00A0' : padded[i];
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplay(out);
      if (step < totalSteps) {
        timeoutRef.current = window.setTimeout(() => {
          frameRef.current = requestAnimationFrame(tick);
        }, 30);
      } else {
        setDisplay(padded.replace(/ /g, '\u00A0'));
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  return (
    <span
      className="hidden sm:inline text-[#00d4fd]/40 shrink-0 tabular-nums"
      onMouseEnter={() => scrambleTo(target)}
      onMouseLeave={() => {
        clear();
        setDisplay(IDLE_TEXT);
      }}
    >
      {display}
    </span>
  );
}

const sectionAccent = {
  experience: { hex: '#00d4fd', text: 'text-[#00d4fd]', bg: 'bg-[#00d4fd]/15' },
  research: { hex: '#ff2e63', text: 'text-[#ff2e63]', bg: 'bg-[#ff2e63]/15' },
  projects: { hex: '#ffd93d', text: 'text-[#ffd93d]', bg: 'bg-[#ffd93d]/15' },
  clubs: { hex: '#ff58e7', text: 'text-[#ff58e7]', bg: 'bg-[#ff58e7]/15' },
} as const;

type Accent = typeof sectionAccent[keyof typeof sectionAccent];

function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 h-14 md:h-16 z-50 flex justify-between items-center px-4 md:px-8 transition-all duration-300 ${isScrolled ? 'bg-[#0e0e10]/90 backdrop-blur border-b border-[#262528]' : 'bg-transparent border-b border-transparent'}`}>
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <Link to="/" className="text-base md:text-xl font-bold text-[#00d4fd] drop-shadow-[0_0_8px_rgba(0,212,253,0.4)] font-headline tracking-tighter uppercase whitespace-nowrap">
          [prannay.dev]
        </Link>
        <nav className="flex items-center gap-2 md:gap-6 overflow-x-auto min-w-0">
          <Link to="/" className="font-headline tracking-tighter uppercase text-xs md:text-sm text-[#00d4fd]/60 hover:text-[#00d4fd] hover:bg-[#00d4fd]/10 px-2 py-1 transition-colors whitespace-nowrap">[ home ]</Link>
          <Link to="/blog" className="font-headline tracking-tighter uppercase text-xs md:text-sm text-[#00d4fd]/60 hover:text-[#00d4fd] hover:bg-[#00d4fd]/10 px-2 py-1 transition-colors whitespace-nowrap">[ blog ]</Link>
          <span className="font-headline tracking-tighter uppercase text-xs md:text-sm text-[#00d4fd] border-b-2 border-[#00d4fd] pb-1 px-2 py-1 whitespace-nowrap">[ about ]</span>
        </nav>
      </div>
      <div className="hidden lg:flex items-center bg-[#1f1f22] px-3 py-1 text-[#00d4fd] text-[10px] font-mono whitespace-nowrap">
        SYS_STATUS: OPTIMAL
      </div>
    </header>
  );
}

type HeroMenuState = { x: number; y: number } | null;

const HERO_MENU_ITEMS: { label: string; detail: string; run: () => void }[] = [
  { label: 'whoami', detail: 'prannay', run: () => document.getElementById('bio-terminal')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'cat /etc/passwd', detail: 'root:x:0:0::/root:/bin/zsh', run: () => alert('prannay:x:1000:1000:gupta,prannaya,,,:/home/prannay:/bin/zsh\nroot:x:0:0::/root:/bin/nope') },
  { label: 'ls ~/secrets', detail: '404', run: () => alert('ls: cannot access \'/home/prannay/secrets\': No such file or directory') },
  { label: 'rm -rf /', detail: 'destructive', run: () => { document.body.classList.add('sudo-shake'); window.setTimeout(() => document.body.classList.remove('sudo-shake'), 600); } },
  { label: 'exit', detail: 'back to browser', run: () => {} },
];

function HeroContextMenu({ pos, onClose }: { pos: HeroMenuState; onClose: () => void }) {
  useEffect(() => {
    if (!pos) return;
    const close = () => onClose();
    window.addEventListener('click', close);
    window.addEventListener('scroll', close, true);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [pos, onClose]);

  if (!pos) return null;
  const left = Math.min(pos.x, window.innerWidth - 260);
  const top = Math.min(pos.y, window.innerHeight - 240);
  return (
    <div
      className="fixed z-[70] w-[260px] bg-[#0e0e10]/95 backdrop-blur border border-[#00d4fd]/40 shadow-[0_0_40px_rgba(0,212,253,0.25)] font-mono text-xs py-1"
      style={{ left, top }}
      onClick={e => e.stopPropagation()}
    >
      <div className="px-3 py-2 text-[#00d4fd]/60 uppercase text-[10px] tracking-widest border-b border-[#262528]">watchtower // ctx</div>
      {HERO_MENU_ITEMS.map(item => (
        <button
          key={item.label}
          onClick={() => { item.run(); onClose(); }}
          className="w-full flex items-center justify-between gap-4 px-3 py-1.5 text-left text-[#adaaad] hover:bg-[#00d4fd]/10 hover:text-[#00d4fd] transition-colors"
        >
          <span>{item.label}</span>
          <span className="text-[#767577] text-[10px] truncate">{item.detail}</span>
        </button>
      ))}
    </div>
  );
}

function Hero() {
  const [menu, setMenu] = useState<HeroMenuState>(null);
  const onContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <section onContextMenu={onContext} className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat opacity-40" style={{ backgroundImage: 'url(/img/cern.jpg)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e10]/50 via-[#0e0e10]/60 to-[#0e0e10]" />
      <ScanlineOverlay className="z-10 opacity-40" />
      <HeroContextMenu pos={menu} onClose={() => setMenu(null)} />

      <div className="relative z-20 min-h-screen flex flex-col justify-between pt-24 pb-10 md:pt-32 md:pb-12 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex flex-wrap gap-2 items-center mb-6 font-mono text-sm">
            <span className="text-[#00d2fd] font-bold">prannay@watchtower</span>
            <span className="text-[#adaaad]">:</span>
            <span className="text-[#ff58e7]">~</span>
            <span className="text-[#adaaad]">$</span>
            <span className="text-[#f9f5f8]">whoami</span>
          </div>

          <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter leading-[1.1] mb-6 text-[#f9f5f8]">
            Hey, I'm <span className="text-[#00d4fd]">Prannaya</span>.
          </h1>

          <p className="font-headline text-2xl md:text-3xl tracking-tight text-[#adaaad]">
            <span className="text-[#ff58e7]">{'>'}</span> I'm a{' '}
            <span className="text-[#f9f5f8]">
              <ReactTyped strings={['Student', 'Developer', 'Engineer', 'Researcher']} typeSpeed={100} backSpeed={50} backDelay={2000} loop />
            </span>
            <span className="cursor-blink inline-block w-2 h-6 md:h-8 bg-[#00d4fd] ml-1 align-middle" />
          </p>
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }} className="flex items-center gap-2 text-[#00d4fd]/60 font-headline text-xs uppercase tracking-widest">
          <ArrowDown className="h-4 w-4" />
          <span>scroll_to_continue</span>
        </motion.div>
      </div>
    </section>
  );
}

function BioLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-[#00d4fd] hover:text-[#f9f5f8] font-semibold transition-colors">
      {children}
    </a>
  );
}

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-2 items-center mb-6 font-mono">
      <span className="text-[#00d2fd] font-bold">prannay@watchtower</span>
      <span className="text-[#adaaad]">:</span>
      <span className="text-[#ff58e7]">~</span>
      <span className="text-[#adaaad]">$</span>
      <span className="text-[#f9f5f8]">{children}</span>
    </div>
  );
}

function BioTerminal() {
  const [minimized, setMinimized] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const invertTimer = useRef<number | null>(null);
  const zoomTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (invertTimer.current) window.clearTimeout(invertTimer.current);
    if (zoomTimer.current) window.clearTimeout(zoomTimer.current);
  }, []);

  const onClose = () => setMinimized(m => !m);
  const onInvert = () => {
    setInverted(true);
    if (invertTimer.current) window.clearTimeout(invertTimer.current);
    invertTimer.current = window.setTimeout(() => setInverted(false), 2000);
  };
  const onZoom = () => {
    setZoomed(z => !z);
    if (zoomTimer.current) window.clearTimeout(zoomTimer.current);
    zoomTimer.current = window.setTimeout(() => setZoomed(false), 3500);
  };

  return (
    <section id="bio-terminal" className="px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-20 max-w-4xl mx-auto">
      <div
        className={`bg-black relative border border-[#48474a]/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300 ${inverted ? 'invert hue-rotate-180' : ''} ${zoomed ? 'fixed inset-4 md:inset-8 z-[70] overflow-auto max-w-none' : ''}`}
      >
        <ScanlineOverlay className="z-10" />
        <div className="flex items-center justify-between gap-2 px-3 md:px-4 py-2 bg-[#262528] border-b border-[#48474a]/20">
          <div className="flex gap-2 shrink-0">
            <button onClick={onClose} aria-label="close" className="w-3 h-3 bg-[#d53d18] hover:brightness-125 transition" />
            <button onClick={onInvert} aria-label="minimize" className="w-3 h-3 bg-[#00677e] hover:brightness-125 transition" />
            <button onClick={onZoom} aria-label="zoom" className="w-3 h-3 bg-[#00b8e0] hover:brightness-125 transition" />
          </div>
          <div className="hidden sm:block text-[#00d4fd]/60 font-headline text-[10px] tracking-widest uppercase truncate">
            USER_SESSION: prannay@watchtower
          </div>
          <div className="flex gap-3 text-[#00d4fd]/40 text-xs shrink-0">
            <span>-</span><span>□</span><span>×</span>
          </div>
        </div>

        {!minimized && (
        <div className="p-4 md:p-10 font-mono text-[#00d4fd] text-sm md:text-base leading-relaxed relative z-20 space-y-10 md:space-y-12">
          <div>
            <Prompt>cat bio.txt</Prompt>
            <div className="text-[#adaaad] space-y-4 font-body md:max-w-3xl border-l border-[#00d4fd]/20 pl-4 md:pl-6 text-sm md:text-base">
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
            <div className="space-y-2 text-[#00d4fd]/80 text-xs md:text-sm font-mono">
              {contactLinks.map(({ href, text, Icon, label }) => (
                <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-2 md:gap-3 hover:text-[#00d4fd] transition-colors group min-w-0">
                  <ScrambleLabel target={label} />
                  <Icon className="h-4 w-4 text-[#00d2fd] group-hover:text-[#00d4fd] shrink-0" />
                  <span className="text-[#00d2fd] group-hover:text-[#f9f5f8] font-semibold transition-colors break-all">{text}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[#00d2fd] font-bold">prannay@watchtower</span>
            <span className="text-[#adaaad]">:</span>
            <span className="text-[#ff58e7]">~</span>
            <span className="text-[#adaaad]">$</span>
            <IdleGhostTyper />
            <div className="w-2.5 h-5 bg-[#00d4fd] cursor-blink" />
          </div>
        </div>
        )}
      </div>
      {zoomed && <div className="fixed inset-0 bg-black/70 z-[65]" onClick={() => setZoomed(false)} />}
    </section>
  );
}

function SectionHeader({ index, heading, count, accent, collapsed, onToggle }: { index: number; heading: string; count: number; accent: Accent; collapsed: boolean; onToggle: () => void }) {
  return (
    <div className={`flex items-baseline gap-3 md:gap-4 ${collapsed ? 'mb-0' : 'mb-8 md:mb-10'} flex-wrap`}>
      <h2 className="font-headline text-2xl md:text-4xl font-extrabold tracking-tighter text-[#f9f5f8] break-all">
        <span className={accent.text}>{String(index).padStart(2, '0')}_</span>{heading}
      </h2>
      <span className="hidden sm:block h-[2px] flex-1 bg-[#262528]" />
      <span className="font-headline text-[10px] md:text-xs text-[#767577] uppercase tracking-widest shrink-0">
        {count} {count === 1 ? 'entry' : 'entries'}
      </span>
      <button
        onClick={onToggle}
        aria-expanded={!collapsed}
        className={`font-headline text-[10px] md:text-xs uppercase tracking-widest shrink-0 px-2 py-1 border border-[#262528] hover:border-[color:var(--accent)] transition-colors ${accent.text}`}
        style={{ ['--accent' as string]: accent.hex }}
      >
        {collapsed ? '[ expand ] ▼' : '[ collapse ] ▲'}
      </button>
    </div>
  );
}

function useCollapsed() {
  const [collapsed, setCollapsed] = useState(false);
  return { collapsed, toggle: () => setCollapsed(v => !v) };
}

const GHOST_COMMANDS = [
  './reboot_user.sh',
  'tail -f /var/log/thoughts.log',
  'curl https://is.anyone.there',
  'ping -c 3 motivation.local',
  'export CAFFEINE_LEVEL=CRITICAL',
  'ps aux | grep -i distractions',
];

function IdleGhostTyper() {
  const [text, setText] = useState('');
  const idleTimer = useRef<number | null>(null);
  const typeTimer = useRef<number | null>(null);

  const clear = () => {
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    if (typeTimer.current) window.clearTimeout(typeTimer.current);
  };

  const type = (target: string, i: number) => {
    setText(target.slice(0, i));
    if (i <= target.length) {
      typeTimer.current = window.setTimeout(() => type(target, i + 1), 60 + Math.random() * 60);
    } else {
      typeTimer.current = window.setTimeout(() => erase(target, target.length), 1500);
    }
  };

  const erase = (target: string, i: number) => {
    setText(target.slice(0, i));
    if (i >= 0) {
      typeTimer.current = window.setTimeout(() => erase(target, i - 1), 35);
    }
  };

  const scheduleIdle = () => {
    clear();
    setText('');
    idleTimer.current = window.setTimeout(() => {
      const cmd = GHOST_COMMANDS[Math.floor(Math.random() * GHOST_COMMANDS.length)];
      type(cmd, 1);
    }, 30000);
  };

  useEffect(() => {
    scheduleIdle();
    const reset = () => scheduleIdle();
    const events = ['mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    return () => {
      events.forEach(e => window.removeEventListener(e, reset));
      clear();
    };
  }, []);

  if (!text) return null;
  return <span className="text-[#00d4fd]/60 italic">{text}</span>;
}

function SudoEasterEgg() {
  const [visible, setVisible] = useState(false);
  const bufferRef = useRef('');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      if (e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-4);
      if (bufferRef.current === 'sudo') {
        bufferRef.current = '';
        setVisible(true);
        document.body.classList.add('sudo-shake');
        window.setTimeout(() => document.body.classList.remove('sudo-shake'), 600);
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setVisible(false), 2600);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 12, x: '-50%' }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-1/2 z-[60] bg-[#0e0e10] border border-[#ff2e63] shadow-[0_0_30px_rgba(255,46,99,0.35)] px-4 py-3 font-mono text-xs md:text-sm pointer-events-none max-w-[calc(100vw-2rem)] whitespace-nowrap"
        >
          <span className="text-[#ff2e63] mr-2">[sudo]</span>
          <span className="text-[#adaaad]">permission denied:</span>
          <span className="text-[#f9f5f8] ml-2">nice try.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type TimelineItem = { key: string; title: string; timeline: string; iconUrl: string };

function TimelineSelector({ items, activeKey, onSelect, accent }: { items: TimelineItem[]; activeKey: string; onSelect: (key: string) => void; accent: Accent }) {
  return (
    <ul className="space-y-1">
      {items.map(item => {
        const isActive = item.key === activeKey;
        return (
          <li key={item.key}>
            <button
              onClick={() => onSelect(item.key)}
              className="w-full text-left flex items-center gap-3 p-3 bg-[#131315] hover:bg-[#1f1f22] transition-colors"
            >
              <img src={item.iconUrl} alt="" className="w-10 h-10 rounded-full object-cover bg-[#0e0e10] shrink-0" />
              <div className="min-w-0 flex-1">
                <p
                  className={`font-headline text-base md:text-lg font-bold tracking-tight break-words ${isActive ? accent.text : 'text-[#f9f5f8]'}`}
                  style={{ lineHeight: 1.1 }}
                >
                  {item.title}
                </p>
                <p
                  className="font-headline text-xs text-[#767577] uppercase tracking-widest tabular-nums mt-1"
                  style={{ lineHeight: 1 }}
                >
                  [{item.timeline}]
                </p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Gallery({ images }: { images: string[] }) {
  if (images.length === 0) return null;
  return (
    <div className="mt-6">
      <h4 className="font-headline text-[10px] text-[#767577] uppercase tracking-widest mb-3">// gallery</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map(img => (
          <img key={img} src={img} alt="" className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-opacity" />
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  const accent = sectionAccent.experience;
  const [activeKey, setActiveKey] = useState(workExperience[0].slug);
  const active = workExperience.find(e => e.slug === activeKey)!;
  const { collapsed, toggle } = useCollapsed();

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={1} heading="EXPERIENCE" count={workExperience.length} accent={accent} collapsed={collapsed} onToggle={toggle} />
      {!collapsed && (
      <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
        <TimelineSelector
          items={workExperience.map(e => ({ key: e.slug, title: e.title, timeline: e.timeline, iconUrl: e.iconUrl }))}
          activeKey={activeKey}
          onSelect={setActiveKey}
          accent={accent}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#131315] p-6 md:p-8"
          >
            <h3 className={`font-headline text-xl md:text-2xl font-bold tracking-tight ${accent.text} mb-1`}>
              {active.title}
            </h3>
            <p className="font-headline text-xs text-[#767577] uppercase tracking-widest mb-6 tabular-nums">[{active.timeline}]</p>

            <div className="text-[#adaaad] leading-relaxed markdown-cyber">
              <MarkdownContent content={experienceContent[active.slug] ?? ''} />
            </div>

            <Gallery images={active.images} />
          </motion.div>
        </AnimatePresence>
      </div>
      )}
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

function ResearchSection() {
  const accent = sectionAccent.research;
  const [activeCodename, setActiveCodename] = useState<string | null>(null);
  const toggle = (c: string) => setActiveCodename(prev => (prev === c ? null : c));
  const { collapsed, toggle: toggleCollapsed } = useCollapsed();

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={2} heading="RESEARCH" count={researchProjects.length} accent={accent} collapsed={collapsed} onToggle={toggleCollapsed} />

      {!collapsed && (
      <div className={`grid gap-6 items-start ${activeCodename ? 'lg:grid-cols-[minmax(0,340px)_1fr]' : ''}`}>
        <div className={`grid gap-4 ${activeCodename ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {researchProjects.map(p => {
            const isActive = activeCodename === p.codename;
            const hideWhenOther = activeCodename !== null && !isActive;
            return (
              <button
                key={p.codename}
                onClick={() => toggle(p.codename)}
                className={`group block text-left bg-[#131315] hover:bg-[#1f1f22] transition-colors ${hideWhenOther ? 'hidden' : ''} ${isActive ? 'ring-1 ring-[color:var(--accent)]' : ''}`}
                style={{ ['--accent' as string]: accent.hex }}
              >
                <div className="relative h-40 overflow-hidden bg-black">
                  <img src={p.cover} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#131315]" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-[#262528] text-[#adaaad] text-[10px] font-headline uppercase tabular-nums">{p.timeline}</span>
                  </div>
                  <h3 className={`font-headline text-base font-bold tracking-tight mb-2 ${isActive ? accent.text : 'text-[#f9f5f8]'}`}>
                    {p.title}
                  </h3>
                  <p className="text-[#adaaad] text-xs leading-relaxed mb-2 line-clamp-3">{p.subtitle}</p>
                  <span className={`text-[10px] font-headline uppercase tracking-widest ${accent.text}`}>
                    {isActive ? '[ collapse ] ▲' : '[ expand ] ▼'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeCodename && (() => {
            const p = researchProjects.find(x => x.codename === activeCodename)!;
            return (
              <motion.div
                key={activeCodename}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-[#131315] p-6 md:p-8 min-w-0"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-[#f9f5f8]">
                    {p.title}
                  </h3>
                  <button onClick={() => setActiveCodename(null)} className={`shrink-0 text-xs font-headline uppercase tracking-widest ${accent.text} hover:opacity-80`}>
                    [ close ] ×
                  </button>
                </div>

                <p className="text-[#adaaad] leading-relaxed mb-4">{p.subtitle}</p>

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
                      <a key={i} href={l.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#0e0e10] border border-[#262528] hover:border-[color:var(--accent)] transition-colors px-3 py-1.5 text-[11px] font-headline uppercase tracking-widest text-[#adaaad] hover:text-[#f9f5f8]">
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
                    <div className="grid grid-cols-2 gap-2">
                      {p.imgs.map(img => (
                        <img key={img} src={img} alt="" className="w-full aspect-video object-cover opacity-80 hover:opacity-100 transition-opacity" />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
      )}
    </section>
  );
}

function ProjectsSection() {
  const accent = sectionAccent.projects;
  const [idx, setIdx] = useState(0);
  const p = projects[idx];
  const go = (delta: number) => setIdx((idx + delta + projects.length) % projects.length);
  const { collapsed, toggle: toggleCollapsed } = useCollapsed();

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={3} heading="PROJECTS" count={projects.length} accent={accent} collapsed={collapsed} onToggle={toggleCollapsed} />

      {!collapsed && (<>
      <div className="flex items-center justify-between mb-4 font-headline text-xs uppercase tracking-widest">
        <button onClick={() => go(-1)} className={`flex items-center gap-2 px-3 py-2 border border-[#262528] ${accent.text} hover:bg-[color:var(--accent)]/10 transition-colors`} style={{ ['--accent' as string]: accent.hex }}>
          <ChevronLeft className="h-4 w-4" /> prev
        </button>
        <span className="text-[#adaaad] tabular-nums">
          [ {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} ]
        </span>
        <button onClick={() => go(1)} className={`flex items-center gap-2 px-3 py-2 border border-[#262528] ${accent.text} hover:bg-[color:var(--accent)]/10 transition-colors`} style={{ ['--accent' as string]: accent.hex }}>
          next <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={p.codename}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-[#131315] grid md:grid-cols-2 gap-6 p-6 md:p-8 min-h-[560px] md:min-h-[440px]"
        >
          <div className="bg-black overflow-hidden self-start w-full">
            {p.image && <img src={p.image} alt={p.title} className="w-full h-auto object-contain opacity-80" />}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-0.5 bg-[#262528] text-[#adaaad] text-[10px] font-headline uppercase tabular-nums">{p.date}</span>
            </div>
            <h3 className="font-headline text-2xl font-bold tracking-tight text-[#f9f5f8] mb-2">{p.title}</h3>
            <p className="text-[#adaaad] italic text-sm mb-4">{p.subtitle}</p>
            <p className="text-[#adaaad]/80 text-sm leading-relaxed mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.technologies.map(t => (
                <span key={t} className="text-[10px] font-headline uppercase tracking-widest text-[#adaaad] bg-[#262528] px-1.5 py-0.5">{t}</span>
              ))}
            </div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 text-[#00d4fd] hover:text-[#00d2fd] text-xs font-headline tracking-widest uppercase hover:underline">
                visit_project <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </motion.article>
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-1">
        {projects.map((pp, i) => (
          <button
            key={pp.codename}
            onClick={() => setIdx(i)}
            className={`h-1 flex-1 min-w-[20px] transition-colors ${i === idx ? 'bg-[color:var(--accent)]' : 'bg-[#262528] hover:bg-[#48474a]'}`}
            style={{ ['--accent' as string]: accent.hex }}
            aria-label={`Jump to ${pp.title}`}
          />
        ))}
      </div>
      </>)}
    </section>
  );
}

function ClubsSection() {
  const accent = sectionAccent.clubs;
  const [activeKey, setActiveKey] = useState(clubExperience[0].slug);
  const active = clubExperience.find(c => c.slug === activeKey)!;
  const { collapsed, toggle: toggleCollapsed } = useCollapsed();

  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 max-w-6xl mx-auto">
      <SectionHeader index={4} heading="CLUBS_AND_VOLUNTEERING" count={clubExperience.length} accent={accent} collapsed={collapsed} onToggle={toggleCollapsed} />
      {!collapsed && (
      <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
        <TimelineSelector
          items={clubExperience.map(c => ({ key: c.slug, title: c.title, timeline: c.timeline, iconUrl: c.iconUrl }))}
          activeKey={activeKey}
          onSelect={setActiveKey}
          accent={accent}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#131315] p-6 md:p-8"
          >
            <h3 className={`font-headline text-xl md:text-2xl font-bold tracking-tight ${accent.text} mb-1`}>
              {active.title}
            </h3>
            <p className="font-headline text-xs text-[#767577] uppercase tracking-widest mb-6 tabular-nums">[{active.timeline}]</p>

            <div className="text-[#adaaad] leading-relaxed markdown-cyber">
              <MarkdownContent content={clubsContent[active.slug] ?? ''} />
            </div>

            <Gallery images={active.images} />
          </motion.div>
        </AnimatePresence>
      </div>
      )}
    </section>
  );
}

function WIPBadge() {
  const bugs = [
    'polish.exe // not found',
    'expect dangling refs',
    'here be dragons 🐉',
    'caffeine levels: critical',
    'semicolons: optional',
    'dependencies: unresolved',
    'coffee.status: empty',
  ];
  const [msg] = useState(() => bugs[Math.floor(Math.random() * bugs.length)]);

  return (
    <div className="fixed bottom-2 right-2 md:bottom-4 md:right-4 z-40 bg-[#0e0e10]/95 backdrop-blur border border-[#ffd93d]/60 shadow-[0_0_20px_rgba(255,217,61,0.15)] font-headline text-[9px] md:text-[10px] tracking-widest uppercase select-none pointer-events-none max-w-[calc(100vw-1rem)]">
      <div className="px-2 md:px-3 py-1 md:py-1.5 flex items-center gap-1.5 md:gap-2 border-b border-[#ffd93d]/30 flex-wrap">
        <span className="w-2 h-2 bg-[#ffd93d] cursor-blink shrink-0" />
        <span className="text-[#ffd93d]">⚠ wip_build</span>
        <span className="hidden sm:inline text-[#767577]">//</span>
        <span className="hidden sm:inline text-[#adaaad]">v0.0.1-alpha</span>
      </div>
      <div className="px-2 md:px-3 py-1 md:py-1.5 text-[#adaaad]">
        <span className="text-[#ff2e63]">stderr:</span> {msg}
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="blog min-h-screen w-full bg-[#0e0e10] text-[#f9f5f8] font-body overflow-x-hidden">
      <TopNav />
      <WIPBadge />
      <SudoEasterEgg />
      <main>
        <Hero />
        <BioTerminal />
        <ExperienceSection />
        <ResearchSection />
        <ProjectsSection />
        <ClubsSection />
        <BlogFooter />
      </main>
    </div>
  );
}
