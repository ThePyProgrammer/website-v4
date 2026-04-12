import { useState } from 'react';

export function TerminalBlock({ children, filename, rawCode }: { children: React.ReactNode; filename?: string; rawCode?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = rawCode ?? (
      (children as any)?.props?.children ? String((children as any).props.children) : ''
    );
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 overflow-hidden bg-black">
      <div className="bg-[#262528] px-6 py-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-[#ff7351]/40" />
            <div className="w-2.5 h-2.5 bg-[#00d4fd]/40" />
            <div className="w-2.5 h-2.5 bg-[#00d2fd]/40" />
          </div>
          {filename && (
            <span className="font-headline text-[10px] text-[#00d4fd]/60 tracking-widest uppercase">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-[10px] font-headline text-[#00d4fd]/40 hover:text-[#00d4fd] transition-colors uppercase tracking-widest"
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto code-scanline">
        {children}
      </div>
    </div>
  );
}
