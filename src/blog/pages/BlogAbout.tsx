import { ScanlineOverlay } from '../components/ScanlineOverlay';

const skills = [
  { name: 'Python / AI Research', pct: 95, color: 'bg-[#00d4fd]', shadow: 'shadow-[0_0_10px_rgba(0,212,253,0.4)]' },
  { name: 'TypeScript / React', pct: 90, color: 'bg-[#00d2fd]', shadow: 'shadow-[0_0_10px_rgba(0,210,253,0.4)]' },
  { name: 'Systems / DevOps', pct: 75, color: 'bg-[#ff58e7]', shadow: 'shadow-[0_0_10px_rgba(255,88,231,0.4)]' },
];

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      <span className="text-[#00d2fd] font-bold">architect@terminal</span>
      <span className="text-[#adaaad]">:</span>
      <span className="text-[#ff58e7]">~</span>
      <span className="text-[#adaaad]">$</span>
      <span className="text-[#f9f5f8]">{children}</span>
    </div>
  );
}

export function BlogAbout() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-12 max-w-5xl mx-auto">
      {/* Terminal Window */}
      <div className="bg-black relative border border-[#48474a]/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <ScanlineOverlay className="z-10" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#262528] border-b border-[#48474a]/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-[#d53d18]" />
            <div className="w-3 h-3 bg-[#00677e]" />
            <div className="w-3 h-3 bg-[#00b8e0]" />
          </div>
          <div className="text-[#00d4fd]/60 font-headline text-[10px] tracking-widest uppercase">
            USER_SESSION: prannay@watchtower
          </div>
          <div className="flex gap-3">
            <span className="text-[#00d4fd]/40 text-xs">-</span>
            <span className="text-[#00d4fd]/40 text-xs">□</span>
            <span className="text-[#00d4fd]/40 text-xs">×</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-10 font-mono text-[#00d4fd] text-sm md:text-base leading-relaxed relative z-20">
          {/* Bio */}
          <div className="mb-12">
            <Prompt>cat bio.txt</Prompt>
            <div className="text-[#00d4fd]/90 space-y-4 font-body md:max-w-2xl border-l border-[#00d4fd]/20 pl-6">
              <p>
                [#] I am a recent graduate of NUS High School of Math and Science, passionate about AI research,
                full-stack development, and building tools that bridge the gap between human creativity and machine intelligence.
              </p>
              <p>
                [#] Currently exploring the intersection of AI safety, systems engineering, and open-source development.
                I build in the open and write about what I learn.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-12">
            <Prompt>query --skills</Prompt>
            <div className="space-y-4 max-w-xl">
              {skills.map(s => (
                <div key={s.name} className="group">
                  <div className="flex justify-between text-[10px] font-headline mb-1 uppercase tracking-widest text-[#00d4fd]/60 group-hover:text-[#00d4fd] transition-colors">
                    <span>{s.name}</span>
                    <span>{s.pct}%</span>
                  </div>
                  <div className="h-1 bg-[#262528] w-full">
                    <div className={`h-full ${s.color} ${s.shadow}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mb-8">
            <Prompt>ls -la ~/links</Prompt>
            <div className="space-y-2 text-[#00d4fd]/80 text-sm">
              <p>drwxr-xr-x  <a href="https://github.com/ThePyProgrammer" target="_blank" rel="noreferrer" className="text-[#00d2fd] hover:text-[#00d4fd]">github.com/ThePyProgrammer</a></p>
              <p>drwxr-xr-x  <a href="https://linkedin.com/in/prannaya-gupta" target="_blank" rel="noreferrer" className="text-[#00d2fd] hover:text-[#00d4fd]">linkedin.com/in/prannaya-gupta</a></p>
              <p>drwxr-xr-x  <a href="/" className="text-[#00d2fd] hover:text-[#00d4fd]">portfolio // home</a></p>
            </div>
          </div>

          {/* Blinking cursor */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[#00d2fd] font-bold">architect@terminal</span>
            <span className="text-[#adaaad]">:</span>
            <span className="text-[#ff58e7]">~</span>
            <span className="text-[#adaaad]">$</span>
            <div className="w-2.5 h-5 bg-[#00d4fd] cursor-blink" />
          </div>
        </div>
      </div>
    </div>
  );
}
