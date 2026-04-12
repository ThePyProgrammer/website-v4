export type Failure = {
  id: string;
  title: string;
  tests: string[];         // "01".."08"
  formulation: string;     // what was tried, technically
  result: string;          // what happened
  lesson: string;          // why it didn't work / what it told us
  presetId?: string;       // GridSimulator preset to embed, if any
};

export const LOST_CURSOR_FAILURES: Failure[] = [
  {
    id: 'pure-dim-push',
    title: 'Pure dimensional push',
    tests: ['05'],
    formulation: 'Every permutation of long directional runs, R^H · D^V, L^H · U^V, and the six other orderings, capped at 200 moves total. The hope was that the cloud/ground bands in T05 would fully absorb after one wall-push and one sweep.',
    result: 'No valid solution under 200 moves. The middle rain band never fully collapses because single directional sweeps leave vertical strips of alive cursors between raindrops.',
    lesson: 'The rain pattern has horizontal and vertical periodicity at different scales. You need a cycle that sweeps both axes simultaneously (which is what RRU turns out to do). In the sim below: R^100 · D^100 exhausts its 200-move budget with 799 cursors still alive.',
    presetId: '05-dim-push',
  },
  {
    id: 'beam-no-heuristic',
    title: 'Full-grid beam search from scratch',
    tests: ['06'],
    formulation: 'Standard beam search, width 150, depth 80 from the fully-alive initial state. No heuristic, pure kill-count-then-uniqueness-hash ranking.',
    result: '643 cursors still alive at depth 80. Beam search would need to go much deeper to finish, and width 150 is already memory-bound.',
    lesson: 'Beam without a heuristic can\'t exploit periodicity. The 59-move zigzag that works on T06 lives inside a narrow slice of the search space that purely greedy beam ranking never visits. The sim below stands in for this with a representative naive pattern, (LURD)^20, 80 moves, that leaves 20,148 cursors alive at depth 80. The actual beam run ends at a different 643-alive state, but the failure mode is the same.',
    presetId: '06-naive-pattern',
  },
  {
    id: 'sa-prebugfix',
    title: 'Three-minute SA from improved outputs (pre-bug-fix)',
    tests: ['01', '02', '03', '04', '06', '07'],
    formulation: 'SA polisher run for 3 minutes on each test, starting from the current best sequence. Standard mutation mix, checkpoint-validated acceptance.',
    result: 'Zero reported improvements on six of the eight tests.',
    lesson: 'Turned out every "zero improvements" was a lie, the checkpoints were stale, so valid candidates were being accepted as phantom improvements and then silently dropped at the full-sim cross-check. Fixing the verifier exposed a cascade of improvements that had been reachable the whole time.',
  },
  {
    id: 'exhaustive-zigzag-t06',
    title: 'Exhaustive zigzag period-2..6 on T06',
    tests: ['06'],
    formulation: 'Enumerate every periodic pattern of period 2, 3, 4, 5, 6 over {U,D,L,R}, 5,456 patterns, and test each. Best is kept.',
    result: 'None beat the existing 59-move solution. Best periodic pattern was comfortably above 59.',
    lesson: 'T06\'s X/O grid has a spatial structure that the winning 59-move sequence exploits via phase-shifts mid-pattern, not pure repetition. Periodicity alone isn\'t enough.',
  },
  {
    id: 'centroid-push-t03',
    title: 'Centroid-directed push on T03',
    tests: ['03'],
    formulation: 'Compute the centroid of the 195 black pixels and push directly toward it (L^a · D^b or whatever shortest corner-to-centroid vector), then spiral outward.',
    result: '1,488 moves, worse than improved\'s 1,222-move wall-clamp-then-corner-nav.',
    lesson: 'Pushing toward the centroid is too aggressive when the black region is a 20-pixel blob: you overshoot by most of the grid width. Wall clamping gives you 495 moves of free collapse before you have to aim precisely.',
    presetId: '03-converge',
  },
  {
    id: 'depth3-t07',
    title: 'Depth-3 greedy on T07',
    tests: ['07'],
    formulation: 'At every step, enumerate all 64 move-triplets, simulate each, pick the first move whose best downstream triplet kills the most cursors.',
    result: '35 moves, strictly worse than the 26-move sa_enhanced output.',
    lesson: 'Short-horizon greedy cannot find the 26-move sequence because every step on the optimal path looks locally worse than an alternative that is globally a dead end. The SA run found it by accepting several temporary regressions.',
    presetId: '07-depth3',
  },
  {
    id: 'diverse-seeds-t08',
    title: 'Ensemble of 100+ diverse starting solutions for T08',
    tests: ['08'],
    formulation: '100+ diverse initial sequences generated from different solvers (improved, adaptive, gap-sweep, wavefront, zigzag, random restarts), each polished independently with SA for 5 minutes.',
    result: 'Every ensemble member was strictly worse than the improved baseline + SA polish.',
    lesson: 'The bottleneck on T08 was polishing depth, not seed diversity. Wider LNS reoptimisation at a good checkpoint shaved 19 moves; running more SA from scratch at 100 different seeds shaved zero.',
  },
  {
    id: 'exhaustive-local',
    title: 'Exhaustive local search on T05 and T07',
    tests: ['05', '07'],
    formulation: 'Enumerate every valid single-move substitution, every k-for-(k−1) block replacement for k∈{2,3,4}, and every adjacent swap.',
    result: 'T07 has zero valid single-substitutions and zero valid block replacements for k∈{2,3,4}. Every move in the 26-move sequence is uniquely determined at its position. T05 similar.',
    lesson: 'Both sequences are singleton local optima, no local move helps. To beat 26 or 101, you need a fundamentally different sequence reached through non-local search (genetic crossover between optima, or a structural insight).',
  },
  {
    id: 'sa-from-rru',
    title: 'SA from (RRU)^34 on T05',
    tests: ['05'],
    formulation: 'Start from the 102-move (RRU)^34 pattern. Run SA for 5 minutes at standard mutation weights.',
    result: '8,803 iterations, zero improvements.',
    lesson: 'The RRU family has a hard floor at 102. Getting to 101 requires a non-periodic sequence that SA\'s local-neighbourhood mutations cannot reach from (RRU)^34, the reference\'s 101-move sequence probably comes from a genetic algorithm or a hand design.',
    presetId: '05-rru',
  },
];
