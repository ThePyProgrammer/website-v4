export type Recommendation = {
    name: string;
    firstName?: string;
    relationship: string;
    role: string;
    currentJob?: string,
    avatarUrl: string;
    link: string,
    recommendation: string | JSX.Element;
}


export type WorkExperience = {
    iconUrl: string;
    title: string;
    description: string | JSX.Element;
    timeline: string;
    images: string[];
    reccs: Recommendation[];
}
