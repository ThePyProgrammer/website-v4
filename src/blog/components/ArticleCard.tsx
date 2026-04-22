import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { renderTitle, stripTitleMarkup } from '../utils/renderTitle';
import { getCategoryColor } from '../utils/categoryColors';

export function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  const colors = getCategoryColor(post.frontmatter.category);
  const isWip = post.frontmatter.wip && import.meta.env.PROD;

  const card = (
    <motion.article
      layoutId={`article-card-${post.slug}`}
      className={`group relative bg-[#131315] p-8 transition-colors duration-500 overflow-hidden h-full flex flex-col ${
        isWip ? 'opacity-50 cursor-default' : 'hover:bg-[#1f1f22] cursor-pointer'
      }`}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
        <span className="font-headline text-4xl font-black text-[#00d4fd]/20">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {post.frontmatter.coverImage && (
        <motion.div layoutId={`article-image-${post.slug}`} className="mb-6 relative h-48 bg-black overflow-hidden">
          <img
            src={post.frontmatter.coverImage}
            alt={stripTitleMarkup(post.frontmatter.title)}
            className={`w-full h-full object-cover transition-all duration-700 scale-105 ${
              isWip ? 'opacity-40 grayscale' : 'opacity-80 group-hover:opacity-100 group-hover:scale-110'
            }`}
          />
          {isWip && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-headline text-xs uppercase tracking-widest text-[#ffd93d] bg-black/80 px-4 py-2 border border-[#ffd93d]/30">
                // under construction
              </span>
            </div>
          )}
        </motion.div>
      )}

      {!post.frontmatter.coverImage && isWip && (
        <div className="mb-6 h-48 bg-[#0e0e10] flex items-center justify-center border border-[#48474a]/20">
          <span className="font-headline text-xs uppercase tracking-widest text-[#ffd93d] bg-black/80 px-4 py-2 border border-[#ffd93d]/30">
            // under construction
          </span>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <span className={`px-2 py-0.5 ${isWip ? 'bg-[#262528] text-[#adaaad]' : `${colors.bg} ${colors.text}`} text-[10px] font-headline uppercase`}>
          [{post.frontmatter.category}]
        </span>
        <span className="px-2 py-0.5 bg-[#262528] text-[#adaaad] text-[10px] font-headline uppercase">
          {post.frontmatter.readingTime} read
        </span>
      </div>

      <motion.h3
        layoutId={`article-title-${post.slug}`}
        className={`font-headline text-xl font-bold mb-4 transition-colors leading-tight ${
          isWip ? 'text-[#adaaad]' : colors.hover
        }`}
      >
        {renderTitle(post.frontmatter.title)}
      </motion.h3>

      <motion.p
        layoutId={`article-excerpt-${post.slug}`}
        className="text-[#adaaad] text-sm line-clamp-3 mb-8 leading-relaxed"
      >
        {post.frontmatter.excerpt}
      </motion.p>

      <span className={`mt-auto inline-flex items-center gap-2 text-xs font-bold font-headline tracking-widest uppercase transition-all ${
        isWip ? 'text-[#ffd93d]/60' : `${colors.text} group-hover:gap-4`
      }`}>
        {isWip ? '// COMING_SOON' : 'INITIATE_READ →'}
      </span>
    </motion.article>
  );

  if (isWip) {
    return <div className="block h-full">{card}</div>;
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      {card}
    </Link>
  );
}
