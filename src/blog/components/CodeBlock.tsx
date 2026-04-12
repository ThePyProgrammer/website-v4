import { useEffect, useState } from 'react';
import { TerminalBlock } from './TerminalBlock';
import { getHighlighter, normalizeLang, THEME } from './shikiHighlighter';

export function CodeBlock({ code, lang, filename }: { code: string; lang: string; filename: string }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then(h => {
      if (cancelled) return;
      const resolved = normalizeLang(lang);
      setHtml(h.codeToHtml(code, { lang: resolved, theme: THEME }));
    });
    return () => { cancelled = true; };
  }, [code, lang]);

  return (
    <TerminalBlock filename={filename} rawCode={code}>
      {html ? (
        <div className="shiki-wrapper" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="text-[#f9f5f8]/80">{code}</pre>
      )}
    </TerminalBlock>
  );
}
