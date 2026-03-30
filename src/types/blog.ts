export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
  coverImage?: string;
  splash?: boolean;
  published?: boolean;
  readingTime: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}
