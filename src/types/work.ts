export type Recommendation = {
    slug: string;
    name: string;
    firstName?: string;
    relationship: string;
    role: string;
    currentJob?: string,
    avatarUrl: string;
    link: string,
}

export type WorkExperience = {
    slug: string;
    iconUrl: string;
    title: string;
    timeline: string;
    images: string[];
    reccs: Recommendation[];
}
