import { useState } from 'react';
import { LOST_CURSOR_AGENTS, type Agent } from '../data/lostCursorAgents';

export function AgentGallery() {
  const [selected, setSelected] = useState<Agent>(LOST_CURSOR_AGENTS[0]);
  const delta = selected.entry !== null && selected.exit !== null ? selected.exit - selected.entry : null;

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          agent_roster.explore, click a session
        </span>
      </div>
      <div className="flex items-end bg-[#1a191c] px-2 pt-2 gap-0.5 border-b border-[#00d4fd]/30">
        {LOST_CURSOR_AGENTS.map(a => {
          const active = selected.id === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className={`group relative font-mono text-[11px] px-4 py-1.5 tracking-widest transition-colors focus:outline-none focus-visible:outline-none ${
                active
                  ? 'bg-black text-[#00d4fd] border-t-2 border-x-2 border-[#00d4fd] hover:border-[#00d4fd] hover:text-[#00d4fd] hover:bg-black -mb-px z-10'
                  : 'bg-[#262528] text-[#00d4fd]/50 border-t border-x border-[#48474a]/30 hover:bg-[#00d4fd]/10 hover:text-[#00d4fd] hover:border-[#00d4fd]/60'
              }`}
            >
              <span className={active ? 'text-[#00d4fd]' : 'text-[#adaaad]/40'}>
                {active ? '● ' : '○ '}
              </span>
              <span>{a.id}</span>
            </button>
          );
        })}
        <div className="flex-1 border-b border-[#00d4fd]/30 self-end h-0" />
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 font-mono text-xs space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="font-headline text-3xl font-bold text-[#00d4fd]">{selected.id}</span>
            <span className="text-[#f9f5f8]/80 text-sm">{selected.role}</span>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[11px]">
            <Row label="entry" value={selected.entry !== null ? selected.entry.toLocaleString() : '-'} />
            <Row label="exit"  value={selected.exit  !== null ? selected.exit.toLocaleString()  : '-'} />
            {delta !== null && (
              <Row
                label="delta"
                value={`${delta > 0 ? '+' : ''}${delta} moves`}
                color={delta < 0 ? 'text-[#00d4fd]' : 'text-[#ff7351]'}
              />
            )}
          </dl>
          <p className="text-[#adaaad] italic text-[11px] leading-relaxed pt-2 border-t border-[#48474a]/30">
            {selected.notes}
          </p>
        </div>
        <div className="lg:col-span-3 font-mono text-xs space-y-4">
          <div>
            <div className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest mb-2">
              deliverables
            </div>
            <ul className="space-y-1">
              {selected.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-[#f9f5f8]/85">
                  <span className="text-[#00d4fd] shrink-0">&gt;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest mb-2">
              per-test contributions
            </div>
            {selected.contributions.length === 0 ? (
              <div className="text-[#adaaad] italic text-[11px]">
                no direct per-test deltas, contribution is infrastructure.
              </div>
            ) : (
              <ul className="space-y-1.5">
                {selected.contributions.map((c, i) => {
                  const d = c.to - c.from;
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <span className="font-bold text-[#00d4fd] w-10 shrink-0">T{c.test}</span>
                      <span className="tabular-nums text-[#f9f5f8]/80 w-24 shrink-0">
                        {c.from} → {c.to}
                      </span>
                      <span className={`tabular-nums w-14 shrink-0 ${d < 0 ? 'text-[#00d4fd]' : 'text-[#ff7351]'}`}>
                        {d > 0 ? '+' : ''}{d}
                      </span>
                      {c.note && <span className="text-[#adaaad] italic truncate">{c.note}</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <>
      <dt className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest self-center">{label}</dt>
      <dd className={`tabular-nums ${color ?? 'text-[#f9f5f8]'}`}>{value}</dd>
    </>
  );
}
