import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceLine } from 'recharts';

type Row = { value: number; label: string; highlight?: boolean; step: number };
type RefMark = { value: number; label: string };

function parse(source: string): { rows: Row[]; refs: RefMark[] } {
  const rows: Row[] = [];
  const refs: RefMark[] = [];
  let step = 0;
  for (const raw of source.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const refMatch = /^ref\s+(-?\d+(?:\.\d+)?)\s+(.+)$/i.exec(line);
    if (refMatch) {
      refs.push({ value: parseFloat(refMatch[1]), label: refMatch[2].trim() });
      continue;
    }
    const m = /^(!?)\s*(-?\d+(?:\.\d+)?)\s+(.+)$/.exec(line);
    if (!m) continue;
    rows.push({ highlight: m[1] === '!', value: parseFloat(m[2]), label: m[3].trim(), step: step++ });
  }
  return { rows, refs };
}

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row: Row = payload[0].payload;
  return (
    <div className="bg-[#262528] border border-[#00d4fd]/30 px-3 py-2 font-mono text-xs">
      <div className="text-[#00d4fd] font-bold tabular-nums">{row.value}</div>
      <div className="text-[#f9f5f8]/80">{row.label}</div>
    </div>
  );
}

export function ProgressChart({ source, title }: { source: string; title?: string }) {
  const { rows, refs } = parse(source);
  if (rows.length === 0) return null;
  const max = Math.max(...rows.map(r => r.value));
  const min = Math.min(...rows.map(r => r.value), ...refs.map(r => r.value));
  const highlight = rows.find(r => r.highlight) ?? rows[rows.length - 1];

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
            <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
            <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
          </div>
          <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
            {title ?? 'progress'}
          </span>
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/40 tracking-widest uppercase">
          {max} → {min} ({Math.round((1 - min / max) * 100)}% ↓)
        </span>
      </div>
      <div className="p-6 font-mono text-xs">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={rows} margin={{ top: 16, right: 24, left: 8, bottom: 24 }}>
            <CartesianGrid stroke="#48474a" strokeOpacity={0.2} strokeDasharray="2 4" />
            <XAxis
              dataKey="step"
              stroke="#adaaad"
              tick={{ fill: '#adaaad', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#48474a' }}
              axisLine={{ stroke: '#48474a' }}
              label={{ value: 'milestone', position: 'insideBottom', offset: -8, fill: '#adaaad', fontSize: 10, fontFamily: 'monospace' }}
            />
            <YAxis
              stroke="#adaaad"
              tick={{ fill: '#adaaad', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={{ stroke: '#48474a' }}
              axisLine={{ stroke: '#48474a' }}
              label={{ value: 'total moves', angle: -90, position: 'insideLeft', fill: '#adaaad', fontSize: 10, fontFamily: 'monospace' }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#00d4fd', strokeOpacity: 0.3 }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00d4fd"
              strokeWidth={2}
              dot={{ fill: '#00d2fd', stroke: '#00d4fd', strokeWidth: 1, r: 4 }}
              activeDot={{ fill: '#00d4fd', stroke: '#f9f5f8', strokeWidth: 2, r: 6 }}
              isAnimationActive={false}
            />
            <ReferenceDot x={highlight.step} y={highlight.value} r={7} fill="#ff7351" stroke="#f9f5f8" strokeWidth={1.5} />
            {refs.map((r, i) => (
              <ReferenceLine
                key={i}
                y={r.value}
                stroke="#ff7351"
                strokeOpacity={0.7}
                strokeDasharray="6 4"
                label={{
                  value: `${r.label} · ${r.value}`,
                  position: 'bottom',
                  offset: 6,
                  fill: '#ff7351',
                  fontSize: 10,
                  fontFamily: 'monospace',
                }}
                ifOverflow="extendDomain"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
