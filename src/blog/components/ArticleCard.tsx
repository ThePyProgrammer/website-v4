import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';

const categoryColors: Record<string, { text: string; bg: string }> = {
  'ai': { text: 'text-[#00d4fd]', bg: 'bg-[#00b8e0]/20' },
  'web-dev': { text: 'text-[#00d2fd]', bg: 'bg-[#00677e]/20' },
  'rust': { text: 'text-[#ff58e7]', bg: 'bg-[#fe00e9]/20' },
  'security': { text: 'text-[#ff58e7]', bg: 'bg-[#fe00e9]/20' },
};

export function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  const colors = categoryColors[post.frontmatter.category] ?? { text: 'text-[#00d4fd]', bg: 'bg-[#00d4fd]/20' };
  const hoverColors = ['hover:text-[#00d4fd]', 'hover:text-[#00d2fd]', 'hover:text-[#ff58e7]'];
  const hoverColor = hoverColors[index % 3];

  return (
    <Link to={`/blog/${post.slug}`} className="block">
      <motion.article
        layoutId={`article-card-${post.slug}`}
        className="group relative bg-[#131315] p-8 hover:bg-[#1f1f22] transition-colors duration-500 overflow-hidden cursor-pointer"
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
              alt={post.frontmatter.title}
              className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 scale-105 group-hover:scale-110"
            />
          </motion.div>
        )}

        <div className="flex gap-2 mb-4">
          <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} text-[10px] font-headline uppercase`}>
            [{post.frontmatter.category}]
          </span>
          <span className="px-2 py-0.5 bg-[#262528] text-[#adaaad] text-[10px] font-headline uppercase">
            {post.frontmatter.readingTime} read
          </span>
        </div>

        <motion.h3
          layoutId={`article-title-${post.slug}`}
          className={`font-headline text-xl font-bold mb-4 ${hoverColor} transition-colors leading-tight`}
        >
          {post.frontmatter.title}
        </motion.h3>

        <motion.p
          layoutId={`article-excerpt-${post.slug}`}
          className="text-[#adaaad] text-sm line-clamp-3 mb-8 leading-relaxed"
        >
          {post.frontmatter.excerpt}
        </motion.p>

        <span className="inline-flex items-center gap-2 text-[#00d4fd] text-xs font-bold font-headline tracking-widest uppercase group-hover:gap-4 transition-all">
          INITIATE_READ →
        </span>
      </motion.article>
    </Link>
  );
}
