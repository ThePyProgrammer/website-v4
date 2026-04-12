import { parseFrontmatter } from '@/lib/frontmatter';
import { estimateReadingTime } from '@/lib/readingTime';
import { BlogPost, BlogFrontmatter } from '@/types/blog';

const blogMd = import.meta.glob('./blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace('.md', '');
}

const allPosts: BlogPost[] = Object.entries(blogMd)
  .map(([path, raw]) => {
    const { frontmatter, content } = parseFrontmatter(raw);
    const fm = frontmatter as unknown as BlogFrontmatter;
    return {
      slug: slugFromPath(path),
      frontmatter: { ...fm, readingTime: fm.readingTime ?? estimateReadingTime(content) },
      content,
    };
  })
  .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

export const blogPosts: BlogPost[] = allPosts.filter(p => p.frontmatter.published !== false);

export function getBlogPost(slug: string): BlogPost | undefined {
  return allPosts.find(p => p.slug === slug);
}

export function getCategories(): string[] {
  return [...new Set(blogPosts.map(p => p.frontmatter.category))];
}
