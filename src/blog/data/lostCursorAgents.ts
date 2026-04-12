export type AgentContribution = {
  test: string;      // "01".."08"
  from: number;      // starting moves
  to: number;        // ending moves
  note?: string;
};

export type Agent = {
  id: string;        // "A" | "B" | "C" | "D" | "E" | "HUMAN"
  name: string;
  role: string;      // short tagline
  entry: number | null;   // total moves when agent started
  exit: number | null;    // total moves when agent finished
  deliverables: string[]; // list of shipped artefacts
  contributions: AgentContribution[];
  notes: string;     // longer prose description
};

export const LOST_CURSOR_AGENTS: Agent[] = [
  {
    id: 'A',
    name: 'Agent A',
    role: 'Scaffolding and vocabulary',
    entry: 8583,
    exit: 2709,
    deliverables: [
      'numpy simulator (shift-and-mask)',
      'Baseline family: push-to-wall, greedy, adaptive, gap-sweep',
      'improved multi-strategy solver',
      'sa_enhanced polisher',
      'pattern-DLL brute-force for T05',
      'beam-tail optimiser',
    ],
    contributions: [
      { test: '01', from: 8583, to: 405, note: 'Final via improved (distance-potential greedy)' },
      { test: '03', from: 8583, to: 1222, note: 'Final via improved (long wall-clamp crawl)' },
      { test: '07', from: 8583, to: 26, note: 'Final via sa_enhanced' },
    ],
    notes: 'Wrote roughly half of algos/. The simulator abstraction from A is what made every downstream experiment feasible.',
  },
  {
    id: 'B',
    name: 'Agent B',
    role: 'Infrastructure',
    entry: null,
    exit: null,
    deliverables: [
      'Second numpy simulator (built independently, cross-check caught a border-clamping bug in A\'s version)',
      'seven-strategy best-of (algos/smart.py)',
      'best/best.json tracking harness',
      'pack_final.py submission packager',
      'Merge arbitration when parallel branches diverged',
    ],
    contributions: [],
    notes: 'No per-test deltas, B\'s contribution is the substrate that let every other agent coordinate through "overwrite if better."',
  },
  {
    id: 'C',
    name: 'Agent C',
    role: 'The third pass',
    entry: 2811,
    exit: 2665,
    deliverables: [
      'RRU zigzag discovery on T05',
      'Iterative beam-tail for T08',
      'Random-seed + compact-pass on T06',
      'Catalogue of what didn\'t work (saved later agents hours)',
    ],
    contributions: [
      { test: '05', from: 189, to: 102, note: '(RRU)^34 structural pattern, −87 moves' },
      { test: '08', from: 276, to: 261, note: 'Iterative beam-tail, −15 moves' },
      { test: '06', from: 65, to: 60, note: 'Random-seed + compact, −5 moves' },
    ],
    notes: 'Entered at 2,811, left at 2,665. The RRU find on T05 was the single biggest drop of any session.',
  },
  {
    id: 'D',
    name: 'Agent D',
    role: 'The researcher',
    entry: 4542,
    exit: 2664,
    deliverables: [
      'Parallel subagent research team (4 researchers) on synchronising-word literature',
      '8 implementation subagents across 4 waves: wavefront, zigzag, sa_polish, beam, targeted, shortseq, rain_fish',
      'reoptimize.py (LNS suffix reoptimiser)',
    ],
    contributions: [
      { test: '08', from: 261, to: 242, note: 'LNS suffix reopt at cp=140, −19 moves' },
    ],
    notes: 'Deepest tool-use footprint of any agent. Entered at 4,542, left at 2,664. Most of the cited papers came from D\'s research dispatch.',
  },
  {
    id: 'E',
    name: 'Agent E',
    role: 'The bug hunter',
    entry: 2724,
    exit: 2664,
    deliverables: [
      'Diagnosed the stale-checkpoint bug in SA',
      'mega_polish.py (verified-before-accept + sparse sim + position-weighted mutations + reheating)',
      'iterative_reopt.py',
      'ensemble_solve.py',
      'exhaustive_local.py',
    ],
    contributions: [
      { test: '04', from: 414, to: 396, note: 'Bug-fix cascade, −18 moves' },
      { test: '02', from: 214, to: 213, note: '−1 move' },
      { test: '06', from: 60, to: 59, note: '−1 move' },
    ],
    notes: 'Entered at 2,724. Didn\'t write much new algorithm code, found THE bug. The fifteen-line verify-before-accept patch was the highest-leverage change in the whole project. Effectively debugging A\'s code through the shared filesystem.',
  },
];
