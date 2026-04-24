import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type CalloutKind = 'info' | 'note' | 'warning' | 'success' | 'danger' | 'tip';

type Variant = {
  label: string;
  accent: string;
  chromeBg: string;
  chromeBorder: string;
  bodyBorder: string;
  dotA: string;
  dotB: string;
  dotC: string;
};

const VARIANTS: Record<CalloutKind, Variant> = {
  info: {
    label: 'INFO',
    accent: '#00d4fd',
    chromeBg: 'rgba(0, 212, 253, 0.08)',
    chromeBorder: 'rgba(0, 212, 253, 0.2)',
    bodyBorder: 'rgba(0, 212, 253, 0.25)',
    dotA: 'rgba(0, 212, 253, 0.6)',
    dotB: 'rgba(0, 212, 253, 0.4)',
    dotC: 'rgba(0, 212, 253, 0.2)',
  },
  note: {
    label: 'NOTE',
    accent: '#adaaad',
    chromeBg: 'rgba(173, 170, 173, 0.08)',
    chromeBorder: 'rgba(173, 170, 173, 0.2)',
    bodyBorder: 'rgba(173, 170, 173, 0.25)',
    dotA: 'rgba(173, 170, 173, 0.6)',
    dotB: 'rgba(173, 170, 173, 0.4)',
    dotC: 'rgba(173, 170, 173, 0.2)',
  },
  warning: {
    label: 'WARNING',
    accent: '#ffd93d',
    chromeBg: 'rgba(255, 217, 61, 0.08)',
    chromeBorder: 'rgba(255, 217, 61, 0.2)',
    bodyBorder: 'rgba(255, 217, 61, 0.25)',
    dotA: 'rgba(255, 217, 61, 0.6)',
    dotB: 'rgba(255, 217, 61, 0.4)',
    dotC: 'rgba(255, 217, 61, 0.2)',
  },
  success: {
    label: 'SUCCESS',
    accent: '#4ade80',
    chromeBg: 'rgba(74, 222, 128, 0.08)',
    chromeBorder: 'rgba(74, 222, 128, 0.2)',
    bodyBorder: 'rgba(74, 222, 128, 0.25)',
    dotA: 'rgba(74, 222, 128, 0.6)',
    dotB: 'rgba(74, 222, 128, 0.4)',
    dotC: 'rgba(74, 222, 128, 0.2)',
  },
  danger: {
    label: 'DANGER',
    accent: '#ff7351',
    chromeBg: 'rgba(255, 115, 81, 0.08)',
    chromeBorder: 'rgba(255, 115, 81, 0.2)',
    bodyBorder: 'rgba(255, 115, 81, 0.25)',
    dotA: 'rgba(255, 115, 81, 0.6)',
    dotB: 'rgba(255, 115, 81, 0.4)',
    dotC: 'rgba(255, 115, 81, 0.2)',
  },
  tip: {
    label: 'TIP',
    accent: '#a78bfa',
    chromeBg: 'rgba(167, 139, 250, 0.08)',
    chromeBorder: 'rgba(167, 139, 250, 0.2)',
    bodyBorder: 'rgba(167, 139, 250, 0.25)',
    dotA: 'rgba(167, 139, 250, 0.6)',
    dotB: 'rgba(167, 139, 250, 0.4)',
    dotC: 'rgba(167, 139, 250, 0.2)',
  },
};

export function Callout({ kind, title, children }: { kind: CalloutKind; title?: string; children: string }) {
  const v = VARIANTS[kind];
  const label = (title ?? v.label).toUpperCase();

  return (
    <div
      className="my-8 overflow-hidden bg-black border"
      style={{ borderColor: v.bodyBorder }}
    >
      <div
        className="px-6 py-2 flex items-center gap-4"
        style={{ backgroundColor: v.chromeBg, borderBottom: `1px solid ${v.chromeBorder}` }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5" style={{ backgroundColor: v.dotA }} />
          <div className="w-2.5 h-2.5" style={{ backgroundColor: v.dotB }} />
          <div className="w-2.5 h-2.5" style={{ backgroundColor: v.dotC }} />
        </div>
        <span
          className="font-headline text-[10px] tracking-widest uppercase"
          style={{ color: v.accent }}
        >
          // {label}
        </span>
      </div>
      <div className="p-6 text-[#f9f5f8]/90 text-base leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
            strong: ({ children }) => (
              <strong className="font-medium" style={{ color: v.accent }}>
                {children}
              </strong>
            ),
            em: ({ children }) => <em className="text-[#f9f5f8]">{children}</em>,
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 transition-colors hover:opacity-80"
                style={{ color: v.accent, textDecorationColor: `${v.accent}55` }}
              >
                {children}
              </a>
            ),
            code: ({ children }) => (
              <code
                className="bg-[#262528] px-1.5 py-0.5 font-mono text-sm"
                style={{ color: v.accent }}
              >
                {children}
              </code>
            ),
            ul: ({ children }) => (
              <ul className="space-y-2 list-none pl-0 mb-3 last:mb-0">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-2 list-decimal pl-5 mb-3 last:mb-0">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-3 leading-relaxed">
                <span className="font-headline shrink-0" style={{ color: v.accent }}>
                  &gt;&gt;
                </span>
                <span>{children}</span>
              </li>
            ),
          }}
        >
          {children}
        </ReactMarkdown>
      </div>
    </div>
  );
}
