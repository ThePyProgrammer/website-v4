# Projects

Projects follow the same metadata/body split as research, experience, and clubs.

1. Create `src/content/projects/<codename>.md` with the project description. Markdown headings, links, lists, and emphasis are supported. Do not add frontmatter; metadata lives in the data file.
2. Add an entry to `src/data/projects.ts` in `projectMetadata` using this schema:

```ts
{
  codename: "my-project", // Must match the Markdown filename, without .md
  title: "My Project",
  subtitle: "A short summary",
  published: false,
  technologies: ["React", "TypeScript"],
  image: "/img/projects/my-project.png",
  date: "Oct 2026 - Present",
  link: "https://example.com" // Optional
}
```

3. Set `published: true` to show it on the site. Set it to `false` to hide it in both development and production. Entries appear in metadata array order.

Put images under `public/img/projects/`. All eight migrated projects remain published.

The publishing flag controls display only. Markdown is bundled by Vite, so do not put private information in unpublished projects.
