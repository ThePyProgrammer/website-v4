import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/content/blog';
import { SearchBar } from '../components/SearchBar';
import { renderTitle, stripTitleMarkup } from '../utils/renderTitle';
import { getCategoryColor } from '../utils/categoryColors';

type GroupBy = 'year' | 'category';

export function BlogArchives() {
  const [query, setQuery] = useState('');
  const [groupBy, setGroupBy] = useState<GroupBy>('year');

  const filtered = blogPosts.filter(p => {
    if (!query) return true;
    const q = query.toLowerCase();
    return stripTitleMarkup(p.frontmatter.title).toLowerCase().includes(q) ||
      p.frontmatter.tags.some(t => t.toLowerCase().includes(q));
  });

  const groups: { key: string; posts: typeof filtered }[] = [];
  if (groupBy === 'year') {
    const byYear: Record<string, typeof filtered> = {};
    for (const post of filtered) {
      const year = post.frontmatter.date.slice(0, 4);
      (byYear[year] ??= []).push(post);
    }
    for (const year of Object.keys(byYear).sort((a, b) => Number(b) - Number(a))) {
      byYear[year].sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
      groups.push({ key: year, posts: byYear[year] });
    }
  } else {
    const byCat: Record<string, typeof filtered> = {};
    for (const post of filtered) {
      const cat = post.frontmatter.category;
      (byCat[cat] ??= []).push(post);
    }
    for (const cat of Object.keys(byCat).sort()) {
      byCat[cat].sort((a, b) =>
        stripTitleMarkup(a.frontmatter.title).localeCompare(stripTitleMarkup(b.frontmatter.title))
      );
      groups.push({ key: cat, posts: byCat[cat] });
    }
  }

  return (
    <div className="pt-8 pb-16 px-6 md:px-12 w-full">
      <SearchBar value={query} onChange={setQuery} />

      <div className="mb-8 flex items-center gap-3">
        <span className="text-[10px] font-headline text-[#adaaad] uppercase tracking-widest">Group by:</span>
        {(['year', 'category'] as GroupBy[]).map(opt => (
          <button
            key={opt}
            onClick={() => setGroupBy(opt)}
            className={`px-3 py-1 text-[10px] font-headline uppercase tracking-widest transition-colors ${
              groupBy === opt
                ? 'bg-[#00d4fd]/15 text-[#00d4fd] border border-[#00d4fd]/40'
                : 'text-[#767577] border border-[#262528] hover:text-[#f9f5f8] hover:border-[#767577]'
            }`}
          >
            [{opt}]
          </button>
        ))}
      </div>

      <div className="space-y-20">
        {groups.map(({ key, posts }, gi) => {
          const groupColors = groupBy === 'category' ? getCategoryColor(key) : null;
          const numberColor = groupColors ? groupColors.text : 'text-[#00d4fd]';
          const heading = groupBy === 'year' ? `YEAR_${key}` : key.toUpperCase();
          return (
            <section key={key}>
              <div className="flex items-baseline gap-4 mb-8">
                <h2 className={`font-headline text-4xl font-extrabold tracking-tighter text-[#f9f5f8] ${gi > 0 ? 'opacity-50 hover:opacity-100 transition-opacity' : ''}`}>
                  <span className={numberColor}>{String(gi + 1).padStart(2, '0')}_</span>{heading}
                </h2>
                <span className="h-[2px] flex-1 bg-[#262528]" />
                <span className="font-headline text-xs text-[#767577] uppercase tracking-widest">
                  {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
                </span>
              </div>

              <div className="space-y-1">
                {posts.map(post => {
                  const colors = getCategoryColor(post.frontmatter.category);
                  return (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="group flex items-center justify-between p-4 bg-[#131315] hover:bg-[#262528] transition-[background-color,border-color] cursor-pointer border-l-2 border-transparent hover:border-[color:var(--accent)]"
                      style={{ ['--accent' as string]: colors.hex }}
                    >
                      <div className="flex items-center gap-6 min-w-0 flex-1">
                        <div className="flex flex-col gap-1 shrink-0 w-28">
                          <span className="font-headline text-xs text-[#767577] tabular-nums">[{post.frontmatter.date}]</span>
                          <span className={`self-start px-2 py-0.5 ${colors.bg} ${colors.text} text-[10px] font-headline uppercase`}>
                            [{post.frontmatter.category}]
                          </span>
                        </div>
                        <h3 className={`font-headline text-lg font-medium text-[#f9f5f8] ${colors.groupHover} transition-colors uppercase tracking-tight min-w-0`}>
                          {renderTitle(post.frontmatter.title)}
                        </h3>
                      </div>
                      <span className={`text-[#767577] ${colors.groupHover} transition-colors hidden md:inline`}>→</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-headline text-[#ff7351] text-xl mb-2">[NO_RESULTS]</p>
            <p className="text-[#adaaad] text-sm">No entries match your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
