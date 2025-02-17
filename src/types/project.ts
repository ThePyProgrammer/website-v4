export type ProjectLink = {
    link: string,
    text: string,
    icon: string
}

export type Project = {
    codename: string,
    title: string,
    subtitle: string,
    description: string,
    technologies: string[],
    image: string,
    date: string,
    link?: string
}

export type ResearchProject = {
    codename: string,
    title: string | JSX.Element,
    subtitle: string | JSX.Element,
    description: string | JSX.Element,
    awards: (string | JSX.Element)[],
    links: ProjectLink[],
    // pdfs?: string[],
    timeline: string,
    cover: string,
    imgs: string[]
}