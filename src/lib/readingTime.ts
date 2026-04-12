// Estimate reading time for a markdown blog post.
// Accounts for prose, code blocks, and interactive fence components.

const WORDS_PER_MINUTE_PROSE = 220;
const WORDS_PER_MINUTE_CODE = 100;

// Time to engage with each interactive fence, in seconds.
// Tuned for "average engaged reader" behaviour.
const FENCE_SECONDS: Record<string, number> = {
  'test-gallery': 45,
  'agent-gallery': 45,
  'contribution-grid': 30,
  'failure-gallery': 90,
  'grid-simulator': 40,
  'mutation-donut': 10,
  chart: 15,
  sidebar: 0, // rendered separately, doesn't block reading flow
};

function countWords(s: string): number {
  return s.split(/\s+/).filter(Boolean).length;
}

export function estimateReadingTime(content: string): string {
  let prose = content;
  let codeWords = 0;
  let interactiveSeconds = 0;

  // Extract and remove fenced blocks; tally by language.
  prose = prose.replace(/```(\w[\w-]*)?([^\n]*)\n([\s\S]*?)```/g, (_full, lang, _attrs, body) => {
    const tag = (lang ?? '').toLowerCase();
    if (FENCE_SECONDS[tag] !== undefined) {
      interactiveSeconds += FENCE_SECONDS[tag];
    } else if (tag) {
      // Actual code block (language-tagged): counts at code reading speed.
      codeWords += countWords(body);
    } else {
      // Language-less fence: output/log/pseudocode, count as code too.
      codeWords += countWords(body);
    }
    return '';
  });

  // Strip inline code and math for a clean prose word count.
  prose = prose.replace(/`[^`\n]+`/g, ' ');
  prose = prose.replace(/\$\$[\s\S]*?\$\$/g, ' ');
  prose = prose.replace(/\$[^$\n]+\$/g, ' ');
  // Strip markdown syntax chars so they don't inflate the count.
  prose = prose.replace(/[#>*_[\]()!|\-]/g, ' ');

  const proseWords = countWords(prose);
  const proseMinutes = proseWords / WORDS_PER_MINUTE_PROSE;
  const codeMinutes = codeWords / WORDS_PER_MINUTE_CODE;
  const interactiveMinutes = interactiveSeconds / 60;

  const total = proseMinutes + codeMinutes + interactiveMinutes;
  const rounded = Math.max(1, Math.round(total));
  return `${rounded} min`;
}
