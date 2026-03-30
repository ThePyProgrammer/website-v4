export function TableOfContents({ content }: { content: string }) {
  const headings = [...content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m, i) => ({
    label: m[1],
    num: String(i + 1).padStart(2, '0'),
  }));

  if (headings.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="font-headline text-[10px] font-bold text-[#00d4fd]/30 uppercase mb-4 tracking-tighter">
        ARTICLE_MAP
      </h3>
      <ul className="space-y-4">
        {headings.map((h, i) => (
          <li
            key={i}
            className="border-l border-[#00d4fd]/20 pl-4 py-1 text-[#00d4fd]/60 hover:text-[#00d4fd] transition-colors cursor-pointer font-headline text-xs"
          >
            {h.num}_{h.label.toUpperCase().replace(/\s+/g, '_')}
          </li>
        ))}
      </ul>
    </div>
  );
}
