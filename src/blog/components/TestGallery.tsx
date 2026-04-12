import { useState, type ReactNode } from 'react';
import katex from 'katex';
import { LOST_CURSOR_TESTS, type Test } from '../data/lostCursorTests';

const dMaxLabel = (
  <span
    className="normal-case tracking-normal"
    dangerouslySetInnerHTML={{ __html: katex.renderToString('d_{\\max}', { throwOnError: false }) }}
  />
);

const TESTS = LOST_CURSOR_TESTS;

export function TestGallery() {
  const [selected, setSelected] = useState<Test>(TESTS[4]);

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          test_gallery.explore, click a test
        </span>
      </div>
      <div className="flex items-end bg-[#1a191c] px-2 pt-2 gap-0.5 border-b border-[#00d4fd]/30">
        {TESTS.map(t => {
          const active = selected.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelected(t)}
              className={`group relative font-mono text-[11px] px-4 py-1.5 tracking-widest transition-colors focus:outline-none focus-visible:outline-none ${
                active
                  ? 'bg-black text-[#00d4fd] border-t-2 border-x-2 border-[#00d4fd] hover:border-[#00d4fd] hover:text-[#00d4fd] hover:bg-black -mb-px z-10'
                  : 'bg-[#262528] text-[#00d4fd]/50 border-t border-x border-[#48474a]/30 hover:bg-[#00d4fd]/10 hover:text-[#00d4fd] hover:border-[#00d4fd]/60'
              }`}
            >
              <span className={active ? 'text-[#00d4fd]' : 'text-[#adaaad]/40'}>
                {active ? '● ' : '○ '}
              </span>
              <span>T{t.id}</span>
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-px bg-black" />
              )}
            </button>
          );
        })}
        <div className="flex-1 border-b border-[#00d4fd]/30 self-end h-0" />
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="relative aspect-square border border-[#48474a]/40 bg-[#0e0e10]">
            <img
              key={selected.id}
              src={selected.img}
              alt={`Test ${selected.id}`}
              className="w-full h-full object-contain"
            />
            <span className="absolute top-2 left-2 bg-black/80 text-[#00d4fd] font-headline text-[10px] px-2 py-0.5 tracking-widest uppercase">
              {selected.img.split('/').pop()}
            </span>
          </div>
        </div>
        <div className="lg:col-span-3 font-mono text-sm">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-headline text-3xl font-bold text-[#00d4fd]">T{selected.id}</span>
            <span className="text-[#f9f5f8]/80">{selected.character}</span>
          </div>
          <dl className="grid grid-cols-2 gap-y-2 gap-x-6 text-xs">
            <Stat label="% black"   value={`${selected.pctBlack}%`} />
            <Stat label={dMaxLabel} value={selected.dMax.toFixed(1)} />
            <Stat label="our score" value={selected.ours.toString()} highlight={selected.ours <= selected.ref} />
            <Stat label="reference" value={selected.ref.toString()} />
            <Stat label="delta"     value={(selected.ours - selected.ref >= 0 ? '+' : '') + (selected.ours - selected.ref)}
                                    highlight={selected.ours <= selected.ref}
                                    bad={selected.ours > selected.ref} />
            <Stat label="credit"    value={selected.credit} />
          </dl>
          <div className="mt-4 pt-4 border-t border-[#48474a]/30 text-xs space-y-2">
            <div>
              <span className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest">best_algo </span>
              <span className="text-[#f9f5f8]/90">{selected.bestAlgo}</span>
            </div>
            <div>
              <span className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest">notes </span>
              <span className="text-[#f9f5f8]/70 italic">{selected.notes}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-2.5 border-t border-[#48474a]/30 text-[10px] font-headline text-[#adaaad]/70 uppercase tracking-widest">
        images contributed by{' '}
        <a
          href="https://www.recraft.ai/"
          target="_blank"
          rel="noreferrer"
          className="inline-block align-baseline text-[#00d4fd] border border-[#00d4fd]/60 px-1.5 py-[1px] mx-0.5 transition-colors hover:bg-[#00d4fd] hover:border-[#00d4fd] hover:!text-black"
        >
          recraft
        </a>
        , who sponsored the round · T02's "R" is their logo
      </div>
    </div>
  );
}

function Stat({ label, value, highlight, bad }: { label: ReactNode; value: string; highlight?: boolean; bad?: boolean }) {
  const color = highlight ? 'text-[#00d4fd]' : bad ? 'text-[#ff7351]' : 'text-[#f9f5f8]';
  return (
    <>
      <dt className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest self-center">{label}</dt>
      <dd className={`tabular-nums ${color}`}>{value}</dd>
    </>
  );
}
