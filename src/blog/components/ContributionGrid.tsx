import * as HoverCard from '@radix-ui/react-hover-card';
import { LOST_CURSOR_AGENTS, type Agent } from '../data/lostCursorAgents';
import { LOST_CURSOR_TESTS, type Test } from '../data/lostCursorTests';

type Cell = { delta: number; note: string; from: number; to: number };

export function ContributionGrid() {
  const cells = LOST_CURSOR_AGENTS.map(agent => ({
    agent,
    perTest: LOST_CURSOR_TESTS.map(test => {
      const c = agent.contributions.find(x => x.test === test.id);
      const cell: Cell | null = c ? { delta: c.to - c.from, note: c.note ?? '', from: c.from, to: c.to } : null;
      return { test, cell };
    }),
  }));

  const maxAbs = Math.max(
    1,
    ...cells.flatMap(r =>
      r.perTest
        .map(p => p.cell)
        .filter((x): x is Cell => x !== null)
        .map(x => Math.abs(x.delta))
    ),
  );

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          contribution_matrix · per-agent move savings
        </span>
      </div>
      <div className="p-6 overflow-x-auto">
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr>
              <th className="text-left font-headline text-[10px] text-[#adaaad] uppercase tracking-widest pb-2 pr-4">
                agent
              </th>
              {LOST_CURSOR_TESTS.map(t => (
                <th key={t.id} className="font-bold text-[#00d4fd] pb-2 px-1 text-center">
                  T{t.id}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map(({ agent, perTest }) => (
              <tr key={agent.id} className="border-t border-[#48474a]/20">
                <td className="py-2 pr-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[#00d4fd]">{agent.id}</span>
                    <span className="text-[9px] text-[#adaaad] italic truncate max-w-[10rem]">
                      {agent.role}
                    </span>
                  </div>
                </td>
                {perTest.map(({ test, cell }) => (
                  <td key={test.id} className="text-center py-2 px-1">
                    {cell ? (
                      <CellCard agent={agent} test={test} cell={cell} maxAbs={maxAbs} />
                    ) : (
                      <span className="text-[#48474a]">·</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center gap-4 text-[10px] text-[#adaaad] font-headline uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#00d4fd]/60" />
            move saved
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#ff7351]/60" />
            move added
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#48474a]">·</span>
            no direct delta
          </span>
          <span className="ml-auto italic normal-case tracking-normal text-[#adaaad]/70">
            hover a cell for context
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-[#adaaad] italic normal-case tracking-normal font-sans">
          There are no coral cells in this matrix by construction: every
          accepted commit was strictly shorter than what it replaced, which
          is what the "overwrite if better" update rule enforces. A <span className="not-italic text-[#48474a]">·</span> means
          no direct delta for that agent on that test. Agents B and D spent
          most of their time on infrastructure and research rather than
          per-test polish, so their rows are sparse by design.
        </p>
      </div>
    </div>
  );
}

function CellCard({ agent, test, cell, maxAbs }: { agent: Agent; test: Test; cell: Cell; maxAbs: number }) {
  const improved = cell.delta < 0;
  const intensity = Math.min(1, Math.abs(cell.delta) / maxAbs);
  const bg = improved
    ? `rgba(0, 212, 253, ${0.15 + intensity * 0.55})`
    : `rgba(255, 115, 81, ${0.15 + intensity * 0.55})`;
  const text = improved ? '#00d4fd' : '#ff7351';

  return (
    <HoverCard.Root openDelay={80} closeDelay={80}>
      <HoverCard.Trigger asChild>
        <button
          type="button"
          className="w-full px-1 py-1 border border-transparent hover:border-current transition-colors cursor-help focus:outline-none"
          style={{ background: bg, color: text }}
        >
          <span className="font-bold tabular-nums">
            {cell.delta > 0 ? '+' : ''}{cell.delta}
          </span>
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align="center"
          sideOffset={6}
          className="z-50 bg-black border border-[#00d4fd]/40 shadow-[0_0_20px_rgba(0,212,253,0.15)] w-[420px]"
        >
          <div className="bg-[#262528] px-3 py-1.5 flex items-center gap-3 border-b border-[#00d4fd]/20">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#ff7351]/40" />
              <div className="w-2 h-2 bg-[#00d4fd]/40" />
              <div className="w-2 h-2 bg-[#00d2fd]/40" />
            </div>
            <span className="font-headline text-[9px] text-[#00d4fd]/60 tracking-widest uppercase">
              contribution · {agent.id} on T{test.id}
            </span>
          </div>
          <div className="p-3 flex gap-3">
            <img
              src={test.img}
              alt={`Test ${test.id}`}
              className="w-24 h-24 object-contain border border-[#48474a]/40 shrink-0"
            />
            <div className="flex-1 min-w-0 font-mono text-[11px] space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-lg font-bold text-[#00d4fd]">T{test.id}</span>
                <span className="text-[#f9f5f8]/80 truncate">{test.character}</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="font-headline text-[9px] text-[#adaaad] uppercase tracking-widest">by</span>
                <span className="font-bold text-[#00d4fd]">{agent.id}</span>
                <span className="text-[#adaaad] italic truncate">· {agent.role}</span>
              </div>
              <div className="flex items-baseline gap-3 pt-1">
                <div>
                  <div className="font-headline text-[9px] text-[#adaaad] uppercase tracking-widest">from</div>
                  <div className="tabular-nums text-[#f9f5f8]/80">{cell.from}</div>
                </div>
                <span className="text-[#00d4fd] text-sm">→</span>
                <div>
                  <div className="font-headline text-[9px] text-[#adaaad] uppercase tracking-widest">to</div>
                  <div className="tabular-nums text-[#f9f5f8]/90">{cell.to}</div>
                </div>
                <div className="ml-auto">
                  <div className="font-headline text-[9px] text-[#adaaad] uppercase tracking-widest">Δ</div>
                  <div className="tabular-nums font-bold" style={{ color: text }}>
                    {cell.delta > 0 ? '+' : ''}{cell.delta}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {cell.note && (
            <div className="px-3 py-2 border-t border-[#48474a]/30 text-[11px] text-[#f9f5f8]/80 leading-relaxed">
              {cell.note}
            </div>
          )}
          <HoverCard.Arrow className="fill-[#00d4fd]/40" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
