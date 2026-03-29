function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace('.md', '');
}

function buildContentMap(modules: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(modules).map(([path, content]) => [slugFromPath(path), content])
  );
}

const experienceMd = import.meta.glob('./experience/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const reccsMd = import.meta.glob('./experience-reccs/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const researchMd = import.meta.glob('./research/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const clubsMd = import.meta.glob('./clubs/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export const experienceContent = buildContentMap(experienceMd);
export const reccsContent = buildContentMap(reccsMd);
export const researchContent = buildContentMap(researchMd);
export const clubsContent = buildContentMap(clubsMd);
