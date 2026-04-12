export type Test = {
  id: string;
  img: string;
  pctBlack: number;
  dMax: number;
  character: string;
  ours: number;
  ref: number;
  bestAlgo: string;
  credit: string;
  notes: string;
};

export const LOST_CURSOR_TESTS: Test[] = [
  { id: '01', img: '/img/blog/lost-cursor/01.png', pctBlack: 52.1, dMax: 160.1, character: 'Trophy / chalice', ours: 405, ref: 390, bestAlgo: 'improved', credit: 'Agent A', notes: 'trophy symmetry unexploited' },
  { id: '02', img: '/img/blog/lost-cursor/02.png', pctBlack: 77.7, dMax: 4.0,   character: 'Recraft logo',    ours: 213, ref: 208, bestAlgo: 'iterative_reopt', credit: 'Agent E', notes: 'tight' },
  { id: '03', img: '/img/blog/lost-cursor/03.png', pctBlack: 0.1,  dMax: 249.5, character: 'Tiny centre blob', ours: 1222, ref: 1210, bestAlgo: 'improved', credit: 'Agent A', notes: 'simulator too slow for deep SA' },
  { id: '04', img: '/img/blog/lost-cursor/04.png', pctBlack: 4.9,  dMax: 23.4,  character: 'Star field',      ours: 396, ref: 392, bestAlgo: 'mega_polish', credit: 'Agent E', notes: 'bug-fixed SA cascade, 4 off the top score' },
  { id: '05', img: '/img/blog/lost-cursor/05.png', pctBlack: 29.4, dMax: 20.0,  character: 'Rainy cityscape', ours: 101, ref: 101, bestAlgo: 'sa_polish + RRU', credit: 'Agents C/D', notes: 'tie with top score; RRU floors at 102' },
  { id: '06', img: '/img/blog/lost-cursor/06.png', pctBlack: 16.5, dMax: 10.6,  character: 'X/O grid',        ours: 59,  ref: 57,  bestAlgo: 'random-seed + compact + SA', credit: 'mixed', notes: 'probably a phase-shifted zigzag' },
  { id: '07', img: '/img/blog/lost-cursor/07.png', pctBlack: 13.9, dMax: 9.1,   character: 'Scattered fish',  ours: 26,  ref: 24,  bestAlgo: 'sa_enhanced', credit: 'Agent A', notes: 'singleton local optimum' },
  { id: '08', img: '/img/blog/lost-cursor/08.png', pctBlack: 3.6,  dMax: 18.4,  character: 'Scattered cat heads', ours: 242, ref: 233, bestAlgo: 'reoptimize + bug-fixed SA', credit: 'Agents D/E', notes: '19 moves from LNS at cp=140' },
];

export function getTest(id: string): Test | undefined {
  return LOST_CURSOR_TESTS.find(t => t.id === id.padStart(2, '0'));
}
