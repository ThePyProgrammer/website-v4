export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
  coverImage?: string;
  splash?: boolean;
  /** Vertical crop anchor for the splash image. Accepts "20%" (from top),
   *  "-20%" (from bottom), "top", "center", "bottom". Defaults to center. */
  splashPosition?: string;
  published?: boolean;
  /** Mark as work-in-progress. Shows a disabled card in prod, full article in dev. */
  wip?: boolean;
  /** Optional override. When omitted, computed automatically from content. */
  readingTime?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}
