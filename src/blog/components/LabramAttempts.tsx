import { useState, type ReactNode } from 'react';

type Attempt = {
  id: string;
  label: string;
  strategy: string;
  config: string[];
  valAcc: number;
  trainAcc?: number;
  extraMetric?: { label: string; value: string };
  verdict: string;
  verdictBad: boolean;
};

const ATTEMPTS: Attempt[] = [
  {
    id: '1',
    label: 'Frozen probe',
    strategy: 'Freeze the entire 12-layer transformer encoder and train only a linear classification head on top. Tests whether the pre-trained representations already contain motor imagery information.',
    config: [
      '3-class (left / right / rest)',
      'Linear head on frozen embeddings',
      'Standard cross-entropy',
    ],
    valAcc: 50.0,
    verdict: 'Class collapse. Predicted majority class for every input. 450/900 rest = 50%.',
    verdictBad: true,
  },
  {
    id: '2',
    label: 'Full fine-tune',
    strategy: 'Unfreeze all 12 transformer blocks and let the entire model adapt. Added long-context resampling to squeeze more tokens out of each epoch (3 patches to 8) and label smoothing to soften the loss.',
    config: [
      'Binary (left / right)',
      'Long-context resampling (1600 samples)',
      'Label smoothing \u03B5 = 0.05',
    ],
    valAcc: 52.22,
    trainAcc: 99.66,
    verdict: 'Severe overfitting. 47-point gap between train and val accuracy.',
    verdictBad: true,
  },
  {
    id: '3',
    label: 'Curriculum',
    strategy: 'Two-stage curriculum: train only the classification head for 12 epochs to find a stable starting point, then unfreeze the last 2 transformer blocks and continue. Used Matthews Correlation Coefficient instead of raw accuracy for checkpoint selection to handle class imbalance.',
    config: [
      'Binary (left / right)',
      'Stage 1: head-only for 12 epochs',
      'Stage 2: unfreeze last 2 blocks',
      'MCC-based checkpoint selection',
    ],
    valAcc: 53.78,
    extraMetric: { label: 'MCC', value: '0.0753' },
    verdict: 'Best LaBraM attempt. Still 5.4 points below EEGNet baseline.',
    verdictBad: false,
  },
];

export function LabramAttempts() {
  const [selected, setSelected] = useState<Attempt>(ATTEMPTS[0]);

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          labram_experiments.log
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-end bg-[#1a191c] px-2 pt-2 gap-0.5 border-b border-[#ff7351]/30">
        {ATTEMPTS.map((a) => {
          const active = selected.id === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className={`group relative font-mono text-[11px] px-4 py-1.5 tracking-widest transition-colors focus:outline-none ${
                active
                  ? 'bg-black text-[#ff7351] border-t-2 border-x-2 border-[#ff7351] -mb-px z-10'
                  : 'bg-[#262528] text-[#ff7351]/50 border-t border-x border-[#48474a]/30 hover:bg-[#ff7351]/10 hover:text-[#ff7351] hover:border-[#ff7351]/60'
              }`}
            >
              <span className={active ? 'text-[#ff7351]' : 'text-[#adaaad]/40'}>
                {active ? '\u2716 ' : '\u25CB '}
              </span>
              <span>#{a.id}</span>
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-px bg-black" />
              )}
            </button>
          );
        })}
        <div className="flex-1 border-b border-[#ff7351]/30 self-end h-0" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-headline text-3xl font-bold text-[#ff7351]">#{selected.id}</span>
          <span className="text-[#f9f5f8]/80 font-mono text-sm">{selected.label}</span>
        </div>
        <div className="text-sm text-[#f9f5f8]/60 mb-4">{selected.strategy}</div>

        <dl className="grid grid-cols-2 gap-y-2 gap-x-6 font-mono text-xs mb-4">
          <Stat label="val acc" value={`${selected.valAcc.toFixed(2)}%`} bad={selected.valAcc <= 53} />
          {selected.trainAcc && (
            <Stat label="train acc" value={`${selected.trainAcc}%`} />
          )}
          {selected.extraMetric && (
            <Stat label={selected.extraMetric.label} value={selected.extraMetric.value} />
          )}
          <Stat label="vs chance (50%)" value={`+${(selected.valAcc - 50).toFixed(2)}`} bad={selected.valAcc - 50 < 5} />
          <Stat label="vs eegnet (59.19%)" value={`${(selected.valAcc - 59.19).toFixed(2)}`} bad />
        </dl>

        <div className="mb-4">
          <span className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest">config</span>
          <div className="mt-1.5 space-y-1">
            {selected.config.map((line, i) => (
              <div key={i} className="flex items-start gap-2 font-mono text-xs text-[#f9f5f8]/80">
                <span className="text-[#ff7351] shrink-0">&gt;&gt;</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#48474a]/30">
          <span className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest">verdict </span>
          <span className={`font-mono text-xs ${selected.verdictBad ? 'text-[#ff7351]' : 'text-[#ffd93d]'}`}>
            {selected.verdict}
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, bad }: { label: ReactNode; value: string; bad?: boolean }) {
  const color = bad ? 'text-[#ff7351]' : 'text-[#f9f5f8]';
  return (
    <>
      <dt className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest self-center">{label}</dt>
      <dd className={`tabular-nums ${color}`}>{value}</dd>
    </>
  );
}
