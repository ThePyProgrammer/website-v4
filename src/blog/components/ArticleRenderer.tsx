import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { TerminalBlock } from './TerminalBlock';

function extractHeadings(content: string): string[] {
  return [...content.matchAll(/^#{2,3}\s+(.+)$/gm)].map(m => m[1]);
}

function getHeadingNumber(headings: string[], text: string): string {
  const idx = headings.indexOf(text);
  return String((idx === -1 ? 0 : idx) + 1).padStart(2, '0');
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

// Preprocess: strip title="..." from code fences so react-markdown parses them normally
function preprocessContent(content: string): string {
  return content.replace(/(```\w+)\s+title=["'][^"']+["']/g, '$1');
}

export function ArticleRenderer({ content }: { content: string }) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const codeTitles = useMemo(() => extractCodeTitles(content), [content]);
  const processed = useMemo(() => preprocessContent(content), [content]);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h2: ({ children }) => {
          const num = getHeadingNumber(headings, childrenToText(children));
          return (
            <h2 className="font-headline text-3xl font-bold text-[#f9f5f8] pb-2 flex items-center gap-3 mt-16 mb-6">
              <span className="text-[#00d4fd] text-xl">{num}_</span> {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const num = getHeadingNumber(headings, childrenToText(children));
          return (
            <h3 className="font-headline text-2xl font-bold text-[#f9f5f8] flex items-center gap-3 mt-12 mb-4">
              <span className="text-[#00d4fd] text-lg">{num}_</span> {children}
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
          <li className="flex items-start gap-4">
            <span className="text-[#00d4fd] font-headline mt-1">&gt;&gt;</span>
            <span>{children}</span>
          </li>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes('language-');
          if (isBlock) {
            const lang = className?.replace('language-', '') ?? '';
            const codeText = childrenToText(children).trim().slice(0, 100);
            const filename = codeTitles.get(codeText) ?? `snippet.${lang}`;
            return (
              <TerminalBlock filename={filename}>
                <pre className="text-[#f9f5f8]/80">{children}</pre>
              </TerminalBlock>
            );
          }
          return <code className="bg-[#262528] px-1.5 py-0.5 text-[#00d2fd] font-mono text-sm">{children}</code>;
        },
        pre: ({ children }) => <>{children}</>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#00d4fd]/30 pl-6 italic text-[#adaaad] my-6">
            {children}
          </blockquote>
        ),
      }}
    >
      {processed}
    </ReactMarkdown>
  );
}
