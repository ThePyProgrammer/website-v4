---
title: "Lost Cursor: Hunting Short Synchronising Words in Grid DFAs with Five Claude Code Agents in 4 Hours"
date: "2026-04-11"
tags: [optimization, research]
category: optimization
excerpt: "A step-by-step post-mortem of solving MCC 2026 Problem B ("Lost Cursor") with a fleet of AI agents."
coverImage: "/img/blog/lost-cursor/05.png"
splash: true
readingTime: "10 min"
---


```sidebar title="symbols"
| sym | meaning |
|---|---|
| $n$ | grid side length ($495 \leq n \leq 500$) |
| $Q$ | the $n^2$ pixels (DFA states) |
| $\{U, D, L, R\}$ | move alphabet |
| $\delta_a$ | wall-clamped translation for move $a$ |
| $B$ | absorbing set (the black pixels) |
| $w$ | a move sequence; $\lvert w \rvert$ is its length |
| $d_{\max}$ | max distance from any white pixel to nearest black |
```

I spent Midnight Code Cup 2026 with six Claude Code sessions open and
a hard problem on screen. This is the story of how they solved it, how
I solved it, and how we landed 49 moves short of the top score anyway.

## So, what is Problem B?

The organisers called it "Lost Cursor". We're given an $n \times n$
grid of black and white pixels ($495 \leq n \leq 500$) and a cursor
sitting on some unknown white pixel. We have to hand in a sequence
over `{U, D, L, R}` of at most 5,000 moves. Walls clamp, so any move
that would leave the grid keeps the cursor in place. The sequence
provided must, regardless of which white pixel the cursor started on,
ensure the cursor will land on a black pixel at some prefix of this
sequence.

The goal is to reduce this sequence's length, and scoring is
quadratic in the ratio of our sequence length to the best:
$100 \cdot (\text{best}/\text{ours})^2$ per test. Half as long is four
times the score...

According to Agent A's deep research (I definitely wouldn't know 
myself), this is a shortest-synchronising-word problem on a grid DFA,
where the "states" are the $n^2$ pixels, the  "alphabet" is 
$\{U, D, L, R\}$, the "transitions" are wall-clamped translations
across the image, and the "absorbing set" is the black pixels. We 
want the shortest word that drives every non-absorbing state into
the absorbing set.

Knowing what the problem *is* doesn't tell you how to solve it,
though, and Agent A was careful to spell out why. The general
shortest-synchronising-word problem is NP-complete (Eppstein, 1990),
and also *inapproximable within any fixed constant factor*
(Gawrychowski–Straszak, MFCS 2015). Černý's conjecture, that every
$n$-state synchronising DFA has a word of length $\leq (n-1)^2$, has
been open for sixty years. The best unconditional upper bound is
cubic: about $0.1654\,n^3$ (Shitov, 2019). For our $n^2 \approx 2.5
\times 10^5$ states, that bound is around $10^{16}$. Exact methods
are not in scope. Agent D would later run a more thorough literature
dispatch and confirm nothing changes this story.

So I wasn't going to find the optimum. I was going to do approximate
search, ideally on top of a few problem-specific structural insights.
And I had four hours.

### The two things that make these words short

Before writing any code, Agents A and B both wrote down the only two
mechanisms that actually collapse cursors in this problem:

1. **Wall clamping.** Every letter is idempotent on one side: $\delta_L$
   does nothing on the leftmost column, and so on. Once cursors pile
   against a wall, they stay piled.

2. **Absorption.** Any cursor that lands on a black pixel is gone.


Dense-black tests mostly collapse via absorption. Sparse-black tests
mostly collapse via wall clamping, but only after the cursors have
travelled far enough to hit walls. This is why `T03` (0.1% black, 195
black pixels in 250,000) ended up needing our longest sequence by
nearly a factor of five.

## Meet the eight tests

The first ten minutes of the tournament was spent looking at the eight
images and asking, for each one, which structural move the cursor-cloud
was going to need. They're startlingly different. Click through for 
density, $d_{\max}$, final score, reference score, and algorithm 
attribution:

```test-gallery
```

Looking at these images, it's pretty clear that no single algorithm
was going to dominate. Like seriously, some of these testcases (e.g.
`T02`) have no pattern, `T03` is so sparsely placed that finding the
black spots was going to quite hard, and `T05` was just difficult.

Instead, we just needed to expand the search space, and that meant
needing to run a lot more tests fast. The first few tests were really
slow, and it's easy to see why: the naive representation tracked each
pixel's cursor individually. That meant up to a quarter of a million
cursors each carrying $(\text{row}, \text{col})$ were being tracked
as they shifted in lockstep. Do the math:
$5{,}000 \text{ moves} \times 250{,}000 \text{cursors}$ is bad news.

### The simulation trick

The key trick, as Agent B eventually discovered, was that cursors at
the same position are indistinguishable forever. Once two cursors
collide, they evolved identically. Hence, instead of blindly tracking
coordinates, we tracked a single boolean grid `alive[r, c]` meaning
*"is any surviving cursor at this position?"*, and update it with one
`numpy` shift-and-mask per move:

```py title="apply_move.py"
def apply_move(alive, black, move):
    shifted = np.zeros_like(alive)
    if move == 'R':
        shifted[:, 1:]  = alive[:, :-1]
        shifted[:, -1] |= alive[:, -1]    # wall clamp
    elif move == 'L':
        shifted[:, :-1] = alive[:, 1:]
        shifted[:, 0]  |= alive[:, 0]
    elif move == 'D':
        shifted[1:, :]  = alive[:-1, :]
        shifted[-1, :] |= alive[-1, :]
    elif move == 'U':
        shifted[:-1, :] = alive[1:, :]
        shifted[0, :]  |= alive[0, :]
    return shifted & ~black               # absorb on black
```

One shift, one mask, done. A 5,000-step simulation runs in about 0.2
seconds.

The funny part is that two different agents (A and B) independently
wrote this simulator before seeing each other's code, which earned
us a free cross-check: the two implementations disagreed on one edge
case (border clamping on the zero-row), with the bug being in the
first one. But of course, it's a coordination failure.

Later in the project, one of the agents noticed that long tails have
very few alive cursors, fewer than 2,000 out of 250,000. For those
tails, it switched to a coordinate-list representation and skipped the
500×500 boolean ops entirely. The per-step speedup was around
$100\times$, which is what eventually made hours-long SA runs
pretty fast on the polish stage.

### One JSON file, five agents

In order to ensure a coordination pattern across the five parallel
agents, I decided to build a single shared JSON file.

```json title="best/best.json"
{
  "01": {"moves": 405, "algo": "improved"},
  "02": {"moves": 213, "algo": "iterative_reopt"},
  "03": {"moves": 1222, "algo": "improved"},
  "04": {"moves": 396, "algo": "mega_del"},
  ...
}
```

Every solver, whether it was agent-written code, subagent-dispatched
code, or a background polish script, called an `update_best()` wrapper
that writes to `best/best.json` **only if the candidate sequence is
strictly shorter**. Whoever writes last with the shortest value wins.
No message-passing. No leader election. No RPC. Just "overwrite if
better". Since that's really all that matters.

## What we actually tried

This is sorted loosely in order of discovery, starting with the more
"embarrassing" ones.

### Push to wall, then navigate

This was the first thing Agent A wrote:

$$
\underbrace{L^{\,n-1}}_{\text{push left}} \;\cdot\; \underbrace{U^{\,n-1}}_{\text{push up}} \;\cdot\; \underbrace{\text{BFS}(\text{nearest black})}_{\text{navigate}}
$$

Essentially collapse every cursor to the top-left corner, then
BFS to the nearest black pixel.

This is the simplest solution and solved all 8 tests with 8,583
moves in total. This was the _floor_, we could only do better
than this.

Notably, this test failed when the black pixels are far from the
corner (`T01`, `T03`, `T06`), because then the BFS step eats the
budget. `T03` is the dramatic case: the cursor has to crawl all the
way to the 195-pixel central blob. Here's the baseline output on
`T03`: 1480 moves of corner-push plus naive navigation.

```grid-simulator
03-baseline
```

### Greedy by kill count

The next approach was a "greedy" one: at each step, pick the move
that kills the most cursors. This approach was great on
dense-absorption tests like `T02`, `T05`, `T07` and `T08`, but
it stalled on tests where no single move kills anything (`T01`, 
`T03`, `T04` and `T06`), which is what the agent called the
*hard tail*. When the greedy approach stalls, we need either
lookahead or a ranking secondary to the kill count.

### Distance-potential greedy

Agent A came up with an interesting secondary ranking using 
`scipy.ndimage.distance_transform_edt`: when two moves killed equally,
pick the one that shortens the *average distance-to-nearest-black*.
It also designed a few extra things:

- Treating partial wall pushes (25%, 50%, 75% of `n`) as prefixes
- A max-distance greedy approach that focuses on the worst-off cursor
- An alternating-axis greedy approach to escape oscillation
- Suffix re-solve at checkpoints

From here, Agent A built a multi-start best-of over all variants,
and identified the best algorithm on `T01` and `T03` at the time.

### Simulated annealing

Agent A then proposed a classical simulated annealing approach
over valid sequences with the following ten mutation operators:

```mutation-donut
```

Notably, a mutation at position `p` only re-simulated from the nearest
checkpoint before `p`, which is the idea that make SA doable at all on
1,000-move sequences. It's also, as it turned out, where the bug lived.

### Suffix reoptimisation (LNS, it turns out)

From here, Agent D stepped in to propose a new improvement: "suffix
reoptimization". This approach posited the following: most of the work
in a greedy sequence actually happens in the first ~17% of moves (which
is where 99% of cursors actually die). The last 83% is the greedy solver
essentially crawling through the hard tail, killing one cursor at a time
and making locally short-sighted choices.

Suffix reoptimization posits that we should keep the good prefix of the
current best sequence, but get rid of the bad tail, re-solving it with a 
smarter solver. At specific checkpoints (e.g. move 140), it grabs the 
alive set at that point and try resolving the suffix using another solver
(e.g. greedy, greedy+beam, depth-4 lookahead). From there, just choose the
shortest tail found, and glue it to the original prefix.

Suffix reoptimization tried this at various checkpoints (90, 140, 180, etc.)
and with various different solvers in order to find the shortest possible
combination.

```
current best (test 08): 261 moves
  reopt at cp=140 with beam-200:  saved 15 moves → 245
  reopt at cp=90  with greedy-tail: saved 1 move → 244
  reopt at cp=180 with greedy-tail: saved 3 moves → 241
```
Here's the final 242-move sequence for `T08`. Nineteen of those saved
moves came from that beam-200 reopt at checkpoint 140:

```grid-simulator
T08
```

The funny part is, Agent D thought this "suffix reoptimization" approach
was novel. Turns out, it isn't. It's just a standard **large-neighbourhood
search** (Pisinger & Ropke, 2010) with a single neighbourhood.

But it's still a useful technique, so let's give credit where credit is due.

### Beam search with hash deduplication

The next approach was a standard beam search on the alive state, with
identical alive sets deduplicated via `hash(alive.tobytes())`, so beam
entries are *distinct alive sets* rather than *distinct paths*. The 
effective width pretty much goes up by about $10\times$. We use this
mainly as a tail solver inside the suffix reoptimization loop, and for
short-sequence instances like `T07` (at 26 moves, beam-width of 300
at depth 30 is still possible).


### Structural pattern enumeration

For `T05` (the rainy cityscape), Agent D wrote an exhaustive scan over
repeating `(R^r, U^u)` blocks with $r \in [1, 40]$ and $u \in [1,
10]$. The best one was:

$$
(RRU)^{34} = 102 \text{ moves}
$$

This approach brought us down from the pipeline's previous best of 189.
The whole scan is 400 patterns, which took about a minute.

```grid-simulator
05-rru
```

**Why does it work?** `T05` has a dense cloud band at the top, a dense
ground band at the bottom, and sparse rain in the middle. The `(R, R,
U)` cycle sweeps +2 right, +1 up per period, threading both bands and
the rain simultaneously. We checked that it's optimal *within the RRU
family* by exhausting 8-move suffixes after 31 repetitions ($4^8
\approx 65{,}000$ combinations); none hit 101. The reference's 101 is
probably a non-periodic sequence, either from a genetic algorithm or a
hand design. We also spent five minutes of SA starting from
$(RRU)^{34}$ and got zero improvements, which tells me the 101 lives
far from the RRU family.

This is the one test where pure brute-force pattern search beat the
general-purpose pipeline. If I'd had more time, I'd have done the same
sweep on `T01`. The trophy has obvious reflective symmetry. Something
more specific than distance-potential greedy should exist for it.

## The really stupid bug

Now the good part.

The SA polisher used an incremental simulator for speed. It stored
checkpoints of the alive set every 12 to 50 moves. When you mutated a
move at position $p$, instead of re-simulating the whole sequence from
scratch (which takes $O(|w| \cdot n^2)$), you re-simulated only from
the nearest checkpoint before $p$.

Classic trick. Classic bug.

Deletions and insertions change the length of the sequence. After a
deletion at position $p$, every checkpoint at step $> p$ now refers to
the alive set of a *different sequence*. A later mutation at position
$q > p$ evaluated against that stale checkpoint gets a false-valid
answer. And gets accepted. And gets written to disk. And gets built on
top of. The error compounds silently.

Here's the symptom:

```
[seed 0] iter 1071 (44s) -> 410
[seed 0] 2794 iters in 120s, 4 improvements, best=410
seed 0: no improvement (len=410, valid=False)   # SA was gaslit
```

SA reports four improvements in the inner loop, and then the final
cross-check at the end says `valid=False`. The "improvements" were
phantom. Sequences that were only "better" because the evaluator was
lying.

**Every SA run before this fix was corrupt.** Every "zero
improvements" message on the existing polish passes had really meant
"several improvements that I couldn't actually keep". Hours of
wall-clock time effectively spent on a rigged benchmark.

Agent E caught it. The fix is fifteen lines. After any accepted
candidate, we re-run the full simulation from scratch before
committing a new best, and we defensively rebuild the checkpoint
array. Here's the diff between the buggy acceptance loop in
`algos/sa_polish.py` and Agent E's replacement in `mega_polish.py`:

```diff title="algos/sa_polish.py → mega_polish.py"
 # Inside the SA acceptance loop, after a candidate mutation...
 cp_idx = _nearest_checkpoint(checkpoints, i)
 alive_start = checkpoints[cp_idx]
 valid, _ = simulate_from(black, candidate, cp_idx, alive_start)

 if valid:
-    # BUG: checkpoints may be stale after prior deletions/insertions,
-    # so `valid` is often a false positive. Accept anyway.
-    seq = candidate
-    deletions += 1
-    # Rebuild checkpoints only every 20 accepts (too infrequent).
-    if deletions % 20 == 0:
-        checkpoints = rebuild_checkpoints(seq)
+    seq = candidate
+
+    # Only trust `valid` far enough to explore. Before we record a
+    # new best, re-run the FULL simulation from scratch. If the
+    # checkpoints were lying, alive.any() will still be true.
+    if len(seq) < best_len:
+        alive = (~black).copy()
+        for mv in seq:
+            alive = apply_move(alive, black, mv)
+            if not alive.any():
+                break
+        if not alive.any():           # truly_valid
+            best_seq = seq[:]
+            best_len = len(seq)
+            improvements += 1
+            # Rebuild checkpoints immediately after a verified win.
+            checkpoints = rebuild_checkpoints(seq)
```

Full re-verification costs about 100 ms and only runs on accepted
improvements, which are rare. The overhead is basically zero.

Here's what happened immediately after the fix, on `T04`, from a cold
start with the same seed distribution as before:

```
[seed 0] 407 → 406
[seed 1] 406 → 405 → 403 → 401 → 399
[seed 2] 399 → 397
[seed 4] 397 → 396
```

Six improvements in under five minutes, from an initial sequence that
hours of prior SA had bounced off. Those improvements were always
reachable. The optimiser just couldn't *see* them through the
checkpoint lies.

```grid-simulator
T04
```

The post-fix 396-move sequence on `T04` is four off the tournament's
top score of 392!
<!-- 
> **The generalisable lesson.** When an optimiser reports "I'm not
> finding improvements", or worse, "I found improvements but they
> don't validate", the first thing to check is not your
> hyperparameters, not your mutation weights, not your cooling
> schedule. It's *the evaluator*. The optimiser can only be as honest
> as the signal you feed it.

This was the single highest-leverage intervention of the whole
project, and it's a fifteen-line patch. -->

## Meet our agents

Each of our agents was a Claude Opus 4.6 instance within a Claude Code
harness, with tool access to the filesystem, shell, web search, and the
ability to dispatch *sub*agents for its own parallel work. Click through
any session for its entry/exit total, deliverables, and per-test
contributions:

```agent-gallery
```

No single agent dominated any test end-to-end. Every final sequence is
a relay through whichever tool was best for the *remaining gap* at
that point. Here is the contribution matrix, per agent per test:

```contribution-grid
```

Interestingly, **Agent E was effectively debugging Agent A's code.**
Through the shared filesystem, not through any direct agent-to-agent
communication.

## How the numbers came down

```chart title="total moves over time"
8583 push-to-wall baseline
5384 + adaptive hybrid
4542 D's entry snapshot
3078 D wave 1, research-backed algos
2873 D wave 2
2724 C mid-session / E entry
2709 A final
2665 C final (RRU + beam-tail)
! 2664 D+E final (reopt + bug fix)
ref 2615 tournament top score
```

69% reduction over four hours. About half of that came from `improved`
(the distance-potential multi-start), and about half from the cocktail
of LNS, SA, and one structural pattern. Note that the arc isn't a 
single agent's contribution. Agents C, D, and E ran on overlapping
branches and only merged toward the end.

## The dead ends

The failures are as informative as the wins. Each one ruled out a
class of approach, and a few of them left simulatable sequences you
can scrub through. Click any entry to see the formulation, the result,
and why it went nowhere:

```failure-gallery
```

## Run it yourself

I've open-sourced our current implementation at
[`ThePyProgrammer/mcc`](https://github.com/ThePyProgrammer/mcc).

You can reproduce the final `submission.zip` by running:

```bash title="reproduce.sh"
cd 2026/b
uv sync                    # pin environment from uv.lock
uv run pack.py             # rebuild submission.zip from best/
uv run scorer.py --all     # re-verify all 8 outputs
```

Expected output:

```
Test 01: OK  moves=405
Test 02: OK  moves=213
Test 03: OK  moves=1222
Test 04: OK  moves=396
Test 05: OK  moves=101
Test 06: OK  moves=59
Test 07: OK  moves=26
Test 08: OK  moves=242
Total moves: 2664
```

And if you want to watch any of the eight final sequences play back,
here's the whole submission in one interactive. Flip through all 8
tests and watch each cursor cloud collapse under its winning sequence:

```grid-simulator
T05 explore
```

<!-- ## Key takeaways

Five things.

1. **Spend the first few minutes on the simulator.** The numpy
   boolean-array representation is what made iterative development
   feasible. Without it, one SA iteration costs seconds instead of
   milliseconds, and the rest of the pipeline never happens.

2. **Atomic shared state beats a coordination protocol.** Five agents
   all writing to the same JSON file with a strictly-shorter-wins
   update rule. No message-passing. No deadlocks. Coherent submission.

3. **Greedy for bulk, LNS for tail.** Every instance we touched: 90 to
   99% of cursors die in the first 17% of moves. The rest is a long,
   slow tail. Replacing the tail with a wider search is the consistent
   win.

4. **Structural analysis beats brute force on structured inputs.**
   `T05` went 189 → 102 in 60 seconds of pattern enumeration. No
   amount of SA would have found it.

5. **When the optimiser reports progress but the verifier doesn't
   agree, the verifier is the one lying.** The checkpoint bug was the
   highest-leverage single change in the entire project. Check your
   evaluator first. -->

## Credits

Thanks to the [Midnight Code Cup 2026](https://codeforces.com) organisers
and [Recraft](https://www.recraft.ai/) for Problem B and keeping the weekend
interesting. And thanks to Jiang Pang and Yu Pin for roping me into this 
tournament!

Back to work, I guess.
