import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogPosts } from '@/content/blog';
import { SearchBar } from '../components/SearchBar';
import { renderTitle, stripTitleMarkup } from '../utils/renderTitle';
import { getCategoryColor } from '../utils/categoryColors';

export function BlogArchives() {
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filtered = blogPosts.filter(p => {
    const matchesQuery = !query ||
      stripTitleMarkup(p.frontmatter.title).toLowerCase().includes(query.toLowerCase()) ||
      p.frontmatter.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = !categoryFilter || p.frontmatter.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  // Group by year
  const byYear: Record<string, typeof filtered> = {};
  for (const post of filtered) {
    const year = post.frontmatter.date.slice(0, 4);
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(post);
  }
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="pt-8 pb-16 px-6 md:px-12 w-full">
      <SearchBar value={query} onChange={setQuery} />

      {categoryFilter && (
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[10px] font-headline text-[#adaaad] uppercase">Filtered by:</span>
          <span className="text-[#00d2fd] font-headline text-xs uppercase">[{categoryFilter}]</span>
          <Link to="/blog/archives" className="text-[10px] text-[#ff7351] font-headline uppercase hover:text-[#f9f5f8] transition-colors">
            CLEAR_FILTER
          </Link>
        </div>
      )}

      <div className="space-y-20">
        {years.map((year, yi) => (
          <section key={year}>
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className={`font-headline text-4xl font-extrabold tracking-tighter text-[#f9f5f8] ${yi > 0 ? 'opacity-50 hover:opacity-100 transition-opacity' : ''}`}>
                <span className="text-[#00d4fd]">{String(yi + 1).padStart(2, '0')}_</span>YEAR_{year}
              </h2>
              <span className="h-[2px] flex-1 bg-[#262528]" />
              <span className="font-headline text-xs text-[#767577] uppercase tracking-widest">
                {byYear[year].length} {byYear[year].length === 1 ? 'entry' : 'entries'}
              </span>
            </div>

            <div className="space-y-1">
              {byYear[year].map(post => {
                const colors = getCategoryColor(post.frontmatter.category);
                return (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group flex items-center justify-between p-4 bg-[#131315] hover:bg-[#262528] transition-colors cursor-pointer border-l-2 border-transparent hover:border-[#00d2fd]"
                  >
                    <div className="flex items-center gap-6 min-w-0 flex-1">
                      <span className="font-headline text-xs text-[#767577] tabular-nums shrink-0 w-28">[{post.frontmatter.date}]</span>
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
        ))}

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
