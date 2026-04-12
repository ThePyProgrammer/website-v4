import { createHighlighter, type Highlighter } from 'shiki';

const LANGS = ['bash', 'json', 'python', 'rust', 'tsx', 'typescript', 'javascript', 'diff'] as const;
const THEME = 'github-dark';

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}

export function normalizeLang(lang: string): string {
  if (lang === 'py') return 'python';
  if (lang === 'ts') return 'typescript';
  if (lang === 'js') return 'javascript';
  if ((LANGS as readonly string[]).includes(lang)) return lang;
  return 'text';
}

export { THEME };
