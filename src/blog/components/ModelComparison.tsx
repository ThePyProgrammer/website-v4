import { useState } from 'react';

type Model = {
  id: string;
  name: string;
  paper: string;
  paperUrl: string;
  type: string;
  idea: string;
  specs: { label: string; value: string }[];
};

const MODELS: Model[] = [
  {
    id: 'eegnet',
    name: 'EEGNet',
    paper: 'Lawhern et al., 2018',
    paperUrl: 'https://arxiv.org/abs/1611.08024',
    type: 'Compact CNN',
    idea: 'Hardcode the right inductive biases for EEG into a three-stage pipeline: a temporal convolution learns frequency filters (kernel size 64 at 160 Hz covers the 8-30 Hz band), a depthwise spatial convolution learns which channels matter, and a separable convolution extracts higher-order patterns. Small enough that it can\'t overfit.',
    specs: [
      { label: 'Stage 1', value: 'Temporal conv: 8 filters, kernel (1, 64)' },
      { label: 'Stage 2', value: 'Depthwise spatial: depth multiplier 2, kernel (4, 1)' },
      { label: 'Stage 3', value: 'Separable conv: 16 pointwise filters' },
      { label: 'Size', value: '~2K params, 130 KB checkpoint' },
      { label: 'Input', value: '4 channels x 481 samples (3s at 160 Hz)' },
      { label: 'Pre-training', value: 'None' },
      { label: 'Inference', value: '< 5 ms' },
    ],
  },
  {
    id: 'labram',
    name: 'LaBraM',
    paper: 'Jiang et al., 2024',
    paperUrl: 'https://arxiv.org/abs/2405.18765',
    type: '12-layer Transformer',
    idea: 'Pre-train on a large EEG corpus via masked autoencoding, then transfer the learned representations to downstream tasks. The brain equivalent of BERT.',
    specs: [
      { label: 'Layers', value: '12 transformer blocks' },
      { label: 'Parameters', value: '~10M (embed_dim=200, heads=10)' },
      { label: 'Input', value: '4 channels x 200-sample patches' },
      { label: 'Tokenisation', value: '3 patches/ch (601 samples) or 8 (1600)' },
      { label: 'Pre-training', value: 'Masked autoencoding on EEG corpus' },
      { label: 'Inference', value: '~50 ms' },
    ],
  },
];

export function ModelComparison() {
  const [active, setActive] = useState(0);
  const model = MODELS[active];

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          diff eegnet labram
        </span>
      </div>

      <div className="flex border-b border-[#48474a]/30">
        {MODELS.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setActive(i)}
            className={`flex-1 px-5 py-2.5 font-headline text-[11px] uppercase tracking-widest transition-colors ${
              active === i
                ? `border-b-2 ${i === 0 ? 'text-[#00d4fd] border-[#00d4fd] bg-[#00d4fd]/5' : 'text-[#ff7351] border-[#ff7351] bg-[#ff7351]/5'}`
                : 'text-[#adaaad] hover:text-[#f9f5f8]/80'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="p-5">
        <div className="flex items-baseline gap-3 mb-1">
          <span className={`font-headline text-xl font-bold ${active === 0 ? 'text-[#00d4fd]' : 'text-[#ff7351]'}`}>
            {model.name}
          </span>
          <span className="font-mono text-xs text-[#adaaad]">{model.type}</span>
        </div>

        <a
          href={model.paperUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] text-[#00d4fd]/60 hover:text-[#00d4fd] transition-colors"
        >
          {model.paper} &rarr;
        </a>

        <div className="text-sm text-[#f9f5f8]/80 mt-3 mb-4 leading-relaxed">
          {model.idea}
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-xs">
          {model.specs.map((s) => (
            <div key={s.label} className="contents">
              <span className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest self-center">
                {s.label}
              </span>
              <span className="text-[#f9f5f8]">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
