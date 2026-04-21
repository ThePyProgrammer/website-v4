import { useState } from 'react'; // used by ElectrodeMap

type Dataset = {
  id: string;
  name: string;
  source: string;
  sourceUrl: string;
  subjects: string;
  channels: string;
  channelNames: string;
  sampleRate: string;
  epochLength: string;
  bandpass: string;
  classes: string;
  trainSize: string;
  valSize: string;
  classBalance: string;
  notes: string;
};

const DS: Dataset = {
  id: 'physionet',
  name: 'PhysioNet MMIDB',
  source: 'PhysioNet',
  sourceUrl: 'https://physionet.org/content/eegmmidb/1.0.0/',
  subjects: '109 (train: 1-40, val: 41-50)',
  channels: '4 (remapped from 64)',
  channelNames: 'TP9, AF7, AF8, TP10',
  sampleRate: '160 Hz',
  epochLength: '3.0 s (481 samples)',
  bandpass: '8-30 Hz (5th-order Butterworth)',
  classes: '2 (left hand, right hand)',
  trainSize: '2,925 epochs',
  valSize: '750 epochs',
  classBalance: '1,470 / 1,455 (train), 379 / 371 (val)',
  notes: 'Runs 4, 8, 12 only (motor imagery, not actual movement)',
};

const FIELDS: { key: keyof Dataset; label: string }[] = [
  { key: 'subjects', label: 'Subjects' },
  { key: 'channels', label: 'Channels' },
  { key: 'channelNames', label: 'Electrodes' },
  { key: 'sampleRate', label: 'Sample rate' },
  { key: 'epochLength', label: 'Epoch length' },
  { key: 'bandpass', label: 'Bandpass filter' },
  { key: 'classes', label: 'Classes' },
  { key: 'trainSize', label: 'Train set' },
  { key: 'valSize', label: 'Val set' },
  { key: 'classBalance', label: 'Class balance' },
  { key: 'notes', label: 'Notes' },
];

// 10-10 system electrode positions for PhysioNet MMIDB 64-channel montage.
// Coordinates are in a 200x200 viewBox, head center at (100, 105), nose at top.
const MUSE_CHANNELS = new Set(['AF7', 'AF8', 'T9', 'T10']);

type Electrode = { name: string; x: number; y: number; museAlias?: string };

const ELECTRODES: Electrode[] = [
  // Frontal pole
  { name: 'Fp1', x: 84, y: 16 }, { name: 'Fpz', x: 100, y: 13 }, { name: 'Fp2', x: 116, y: 16 },
  // Anterior frontal
  { name: 'AF7', x: 56, y: 24, museAlias: 'AF7' }, { name: 'AF3', x: 78, y: 22 },
  { name: 'AFz', x: 100, y: 20 },
  { name: 'AF4', x: 122, y: 22 }, { name: 'AF8', x: 144, y: 24, museAlias: 'AF8' },
  // Frontal
  { name: 'F7', x: 40, y: 40 }, { name: 'F5', x: 52, y: 36 }, { name: 'F3', x: 68, y: 34 },
  { name: 'F1', x: 84, y: 32 }, { name: 'Fz', x: 100, y: 31 },
  { name: 'F2', x: 116, y: 32 }, { name: 'F4', x: 132, y: 34 },
  { name: 'F6', x: 148, y: 36 }, { name: 'F8', x: 160, y: 40 },
  // Fronto-temporal
  { name: 'FT7', x: 28, y: 56 }, { name: 'FT8', x: 172, y: 56 },
  // Fronto-central
  { name: 'FC5', x: 44, y: 54 }, { name: 'FC3', x: 64, y: 50 },
  { name: 'FC1', x: 84, y: 48 }, { name: 'FCz', x: 100, y: 47 },
  { name: 'FC2', x: 116, y: 48 }, { name: 'FC4', x: 136, y: 50 }, { name: 'FC6', x: 156, y: 54 },
  // Temporal
  { name: 'T7', x: 20, y: 76 }, { name: 'T8', x: 180, y: 76 },
  { name: 'T9', x: 14, y: 90, museAlias: 'TP9' }, { name: 'T10', x: 186, y: 90, museAlias: 'TP10' },
  // Central
  { name: 'C5', x: 36, y: 72 }, { name: 'C3', x: 60, y: 68 },
  { name: 'C1', x: 82, y: 66 }, { name: 'Cz', x: 100, y: 65 },
  { name: 'C2', x: 118, y: 66 }, { name: 'C4', x: 140, y: 68 }, { name: 'C6', x: 164, y: 72 },
  // Centro-parietal
  { name: 'CP5', x: 44, y: 88 }, { name: 'CP3', x: 64, y: 84 },
  { name: 'CP1', x: 84, y: 82 }, { name: 'CPz', x: 100, y: 81 },
  { name: 'CP2', x: 116, y: 82 }, { name: 'CP4', x: 136, y: 84 }, { name: 'CP6', x: 156, y: 88 },
  // Temporo-parietal
  { name: 'TP7', x: 28, y: 98 }, { name: 'TP8', x: 172, y: 98 },
  // Parietal
  { name: 'P7', x: 40, y: 112 }, { name: 'P5', x: 52, y: 108 }, { name: 'P3', x: 68, y: 106 },
  { name: 'P1', x: 84, y: 104 }, { name: 'Pz', x: 100, y: 103 },
  { name: 'P2', x: 116, y: 104 }, { name: 'P4', x: 132, y: 106 },
  { name: 'P6', x: 148, y: 108 }, { name: 'P8', x: 160, y: 112 },
  // Parieto-occipital
  { name: 'PO7', x: 56, y: 122 }, { name: 'PO3', x: 78, y: 120 },
  { name: 'POz', x: 100, y: 119 },
  { name: 'PO4', x: 122, y: 120 }, { name: 'PO8', x: 144, y: 122 },
  // Occipital
  { name: 'O1', x: 78, y: 132 }, { name: 'Oz', x: 100, y: 133 }, { name: 'O2', x: 122, y: 132 },
  // Inion
  { name: 'Iz', x: 100, y: 144 },
];

function ElectrodeMap() {
  const [showAll, setShowAll] = useState(true);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 200 160" className="w-full max-w-[280px]">
        {/* Head outline */}
        <ellipse cx={100} cy={80} rx={88} ry={72} fill="none" stroke="#48474a" strokeWidth={1} />
        {/* Nose */}
        <path d="M 93 9 L 100 2 L 107 9" fill="none" stroke="#48474a" strokeWidth={1} />
        {/* Ears */}
        <path d="M 12 68 Q 6 78 12 88" fill="none" stroke="#48474a" strokeWidth={1} />
        <path d="M 188 68 Q 194 78 188 88" fill="none" stroke="#48474a" strokeWidth={1} />

        {/* Electrodes */}
        {ELECTRODES.map((e) => {
          const isMuse = MUSE_CHANNELS.has(e.name);
          const isHovered = hover === e.name;
          const dimmed = !showAll && !isMuse;

          return (
            <g
              key={e.name}
              onMouseEnter={() => setHover(e.name)}
              onMouseLeave={() => setHover(null)}
              className="cursor-default"
            >
              <circle
                cx={e.x}
                cy={e.y}
                r={isMuse ? 5 : 3.5}
                fill={dimmed ? 'transparent' : isMuse ? '#00d4fd' : '#48474a'}
                stroke={dimmed ? '#48474a' : isMuse ? '#00d4fd' : '#6b6a6e'}
                strokeWidth={dimmed ? 0.5 : isMuse ? 1.5 : 0.8}
                opacity={dimmed ? 0.2 : isHovered ? 1 : isMuse ? 1 : 0.7}
                className="transition-all duration-200"
              />
              {(isHovered || (isMuse && showAll)) && (
                <text
                  x={e.x}
                  y={e.y - (isMuse ? 8 : 6)}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize={isMuse ? 7 : 6}
                  fill={isMuse ? '#00d4fd' : '#adaaad'}
                >
                  {e.museAlias ?? e.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Count annotation */}
        {!showAll && (
          <text x={100} y={156} textAnchor="middle" className="font-headline" fontSize={7} fill="#adaaad">
            4 of 64 channels
          </text>
        )}
      </svg>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div
          className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
            showAll ? 'border-[#00d4fd] bg-[#00d4fd]/20' : 'border-[#48474a]'
          }`}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll && (
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-[#00d4fd]">
              <path d="M 2 6 L 5 9 L 10 3" fill="none" stroke="currentColor" strokeWidth={2} />
            </svg>
          )}
        </div>
        <span
          className="font-headline text-[10px] uppercase tracking-widest text-[#adaaad]"
          onClick={() => setShowAll(!showAll)}
        >
          Show all 64 channels
        </span>
      </label>
    </div>
  );
}

export function DatasetProfile() {
  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          physionet_mmidb.yaml
        </span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {[FIELDS.slice(0, Math.ceil(FIELDS.length / 2)), FIELDS.slice(Math.ceil(FIELDS.length / 2))].map((col, ci) => (
            <div key={ci} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0">
              {col.map(({ key, label }) => (
                <div key={key} className="contents">
                  <div className="py-2 border-b border-[#48474a]/20 font-headline text-[10px] uppercase tracking-widest text-[#adaaad] flex items-start">
                    {label}
                  </div>
                  <div className="py-2 border-b border-[#48474a]/20 font-mono text-sm text-[#f9f5f8]/85 flex items-start">
                    {key === 'notes' ? (
                      <span className="text-[#adaaad] italic text-xs">{DS[key]}</span>
                    ) : (
                      DS[key]
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-[#48474a]/30 flex flex-col items-center">
          <div className="font-headline text-[10px] uppercase tracking-widest text-[#adaaad] mb-3">
            10-10 Electrode Montage
          </div>
          <ElectrodeMap />
        </div>

        <div className="mt-4 pt-3 border-t border-[#48474a]/30">
          <a
            href={DS.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="font-headline text-[10px] uppercase tracking-widest text-[#00d4fd]/60 hover:text-[#00d4fd] transition-colors"
          >
            {DS.source} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
