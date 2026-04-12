import * as HoverCard from '@radix-ui/react-hover-card';
import { useState } from 'react';
import katex from 'katex';
import { getTest } from '../data/lostCursorTests';

const dMaxLabel = {
  __html: katex.renderToString('d_{\\max}', { throwOnError: false }),
};

export function TestRef({ id }: { id: string }) {
  const test = getTest(id);
  const [open, setOpen] = useState(false);
  if (!test) return <span className="font-mono text-[#ff7351]">T{id}?</span>;

  const delta = test.ours - test.ref;
  const won = test.ours <= test.ref;

  return (
    <HoverCard.Root open={open} onOpenChange={setOpen} openDelay={120} closeDelay={80}>
      <HoverCard.Trigger asChild>
        <span
          tabIndex={0}
          className={`inline-block align-baseline font-mono font-bold not-italic text-[0.9em] leading-none px-1.5 py-0.5 border cursor-default transition-colors ${
            open
              ? 'bg-[#00d4fd] text-[#0e0e10] border-[#00d4fd]'
              : 'text-[#00d4fd] border-[#00d4fd]/40 hover:border-[#00d4fd] hover:bg-[#00d4fd]/10'
          }`}
        >
          T{test.id}
        </span>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align="center"
          sideOffset={6}
          className="z-50 bg-black border border-[#00d4fd]/40 shadow-[0_0_20px_rgba(0,212,253,0.15)] w-[360px]"
        >
          <div className="bg-[#262528] px-3 py-1.5 flex items-center gap-3 border-b border-[#00d4fd]/20">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-[#ff7351]/40" />
              <div className="w-2 h-2 bg-[#00d4fd]/40" />
              <div className="w-2 h-2 bg-[#00d2fd]/40" />
            </div>
            <span className="font-headline text-[9px] text-[#00d4fd]/60 tracking-widest uppercase">
              test_{test.id}.info
            </span>
          </div>
          <div className="p-3 flex gap-3">
            <img src={test.img} alt={`Test ${test.id}`} className="w-24 h-24 object-contain border border-[#48474a]/40 shrink-0" />
            <div className="flex-1 min-w-0 font-mono text-[11px] space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-lg font-bold text-[#00d4fd]">T{test.id}</span>
                <span className="text-[#f9f5f8]/80 truncate">{test.character}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px]">
                <Row label="% black" value={`${test.pctBlack}%`} />
                <Row labelNode={<span dangerouslySetInnerHTML={dMaxLabel} />} value={test.dMax.toFixed(1)} />
                <Row label="ours" value={test.ours.toString()} highlight={won} />
                <Row label="ref"  value={test.ref.toString()} />
                <Row label="Δ"    value={(delta >= 0 ? '+' : '') + delta} highlight={won} bad={!won} />
                <Row label="by"   value={test.credit} />
              </div>
              <div className="pt-1 text-[10px] text-[#adaaad] italic truncate">
                {test.bestAlgo}
              </div>
            </div>
          </div>
          <HoverCard.Arrow className="fill-[#00d4fd]/40" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

function Row({ label, labelNode, value, highlight, bad }: { label?: string; labelNode?: React.ReactNode; value: string; highlight?: boolean; bad?: boolean }) {
  const color = highlight ? 'text-[#00d4fd]' : bad ? 'text-[#ff7351]' : 'text-[#f9f5f8]/90';
  return (
    <>
      <span className="text-[#adaaad] uppercase tracking-wider text-[9px] self-center">
        {labelNode ?? label}
      </span>
      <span className={`tabular-nums ${color}`}>{value}</span>
    </>
  );
}
