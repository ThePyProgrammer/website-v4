import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DATA = [
  { name: 'Block deletion (1–5 moves)', value: 25 },
  { name: 'Single substitution', value: 15 },
  { name: 'Block replace (k → k−1)', value: 13 },
  { name: 'Dead-move deletion', value: 10 },
  { name: 'Adjacent swap', value: 9 },
  { name: 'Cancel opposite pair (UD / LR)', value: 8 },
  { name: 'Segment reversal', value: 7 },
  { name: 'Insertion', value: 5 },
  { name: 'Opposite substitution', value: 4 },
  { name: 'Segment relocation', value: 4 },
];

const COLORS = [
  '#00d4fd', '#00d2fd', '#7cc4f0', '#5ab0dc', '#4a95c0',
  '#ff7351', '#d96249', '#b85540', '#8a4532', '#5c3322',
];

export function MutationDonut() {
  const [hover, setHover] = useState<number | null>(null);
  const active = hover ?? 0;
  const total = DATA.reduce((a, b) => a + b.value, 0);

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          sa_mutation_weights.dist
        </span>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                dataKey="value"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={1}
                stroke="#0e0e10"
                strokeWidth={2}
                onMouseEnter={(_, i) => setHover(i)}
                onMouseLeave={() => setHover(null)}
                isAnimationActive={false}
              >
                {DATA.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i]}
                    opacity={hover === null || hover === i ? 1 : 0.35}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="font-mono text-2xl font-bold text-[#00d4fd] tabular-nums">
              {DATA[active].value}%
            </div>
            <div className="font-headline text-[9px] text-[#adaaad] uppercase tracking-widest mt-1">
              {hover === null ? 'top weight' : 'selected'}
            </div>
          </div>
        </div>
        <ul className="space-y-1.5 font-mono text-xs">
          {DATA.map((row, i) => (
            <li
              key={row.name}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={`flex items-center gap-3 cursor-default transition-opacity ${hover !== null && hover !== i ? 'opacity-40' : 'opacity-100'}`}
            >
              <span className="w-2.5 h-2.5 shrink-0" style={{ background: COLORS[i] }} />
              <span className="flex-1 text-[#f9f5f8]/85 truncate">{row.name}</span>
              <span className="tabular-nums text-[#00d4fd] w-10 text-right">{row.value}%</span>
            </li>
          ))}
          <li className="flex items-center gap-3 pt-2 mt-2 border-t border-[#48474a]/30">
            <span className="w-2.5 h-2.5 shrink-0" />
            <span className="flex-1 font-headline text-[10px] uppercase tracking-widest text-[#adaaad]">total</span>
            <span className="tabular-nums text-[#f9f5f8] w-10 text-right">{total}%</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
