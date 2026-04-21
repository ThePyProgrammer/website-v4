import { useState } from 'react';

type Result = {
  id: string;
  label: string;
  model: 'labram' | 'eegnet';
  accuracy: number;
  trainAcc?: number;
  config: string;
  verdict: string;
};

const RESULTS: Result[] = [
  {
    id: 'labram-frozen',
    label: 'LaBraM frozen probe',
    model: 'labram',
    accuracy: 50.0,
    config: 'Freeze encoder, train classification head only. 3-class (left/right/rest).',
    verdict: 'Class collapse. Predicted majority class for every input.',
  },
  {
    id: 'labram-finetune',
    label: 'LaBraM full fine-tune',
    model: 'labram',
    accuracy: 52.22,
    trainAcc: 99.66,
    config: 'Unfreeze all 12 blocks. Long-context resampling (1600 samples), label smoothing 0.05. Binary.',
    verdict: 'Severe overfitting. 47-point train/val gap.',
  },
  {
    id: 'labram-curriculum',
    label: 'LaBraM curriculum',
    model: 'labram',
    accuracy: 53.78,
    config: 'Stage 1: head-only (12 epochs). Stage 2: unfreeze last 2 blocks. MCC checkpoint selection. Binary.',
    verdict: 'Best LaBraM attempt. Still below EEGNet baseline.',
  },
  {
    id: 'eegnet-baseline',
    label: 'EEGNet cross-subject',
    model: 'eegnet',
    accuracy: 59.19,
    config: 'EEGNetResidual, 4 Muse channels, subjects 1-40 train / 41-50 val. Adam lr=0.001, patience 200.',
    verdict: 'Compact CNN beats the transformer. 130 KB checkpoint.',
  },
  {
    id: 'eegnet-muse',
    label: 'EEGNet + Muse tuning',
    model: 'eegnet',
    accuracy: 65.31,
    config: 'Fine-tune on 247 calibration epochs. Stratified split, no overlap, no freezing, lr=1e-4.',
    verdict: 'Best result. Personalisation > architecture.',
  },
];

const CHANCE = 50;
const MAX_ACC = 70;
const MODEL_COLORS = {
  labram: '#ff7351',
  eegnet: '#00d4fd',
};

export function ResultsLadder() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const barWidth = (acc: number) =>
    ((acc - 45) / (MAX_ACC - 45)) * 100;

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          results_ladder.log
        </span>
      </div>

      <div className="p-5">
        {/* Legend */}
        <div className="flex gap-5 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: MODEL_COLORS.labram }} />
            <span className="font-headline text-[10px] uppercase tracking-widest text-[#adaaad]">LaBraM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: MODEL_COLORS.eegnet }} />
            <span className="font-headline text-[10px] uppercase tracking-widest text-[#adaaad]">EEGNet</span>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-1.5">
          {RESULTS.map((r) => {
            const isExpanded = expanded === r.id;
            const color = MODEL_COLORS[r.model];

            return (
              <div key={r.id}>
                <button
                  onClick={() => setExpanded(isExpanded ? null : r.id)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center gap-4">
                    {/* Label */}
                    <div className="w-[180px] shrink-0 font-mono text-xs text-[#f9f5f8]/85 truncate group-hover:text-[#f9f5f8] transition-colors">
                      {r.label}
                    </div>

                    {/* Bar area */}
                    <div className="flex-1 relative h-7">
                      {/* Chance line */}
                      <div
                        className="absolute top-0 bottom-0 w-px bg-[#ff7351]/30"
                        style={{ left: `${barWidth(CHANCE)}%` }}
                      />
                      {/* Bar */}
                      <div
                        className="absolute top-1 bottom-1 rounded-sm transition-all duration-300"
                        style={{
                          width: `${barWidth(r.accuracy)}%`,
                          background: `linear-gradient(90deg, ${color}33, ${color}aa)`,
                          borderRight: `2px solid ${color}`,
                        }}
                      />
                      {/* Train accuracy ghost bar */}
                      {r.trainAcc && (
                        <div
                          className="absolute top-2.5 bottom-2.5 rounded-sm border border-dashed opacity-30"
                          style={{
                            width: `${barWidth(Math.min(r.trainAcc, MAX_ACC))}%`,
                            borderColor: color,
                          }}
                        />
                      )}
                    </div>

                    {/* Accuracy number */}
                    <div
                      className="w-[60px] shrink-0 text-right font-mono text-sm font-bold tabular-nums"
                      style={{ color }}
                    >
                      {r.accuracy.toFixed(2)}%
                    </div>

                    {/* Expand indicator */}
                    <div className={`text-[#48474a] text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                      &gt;
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="ml-[180px] pl-4 mt-1 mb-3 border-l-2 border-[#48474a]/30">
                    <div className="font-mono text-xs text-[#adaaad] leading-relaxed">
                      {r.config}
                    </div>
                    <div className="font-mono text-xs mt-1.5" style={{ color }}>
                      {r.verdict}
                    </div>
                    {r.trainAcc && (
                      <div className="font-mono text-[10px] text-[#adaaad]/60 mt-1">
                        train acc: {r.trainAcc}% (dashed line)
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Axis labels */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#48474a]/20">
          <div className="w-[180px] shrink-0" />
          <div className="flex-1 relative h-4">
            <div
              className="absolute font-headline text-[9px] text-[#ff7351]/50 uppercase tracking-widest"
              style={{ left: `${barWidth(CHANCE)}%`, transform: 'translateX(-50%)' }}
            >
              chance
            </div>
          </div>
          <div className="w-[60px] shrink-0 text-right font-headline text-[9px] text-[#adaaad] uppercase tracking-widest">
            val acc
          </div>
          <div className="w-[12px]" />
        </div>
      </div>
    </div>
  );
}
