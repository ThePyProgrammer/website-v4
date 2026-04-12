import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

type Heading = { level: 2 | 3; text: string; num: string; slug: string };
type SidebarBlock = { title: string; body: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_$\\{}()[\]]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractHeadings(content: string): Heading[] {
  const out: Heading[] = [];
  let h2 = 0, h3 = 0;
  const re = /^(#{2,3})\s+(.+)$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const level = m[1].length as 2 | 3;
    const text = m[2].trim();
    if (level === 2) { h2 += 1; h3 = 0; out.push({ level, text, num: String(h2).padStart(2, '0'), slug: slugify(text) }); }
    else { h3 += 1; out.push({ level, text, num: `${String(h2).padStart(2, '0')}.${h3}`, slug: slugify(text) }); }
  }
  return out;
}

// Remove ```sidebar title="..."``` fences from rendered article content.
// They are rendered in the sidebar instead of inline.
export function stripSidebarFences(content: string): string {
  return content.replace(/```sidebar(?:\s+title=["'][^"']+["'])?\s*\n[\s\S]*?```\s*/g, '');
}

// Parse sidebar blocks from the article content.
// Syntax:  ```sidebar title="symbols"
//          ...markdown body...
//          ```
export function extractSidebarBlocks(content: string): SidebarBlock[] {
  const blocks: SidebarBlock[] = [];
  const re = /```sidebar(?:\s+title=["']([^"']+)["'])?\s*\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    blocks.push({ title: (m[1] ?? '').trim(), body: m[2].trim() });
  }
  return blocks;
}

export function ArticleSidebar({ content }: { content: string }) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const blocks = useMemo(() => extractSidebarBlocks(content), [content]);
  const [visible, setVisible] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Scroll-based spy. We treat a heading as "in frame" when its element's
    // rect sits in the visible viewport area (below the 64px fixed header).
    const HEADER_OFFSET = 80;
    let rafId: number | null = null;

    const compute = () => {
      rafId = null;
      const next = new Set<string>();
      const vpBottom = window.innerHeight;
      for (const h of headings) {
        const el = document.getElementById(h.slug);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > HEADER_OFFSET && rect.top < vpBottom) {
          next.add(h.slug);
        }
      }
      setVisible(prev => {
        if (prev.size === next.size && [...prev].every(s => next.has(s))) return prev;
        return next;
      });
    };

    const schedule = () => {
      if (rafId == null) rafId = requestAnimationFrame(compute);
    };

    // Retry initial compute a few times in case headings haven't mounted yet.
    let tries = 0;
    const initialRun = () => {
      compute();
      tries += 1;
      if (visible.size === 0 && tries < 20) {
        setTimeout(initialRun, 100);
      }
    };
    initialRun();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headings]);

  return (
    <aside className="hidden xl:block w-60 shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto text-xs font-headline pr-2">
      <div className="border-l border-[#48474a]/40 pl-4">
        <div className="font-headline text-[10px] text-[#00d4fd]/70 uppercase tracking-widest mb-3">
          contents
        </div>
        <nav>
          <ul className="space-y-1.5">
            {headings.map(h => {
              const inFrame = visible.has(h.slug);
              const base = h.level === 3 ? 'text-[11px]' : '';
              const activeColor = h.level === 2 ? 'text-[#f9f5f8]' : 'text-[#f9f5f8]/90';
              const idleColor = h.level === 2 ? 'text-[#f9f5f8]/50' : 'text-[#adaaad]/50';
              return (
                <li key={h.slug} className={h.level === 3 ? 'pl-4' : ''}>
                  <a
                    href={`#${h.slug}`}
                    className={`block transition-all hover:text-[#00d4fd] hover:font-bold ${base} ${
                      inFrame ? `font-bold ${activeColor}` : idleColor
                    }`}
                  >
                    <span className="text-[#00d4fd]/60 tabular-nums mr-2 text-[10px] font-normal">{h.num}</span>
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {blocks.map((b, i) => (
        <div key={i} className="border-l border-[#48474a]/40 pl-4 mt-8 sidebar-block">
          {b.title && (
            <div className="font-headline text-[10px] text-[#ff7351]/70 uppercase tracking-widest mb-3">
              {b.title}
            </div>
          )}
          <div className="text-[11px] text-[#f9f5f8]/80 leading-snug space-y-2">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                table: ({ children }) => (
                  <table className="w-full border-collapse">{children}</table>
                ),
                thead: () => null,
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => <tr className="align-baseline">{children}</tr>,
                td: ({ children }) => (
                  <td className="py-0.5 pr-2 first:text-[#00d4fd] first:text-right first:whitespace-nowrap last:text-[#f9f5f8]/75">
                    {children}
                  </td>
                ),
                p: ({ children }) => <p className="m-0">{children}</p>,
                a: ({ href, children }) => (
                  <a href={href} className="text-[#00d4fd] hover:underline" target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="bg-[#262528] px-1 text-[#00d2fd] text-[10px]">{children}</code>
                ),
                ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
                li: ({ children }) => <li>{children}</li>,
              }}
            >
              {b.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </aside>
  );
}
