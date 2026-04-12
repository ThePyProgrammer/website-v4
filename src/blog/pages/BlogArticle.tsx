import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPost } from '@/content/blog';
import { ArticleRenderer } from '../components/ArticleRenderer';
import { ArticleSidebar } from '../components/ArticleSidebar';

export function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-[#ff7351] mb-4">[ERROR_404]</h1>
          <p className="text-[#adaaad] mb-8">Article not found in database.</p>
          <Link to="/blog" className="text-[#00d4fd] font-headline text-xs uppercase tracking-widest hover:text-[#00d2fd] transition-colors">
            ← RETURN_TO_HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layoutId={`article-card-${post.slug}`}
      className="min-h-screen bg-[#0e0e10]"
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Splash Image */}
      {post.frontmatter.splash && post.frontmatter.coverImage && (
        <motion.div
          layoutId={`article-image-${post.slug}`}
          className="relative w-full h-[200px] overflow-hidden"
        >
          <img
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0e10]" />
        </motion.div>
      )}

      {/* Main Article */}
      <main className="px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-4xl xl:max-w-none xl:flex xl:gap-10">
          <div className="xl:flex-1 xl:min-w-0 xl:max-w-4xl">
            <header className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#00d2fd]/10 text-[#00d2fd] px-2 py-1 text-[10px] font-headline border border-[#00d2fd]/20 tracking-tighter uppercase">
                  Category: {post.frontmatter.category}
                </span>
                <span className="text-[#adaaad] text-[10px] font-headline">
                  TIMESTAMP: {post.frontmatter.date.replace(/-/g, '.')}
                </span>
              </div>
              <motion.h1
                layoutId={`article-title-${post.slug}`}
                className="font-headline text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-6"
              >
                <span className="text-[#00d4fd] mr-4">[#]</span>
                {post.frontmatter.title.toUpperCase()}
              </motion.h1>
              <motion.p
                layoutId={`article-excerpt-${post.slug}`}
                className="text-[#adaaad] font-headline text-lg italic max-w-2xl opacity-80 border-l-2 border-[#00d4fd]/30 pl-6"
              >
                "{post.frontmatter.excerpt}"
              </motion.p>
            </header>

            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <ArticleRenderer content={post.content} />
            </motion.article>

            {/* Tags Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-24 pt-8 border-t border-[#48474a]/10 flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex gap-4">
                {post.frontmatter.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-headline text-[#00d4fd]/40 uppercase">#{tag}</span>
                ))}
              </div>
              <Link
                to="/blog"
                className="text-[#00d4fd] font-headline text-xs uppercase tracking-widest hover:text-[#00d2fd] transition-colors"
              >
                ← RETURN_TO_INDEX
              </Link>
            </motion.footer>
          </div>
          <ArticleSidebar content={post.content} />
        </div>
      </main>
    </motion.div>
  );
}
