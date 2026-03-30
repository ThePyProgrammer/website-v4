import { blogPosts } from '@/content/blog';
import { ArticleCard } from '../components/ArticleCard';

export function BlogHome() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 pb-12 max-w-4xl">
        <span className="font-headline text-[#00d4fd] text-xs mb-4 block tracking-widest uppercase">// welcome</span>
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-[#f9f5f8] mb-6">
          Hey, I'm Prannaya.
        </h1>
        <p className="text-[#adaaad] max-w-xl leading-relaxed text-lg mb-4">
          This is where I write about things I'm learning, building, and thinking about: AI research, web dev, systems, and whatever else catches my interest.
        </p>
        <p className="text-[#adaaad]/60 text-sm font-mono">
          {blogPosts.length} posts // last updated {blogPosts[0]?.frontmatter.date ?? 'n/a'}
        </p>
      </section>

      {/* Article Grid */}
      <section className="px-6 md:px-12 pb-12 max-w-7xl">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-headline text-2xl font-bold text-[#f9f5f8]">Recent posts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {blogPosts.slice(0, 6).map((post, i) => (
            <ArticleCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
