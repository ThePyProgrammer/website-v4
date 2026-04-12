export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
  coverImage?: string;
  splash?: boolean;
  published?: boolean;
  /** Optional override. When omitted, computed automatically from content. */
  readingTime?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}
