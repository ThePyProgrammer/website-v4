import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import { CodeBlock } from './CodeBlock';
import { TerminalBlock } from './TerminalBlock';
import { ProgressChart } from './ProgressChart';
import { MutationDonut } from './MutationDonut';
import { TestGallery } from './TestGallery';
import { GridSimulator } from './GridSimulator';
import { TestRef } from './TestRef';
import { AgentGallery } from './AgentGallery';
import { ContributionGrid } from './ContributionGrid';
import { FailureGallery } from './FailureGallery';
import { DatasetProfile } from './DatasetProfile';
import { ResultsLadder } from './ResultsLadder';
import { PersonRef } from './PersonRef';
import { LabramAttempts } from './LabramAttempts';
import { ModelComparison } from './ModelComparison';
import { TrainingRun } from './TrainingRun';
import { MusePlacement } from './MusePlacement';

// Build a map from heading text -> display number.
// h2 headings get "01", "02", ...
// h3 headings get "<parent h2>.1", "<parent h2>.2", ... reset under each new h2.
function buildHeadingNumbers(content: string): Map<string, string> {
  const map = new Map<string, string>();
  let h2Count = 0;
  let h3Count = 0;
  const re = /^(#{2,3})\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const level = m[1].length;
    const text = m[2].trim();
    if (level === 2) {
      h2Count += 1;
      h3Count = 0;
      map.set(text, String(h2Count).padStart(2, '0'));
    } else {
      h3Count += 1;
      const h2Label = String(h2Count).padStart(2, '0');
      map.set(text, `${h2Label}.${h3Count}`);
    }
  }
  return map;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_$\\{}()[\]]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function childrenToText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(childrenToText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return childrenToText((children as any).props.children);
  }
  return String(children ?? '');
}

// Extract code block titles from markdown: ```lang title="filename"
// Returns a map of code content hash -> title
function extractCodeTitles(content: string): Map<string, string> {
  const titles = new Map<string, string>();
  const regex = /```\w+\s+title=["']([^"']+)["']\s*\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    // Use first 100 chars of code as key
    const key = match[2].trim().slice(0, 100);
    titles.set(key, match[1]);
  }
  return titles;
}

// Preprocess: strip title="..." from code fences so react-markdown parses them normally,
// and remove ```sidebar``` blocks entirely since those belong in the sidebar.
function preprocessContent(content: string): string {
  return content
    .replace(/```sidebar(?:\s+title=["'][^"']+["'])?\s*\n[\s\S]*?```\s*/g, '')
    .replace(/(```\w+)\s+title=["'][^"']+["']/g, '$1');
}

export function ArticleRenderer({ content }: { content: string }) {
  const headingNumbers = useMemo(() => buildHeadingNumbers(content), [content]);
  const codeTitles = useMemo(() => extractCodeTitles(content), [content]);
  const processed = useMemo(() => preprocessContent(content), [content]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={{
        h2: ({ children }) => {
          const text = childrenToText(children);
          const num = headingNumbers.get(text) ?? '';
          return (
            <h2 id={slugify(text)} className="scroll-mt-20 font-headline text-3xl font-bold text-[#f9f5f8] pb-2 flex items-baseline gap-3 mt-16 mb-6">
              <span className="text-[#00d4fd] text-xl shrink-0">{num}_</span> <span>{children}</span>
            </h2>
          );
        },
        h3: ({ children }) => {
          const text = childrenToText(children);
          const num = headingNumbers.get(text) ?? '';
          return (
            <h3 id={slugify(text)} className="scroll-mt-20 font-headline text-2xl font-bold text-[#f9f5f8] flex items-baseline gap-3 mt-12 mb-4">
              <span className="text-[#00d4fd] text-lg shrink-0">{num}_</span> <span>{children}</span>
            </h3>
          );
        },
        p: ({ children }) => (
          <p className="text-[#f9f5f8]/90 leading-relaxed mb-6 text-base">{children}</p>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noreferrer" className="text-[#00d2fd] hover:text-[#00d4fd] underline decoration-[#00d2fd]/30 underline-offset-4 transition-colors">
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="text-[#00d4fd] font-medium">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="space-y-4 list-none pl-0 mb-6">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-4 leading-relaxed text-[#f9f5f8]/90 text-base">
            <span className="text-[#00d4fd] font-headline leading-relaxed shrink-0">&gt;&gt;</span>
            <span>{children}</span>
          </li>
        ),
        code: ({ className, children }) => {
          // Inline code only; block code is handled by the `pre` renderer below.
          if (className?.includes('language-')) return <>{children}</>;
          const text = childrenToText(children);
          const refMatch = /^T(\d{1,2})$/.exec(text);
          if (refMatch) return <TestRef id={refMatch[1].padStart(2, '0')} />;
          const personMatch = /^@(\w+)$/.exec(text);
          if (personMatch) return <PersonRef id={personMatch[1]} />;
          return <code className="bg-[#262528] px-1.5 py-0.5 text-[#00d2fd] font-mono text-sm">{children}</code>;
        },
        pre: ({ children }) => {
          const codeEl = Array.isArray(children) ? children[0] : children;
          const codeProps = (codeEl as any)?.props ?? {};
          const className: string = codeProps.className ?? '';
          const codeText = childrenToText(codeProps.children).replace(/\n$/, '');
          const langMatch = /language-([\w-]+)/.exec(className);
          if (langMatch) {
            const lang = langMatch[1];
            if (lang === 'chart') {
              const title = codeTitles.get(codeText.trim().slice(0, 100));
              return <ProgressChart source={codeText} title={title} />;
            }
            if (lang === 'mutation-donut') return <MutationDonut />;
            if (lang === 'test-gallery') return <TestGallery />;
            if (lang === 'agent-gallery') return <AgentGallery />;
            if (lang === 'contribution-grid') return <ContributionGrid />;
            if (lang === 'failure-gallery') return <FailureGallery />;
            if (lang === 'labram-attempts') return <LabramAttempts />;
            if (lang === 'model-comparison') return <ModelComparison />;
            if (lang === 'training-run') return <TrainingRun />;
            if (lang === 'muse-placement') return <MusePlacement />;
            if (lang === 'dataset-profile') return <DatasetProfile />;
            if (lang === 'results-ladder') return <ResultsLadder />;
            if (lang === 'grid-simulator') {
              const body = codeText.trim();
              const tokens = body.split(/\s+/).filter(t => t && t.toLowerCase() !== 'explore');
              let preset: string | undefined;
              if (tokens[0]) {
                const t = tokens[0];
                preset = /^T\d{1,2}$/i.test(t) ? t.slice(1).padStart(2, '0') : t;
              }
              const locked = !!preset && !/\bexplore\b/i.test(body);
              return <GridSimulator initialPreset={preset} locked={locked} />;
            }
            const filename = codeTitles.get(codeText.trim().slice(0, 100)) ?? `snippet.${lang}`;
            return <CodeBlock code={codeText} lang={lang} filename={filename} />;
          }
          return (
            <TerminalBlock filename="output" rawCode={codeText}>
              <pre className="text-[#f9f5f8]/80 whitespace-pre">{codeText}</pre>
            </TerminalBlock>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#00d4fd]/30 pl-6 italic text-[#adaaad] my-6">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto border border-[#48474a]/30">
            <table className="w-full border-collapse font-mono text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#262528] border-b border-[#00d4fd]/30">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left font-headline text-[11px] uppercase tracking-widest text-[#00d4fd]">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 border-t border-[#48474a]/20 text-[#f9f5f8]/85 align-top">{children}</td>
        ),
      }}
    >
      {processed}
    </ReactMarkdown>
  );
}
