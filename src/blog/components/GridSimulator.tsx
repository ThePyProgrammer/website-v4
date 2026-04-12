import { useEffect, useRef, useState } from 'react';

type Move = 'U' | 'D' | 'L' | 'R';

type Preset = { id: string; label: string; img: string; seq: string; note: string; isFinal?: boolean };

const PRESETS: Preset[] = [
  {
    id: '03-baseline',
    label: 'T03 · 1480 moves · push-wall baseline',
    img: '/img/blog/lost-cursor/03.png',
    seq: 'L'.repeat(499) + 'D'.repeat(499) + 'U'.repeat(242) + 'R'.repeat(240),
    note: 'Pure push-to-corner then BFS. The naive floor that every polished algorithm starts from.',
  },
  {
    id: '05-rru',
    label: 'T05 · 102 moves · (RRU)^34 pattern',
    img: '/img/blog/lost-cursor/05.png',
    seq: 'RRU'.repeat(34),
    note: 'Pure structural pattern: +2 right, +1 up per period. The hard floor of the RRU family; non-periodic polish gets it to 101.',
  },
  {
    id: '03-converge',
    label: 'T03 · 1488 moves · centroid-directed push (FAILED)',
    img: '/img/blog/lost-cursor/03.png',
    seq: 'L'.repeat(500) + 'R'.repeat(238) + 'D'.repeat(500) + 'U'.repeat(250),
    note: 'Centroid-directed spiral, overshoots by most of the grid width, costing 266 more moves than the wall-clamp-first baseline.',
  },
  {
    id: '07-depth3',
    label: 'T07 · 35 moves · depth-3 greedy (FAILED)',
    img: '/img/blog/lost-cursor/07.png',
    seq: 'URRDLDLLULDDRRRRURRULLUURDRULLLDDLL',
    note: 'Depth-3 lookahead greedy. 9 moves worse than the 26-move SA output; short-horizon search cannot see past local maxima.',
  },
  {
    id: '05-dim-push',
    label: 'T05 · 200-move dim push (STUCK · 799 alive)',
    img: '/img/blog/lost-cursor/05.png',
    seq: 'R'.repeat(100) + 'D'.repeat(100),
    note: 'Pure R^100 · D^100. Budget exhausts with 799 cursors still alive, vertical strips between raindrops never collapse under single-axis sweeps.',
  },
  {
    id: '06-naive-pattern',
    label: 'T06 · 80-move naive pattern (STUCK · 20,148 alive)',
    img: '/img/blog/lost-cursor/06.png',
    seq: 'LURD'.repeat(20),
    note: 'Representative naive periodic pattern (LURD)^20, stands in for the full-grid beam search without heuristics. At depth 80 the cursor cloud has barely thinned; beam ranked by kill-count alone cannot find the 59-move zigzag.',
  },
  {
    id: '01',
    label: 'T01 · 405 moves · improved',
    isFinal: true,
    img: '/img/blog/lost-cursor/01.png',
    seq: 'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRUUUUUUUUUUUUUUURRRRRRRRRRRRRRRRLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
    note: 'Trophy / chalice, distance-potential greedy (Agent A).',
  },
  {
    id: '02',
    label: 'T02 · 213 moves · iterative_reopt',
    img: '/img/blog/lost-cursor/02.png',
    seq: 'RRRRURDRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDDDDDDDDDDDDDDDDDLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLDDLLLLUUUUUUUUUUUUUUUUUUUURRR',
    note: 'Recraft logo, dense absorption dominates (Agent E).',
    isFinal: true,
  },
  {
    id: '03',
    label: 'T03 · 1222 moves · improved',
    img: '/img/blog/lost-cursor/03.png',
    seq: 'L'.repeat(497) + 'D'.repeat(124) + 'R'.repeat(245) + 'D'.repeat(116) + 'U'.repeat(240),
    note: 'Tiny centre blob, 0.1% black, long wall-clamp crawl to the 195-pixel centre blob (Agent A).',
    isFinal: true,
  },
  {
    id: '04',
    label: 'T04 · 396 moves · mega_polish',
    img: '/img/blog/lost-cursor/04.png',
    seq: 'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRDDRRRRRRRRRRRRRRRRRDRRRRRRRRRRRRRRRRRRRRRRRDLLLLUUURUUUUUUUULLUULUDLDLLLLLLLLLLDLLLUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUULUUUUUUUDLDLDDDLLDUULLLULLDD',
    note: 'Star field, bug-fixed SA after Agent E caught the stale-checkpoint issue. Six cascading improvements in five minutes, final 396 lands 4 off the top score.',
    isFinal: true,
  },
  {
    id: '05',
    label: 'T05 · 101 moves · sa_polish + RRU · TIE',
    img: '/img/blog/lost-cursor/05.png',
    seq: 'LLDLLLDLDLLDLLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLDLLLL',
    note: 'Rainy cityscape, non-periodic polish from the (RRU)^34 floor of 102 moves. Ties the reference.',
    isFinal: true,
  },
  {
    id: '06',
    label: 'T06 · 59 moves · random-seed + compact + SA',
    img: '/img/blog/lost-cursor/06.png',
    seq: 'LLDLLLLLDDDDDDDDRRRRRRRRRRRRUUUUUUUUUULLLLULUULLLLLLLLLLLLU',
    note: 'X/O grid, phase-shifted zigzag.',
    isFinal: true,
  },
  {
    id: '07',
    label: 'T07 · 26 moves · sa_enhanced',
    img: '/img/blog/lost-cursor/07.png',
    seq: 'UULULRRRRDRLLLDRRRDLLLLULL',
    note: 'Scattered fish, singleton local optimum. Every move is uniquely determined at its position.',
    isFinal: true,
  },
  {
    id: '08',
    label: 'T08 · 242 moves · reoptimize + bug-fixed SA',
    img: '/img/blog/lost-cursor/08.png',
    seq: 'UUULLUURULLLULDDRDLLULURULLDDLUUURRRRRRULLLLLLLDDDDDRRRDRRRDDRLLULLLULLLUUUULURULLDDRDDDDDRRRDRRRDRRDDRUURUULUUUUURUUULLLURRRRDDDDRDDRDLLUULRRRRDDDLDRRURULUUULLULUURDRDRRDRDLDRDDRDLLDLLDLULULDDDRDRURDRUURRURRURULULUUURRDRDRDDDLDRRDLDDRRURUURR',
    note: 'Scattered cat heads, 19 moves of this came from LNS suffix reoptimisation at checkpoint 140.',
    isFinal: true,
  },
];

function loadMask(src: string): Promise<{ black: Uint8Array; n: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const n = Math.max(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = n;
      canvas.height = n;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, n, n);
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, n, n);
      const black = new Uint8Array(n * n);
      for (let i = 0; i < n * n; i++) {
        const lum = (data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / 3;
        black[i] = lum < 128 ? 1 : 0;
      }
      resolve({ black, n });
    };
    img.onerror = reject;
    img.src = src;
  });
}

function initialAlive(black: Uint8Array): Uint8Array {
  const alive = new Uint8Array(black.length);
  for (let i = 0; i < black.length; i++) alive[i] = black[i] ? 0 : 1;
  return alive;
}

function applyMove(alive: Uint8Array, black: Uint8Array, n: number, mv: Move): Uint8Array {
  const next = new Uint8Array(alive.length);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!alive[r * n + c]) continue;
      let nr = r, nc = c;
      if (mv === 'U') nr = Math.max(0, r - 1);
      else if (mv === 'D') nr = Math.min(n - 1, r + 1);
      else if (mv === 'L') nc = Math.max(0, c - 1);
      else if (mv === 'R') nc = Math.min(n - 1, c + 1);
      const idx = nr * n + nc;
      if (!black[idx]) next[idx] = 1;
    }
  }
  return next;
}

function countAlive(alive: Uint8Array): number {
  let c = 0;
  for (let i = 0; i < alive.length; i++) c += alive[i];
  return c;
}

const CHECKPOINT_INTERVAL = 25;

export function GridSimulator({ initialPreset, locked }: { initialPreset?: string; locked?: boolean } = {}) {
  const defaultPreset = (initialPreset ? PRESETS.find(p => p.id === initialPreset) : undefined) ?? PRESETS[0];
  const [presetId, setPresetId] = useState(defaultPreset.id);
  const [seq, setSeq] = useState(defaultPreset.seq);
  const [black, setBlack] = useState<Uint8Array | null>(null);
  const [n, setN] = useState(0);
  const [checkpoints, setCheckpoints] = useState<Uint8Array[]>([]);
  const [cleanedSeq, setCleanedSeq] = useState('');
  const [initialCount, setInitialCount] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Cache last-rendered state so sequential playback doesn't replay from a checkpoint every frame.
  const cacheRef = useRef<{ step: number; alive: Uint8Array } | null>(null);
  const preset = PRESETS.find(p => p.id === presetId)!;

  // Load mask when preset changes
  useEffect(() => {
    let cancelled = false;
    setBlack(null);
    loadMask(preset.img).then(({ black: b, n: nn }) => {
      if (cancelled) return;
      setBlack(b);
      setN(nn);
      setSeq(preset.seq);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [presetId]);

  // Rebuild checkpoints when mask or sequence changes
  useEffect(() => {
    if (!black) return;
    const cleaned = seq.toUpperCase().replace(/[^UDLR]/g, '');
    const start = initialAlive(black);
    const cps: Uint8Array[] = [start];
    let cur = start;
    for (let i = 0; i < cleaned.length; i++) {
      cur = applyMove(cur, black, n, cleaned[i] as Move);
      if ((i + 1) % CHECKPOINT_INTERVAL === 0 || i === cleaned.length - 1) {
        cps.push(cur);
      }
    }
    setCheckpoints(cps);
    setCleanedSeq(cleaned);
    setInitialCount(countAlive(start));
    setStep(0);
    cacheRef.current = { step: 0, alive: start };
  }, [black, seq, n]);

  const totalSteps = cleanedSeq.length;

  // Resolve alive grid at arbitrary step via nearest earlier checkpoint, with cache.
  const aliveAtStep = (s: number): Uint8Array | null => {
    if (!black || checkpoints.length === 0) return null;
    const cache = cacheRef.current;
    // Fast path: stepping forward by one.
    if (cache && cache.step === s) return cache.alive;
    if (cache && s > cache.step && s - cache.step <= CHECKPOINT_INTERVAL) {
      let cur = cache.alive;
      for (let i = cache.step; i < s; i++) {
        cur = applyMove(cur, black, n, cleanedSeq[i] as Move);
      }
      cacheRef.current = { step: s, alive: cur };
      return cur;
    }
    // Replay from nearest checkpoint at or before s.
    const cpIdx = Math.min(Math.floor(s / CHECKPOINT_INTERVAL), checkpoints.length - 1);
    let cur = checkpoints[cpIdx];
    const cpStep = cpIdx * CHECKPOINT_INTERVAL;
    for (let i = cpStep; i < s; i++) {
      cur = applyMove(cur, black, n, cleanedSeq[i] as Move);
    }
    cacheRef.current = { step: s, alive: cur };
    return cur;
  };

  // Playback
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep(s => {
        if (s >= totalSteps) { setPlaying(false); return s; }
        return s + 1;
      });
    }, 40);
    return () => clearInterval(id);
  }, [playing, totalSteps]);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !black) return;
    const alive = aliveAtStep(step);
    if (!alive) return;
    const size = canvas.width;
    const scale = size / n;
    const ctx = canvas.getContext('2d')!;
    const img = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const sr = Math.floor(y / scale);
        const sc = Math.floor(x / scale);
        const i = sr * n + sc;
        const o = (y * size + x) * 4;
        if (black[i]) {
          img.data[o] = 38; img.data[o+1] = 37; img.data[o+2] = 40; img.data[o+3] = 255;
        } else if (alive[i]) {
          img.data[o] = 0; img.data[o+1] = 212; img.data[o+2] = 253; img.data[o+3] = 255;
        } else {
          img.data[o] = 14; img.data[o+1] = 14; img.data[o+2] = 16; img.data[o+3] = 255;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [step, checkpoints, black, n, cleanedSeq]);

  const currentAliveGrid = aliveAtStep(step);
  const currentAlive = currentAliveGrid ? countAlive(currentAliveGrid) : 0;
  const nextMove = step < totalSteps ? cleanedSeq[step] : null;

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex items-center gap-4 flex-wrap">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
          <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
        </div>
        <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">
          grid_simulator.live
        </span>
        {locked ? (
          <span className="ml-auto font-mono text-xs text-[#00d4fd] px-2 py-1 border border-[#00d4fd]/40">
            {defaultPreset.label}
          </span>
        ) : (
          <select
            value={presetId}
            onChange={e => setPresetId(e.target.value)}
            className="ml-auto bg-[#0e0e10] border border-[#48474a]/50 text-[#f9f5f8] font-mono text-xs px-2 py-1 focus:outline-none focus:border-[#00d4fd]"
          >
            {PRESETS.filter(p => p.isFinal).map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        )}
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full border-x border-t border-[#48474a]/30 block"
          />
          <div className="bg-[#1a191c] border border-[#48474a]/30 px-2 py-1 flex items-center gap-2 font-mono text-[11px] text-[#f9f5f8]/90">
            <button
              onClick={() => setPlaying(p => !p)}
              className="inline-flex items-center justify-center p-0 text-[#f9f5f8] hover:text-[#00d4fd] transition-colors text-base leading-none border-none bg-transparent focus:outline-none focus-visible:outline-none active:outline-none shrink-0"
              aria-label={playing ? 'pause' : 'play'}
            >
              {playing ? '❚❚' : '▶'}
            </button>
            <input
              type="range"
              min={0}
              max={totalSteps}
              value={step}
              onChange={e => { setStep(parseInt(e.target.value)); setPlaying(false); }}
              className="flex-1 accent-[#00d4fd] h-1 cursor-pointer min-w-0"
            />
            <span className="tabular-nums shrink-0 text-[10px] text-[#adaaad]">
              <span className="text-[#00d4fd]">{step.toString().padStart(String(totalSteps).length, '0')}</span>
              <span className="text-[#adaaad]/60">/{totalSteps}</span>
            </span>
            <button
              onClick={() => { setStep(0); setPlaying(false); }}
              className="inline-flex items-center justify-center p-0 text-[#adaaad] hover:text-[#00d4fd] transition-colors text-sm leading-none border-none bg-transparent focus:outline-none focus-visible:outline-none active:outline-none shrink-0"
              aria-label="reset"
            >
              ↺
            </button>
          </div>
        </div>
        <div className="font-mono text-xs space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Stat label="next move" value={nextMove ?? '-'} accent />
            <Stat label="alive cursors" value={currentAlive.toLocaleString()} accent />
            <Stat label="initial alive" value={initialCount.toLocaleString()} />
            <Stat label="grid size" value={`${n}×${n}`} />
            <Stat label="collapsed" value={initialCount > 0 ? `${((1 - currentAlive / initialCount) * 100).toFixed(1)}%` : '0%'} />
          </div>
          <div className="pt-3 border-t border-[#48474a]/30 text-[#adaaad] italic text-[11px]">
            {preset.note}
          </div>
          <div>
            <div className="font-headline text-[10px] text-[#adaaad] uppercase tracking-widest mb-1">
              sequence ({seq.length} moves)
            </div>
            <textarea
              value={seq}
              onChange={e => setSeq(e.target.value)}
              rows={3}
              className="w-full bg-[#0e0e10] border border-[#48474a]/50 text-[#f9f5f8]/90 font-mono text-[11px] p-2 focus:outline-none focus:border-[#00d4fd] resize-none"
              spellCheck={false}
            />
            <div className="text-[10px] text-[#adaaad] mt-1">
              Only U / D / L / R are used. Edit freely.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="font-headline text-[9px] text-[#adaaad] uppercase tracking-widest">{label}</div>
      <div className={`tabular-nums text-sm ${accent ? 'text-[#00d4fd]' : 'text-[#f9f5f8]/90'}`}>{value}</div>
    </div>
  );
}
