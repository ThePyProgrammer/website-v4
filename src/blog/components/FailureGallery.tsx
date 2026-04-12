import * as Accordion from '@radix-ui/react-accordion';
import { LOST_CURSOR_FAILURES, type Failure } from '../data/lostCursorFailures';
import { GridSimulator } from './GridSimulator';
import { TestRef } from './TestRef';

export function FailureGallery() {
  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          dead_ends · {LOST_CURSOR_FAILURES.length} approaches that didn't work
        </span>
      </div>
      <Accordion.Root type="single" collapsible defaultValue={LOST_CURSOR_FAILURES[0].id}>
        {LOST_CURSOR_FAILURES.map(f => (
          <FailureItem key={f.id} failure={f} />
        ))}
      </Accordion.Root>
    </div>
  );
}

function FailureItem({ failure: f }: { failure: Failure }) {
  return (
    <Accordion.Item value={f.id} className="border-t border-[#48474a]/30">
      <Accordion.Header>
        <Accordion.Trigger
          className="group w-full flex items-center gap-3 px-5 py-3 text-left font-mono text-sm rounded-none hover:bg-[#00d4fd]/10 transition-colors data-[state=open]:bg-[#1a191c] focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4fd] focus-visible:ring-inset"
        >
          <span className="text-[#ff7351] font-headline text-xs w-4 shrink-0 transition-transform group-data-[state=open]:rotate-90">
            ›
          </span>
          <span className="flex-1 text-[#f9f5f8]/90 min-w-0">{f.title}</span>
          {f.presetId && (
            <span className="font-headline text-[10px] text-[#ff7351]/70 uppercase tracking-widest shrink-0">
              simulate
            </span>
          )}
          <span className="flex flex-wrap justify-end items-center gap-1 shrink-0 max-w-[50%]">
            {f.tests.map(t => (
              <span
                key={t}
                className="font-bold text-[10px] px-1.5 py-0.5 border text-[#ff7351] border-[#ff7351]/50 bg-[#ff7351]/5"
              >
                T{t}
              </span>
            ))}
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-5 pt-1 pb-6 space-y-4 font-mono text-sm bg-[#0e0e10]">
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {f.tests.map(t => (
              <TestRef key={t} id={t} />
            ))}
          </div>
          <Section label="formulation" body={f.formulation} />
          <Section label="result" body={f.result} accent />
          <Section label="why it didn't work" body={f.lesson} />
          {f.presetId && (
            <div>
              <div className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest mb-2">
                watch the dead end
              </div>
              <GridSimulator initialPreset={f.presetId} locked />
            </div>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

function Section({ label, body, accent }: { label: string; body: string; accent?: boolean }) {
  return (
    <div>
      <div className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest mb-1">
        {label}
      </div>
      <p className={`leading-relaxed text-[13px] ${accent ? 'text-[#ff7351]' : 'text-[#f9f5f8]/85'}`}>
        {body}
      </p>
    </div>
  );
}
