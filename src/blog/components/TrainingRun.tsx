type RunConfig = {
  command: string;
  params: { label: string; value: string }[];
  result: { label: string; value: string; good: boolean };
};

const RUN: RunConfig = {
  command: 'python -m ml --config eeg_config.yaml',
  params: [
    { label: 'subjects', value: '1-40 train / 41-50 val' },
    { label: 'epochs', value: '2,925 train / 750 val' },
    { label: 'window', value: '3.0s (481 samples)' },
    { label: 'bandpass', value: '8-30 Hz (butterworth 5)' },
    { label: 'task', value: 'binary (left vs right)' },
    { label: 'optimizer', value: 'adam lr=0.001' },
    { label: 'stopping', value: 'patience 200' },
  ],
  result: { label: 'result', value: '59.19% val accuracy', good: true },
};

export function TrainingRun() {
  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          terminal
        </span>
      </div>

      <div className="p-4 font-mono text-sm">
        {/* Command */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#00d4fd]">$</span>
          <span className="text-[#f9f5f8]">{RUN.command}</span>
        </div>

        {/* Params */}
        <div className="border-t border-b border-[#48474a]/30 py-2 space-y-1">
          {RUN.params.map((p) => (
            <div key={p.label} className="flex items-baseline gap-3 text-xs">
              <span className="text-[#adaaad] w-24 text-right shrink-0">{p.label}</span>
              <span className="text-[#48474a] mx-2">|</span>
              <span className="text-[#f9f5f8]/80">{p.value}</span>
            </div>
          ))}
        </div>

        {/* Result */}
        <div className="flex items-baseline gap-3 text-xs mt-2">
          <span className="text-[#adaaad] w-24 text-right shrink-0">{RUN.result.label}</span>
          <span className="text-[#48474a] mx-2">|</span>
          <span className={RUN.result.good ? 'text-[#00d4fd] font-bold' : 'text-[#ff7351] font-bold'}>
            {RUN.result.value}
            {RUN.result.good ? ' \u2713' : ' \u2717'}
          </span>
        </div>
      </div>
    </div>
  );
}
