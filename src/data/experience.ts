import { WorkExperience } from '@/types/work';

export const workExperience: WorkExperience[] = [
  {
    slug: "pragnition",
    iconUrl: "/img/cmp/pragnition.svg",
    title: "Research Engineer @ Pragnition Labs",
    timeline: "Mar 2026 - Present",
    images: [],
    reccs: []
  },
  {
    slug: "raid",
    iconUrl: "/img/cmp/raid.svg",
    title: "AI Researcher @ RSAF RAiD",
    timeline: "Aug 2024 - Feb 2026",
    images: [
        "/img/cmp/raid-aether.jpg",
        "/img/cmp/raid-bci.jpg",
        "/img/cmp/raid-hd.jpg",
        "/img/cmp/raid-caf.jpg",
        "/img/cmp/raid-cds.jpg",
        "/img/cmp/raid-msft.png",
        "/img/cmp/raid-cems.jpg",
        "/img/cmp/raid-dotc.jpg",
        "/img/cmp/raid-dotchack.jpg",
        "/img/cmp/raid-dotchack2.jpg",
    ],
    reccs: []
  },
  {
    slug: "temus",
    iconUrl: "/img/cmp/temus.jpg",
    title: "AI and Data Intern @ Temus",
    timeline: "Nov 2023 - Jan 2024",
    images: ["/img/cmp/temus-trailblazer.jpg", "/img/cmp/temus-team.jpeg", "/img/cmp/temus-teamday.jpg"],
    reccs: [
        {
            slug: "temus-john",
            name: "John Ang",
            relationship: "Supervisor",
            role: "AI Technical Project Manager",
            currentJob: "Associate Director @ Temus",
            avatarUrl: "/img/cmp/temus-john.jpeg",
            link: "https://www.linkedin.com/in/johnangrs/"
        }
    ]
  },
  {
    slug: "aisg",
    iconUrl: "/img/cmp/aisg.png",
    title: "AI Intern @ AI Singapore",
    timeline: "Dec 2022",
    images: [],
    reccs: [
        {
            slug: "aisg-ryzal",
            name: "Ryzal Kamis",
            relationship: "Supervisor",
            role: "Assistant Head (MLOps), Platforms Engineering",
            currentJob: "Lead MLOps @ ST Engineering",
            avatarUrl: "/img/cmp/aisg-ryzal.jpg",
            link: "https://www.linkedin.com/in/ryzalkamis/"
        },
        {
            slug: "aisg-kenny",
            name: "Kenny Chua",
            relationship: "Supervisor",
            role: "Senior AI Engineer",
            currentJob: "Staff Research Scientist @ Numenta",
            avatarUrl: "/img/cmp/aisg-kenny.jpg",
            link: "https://www.linkedin.com/in/kenny-wj-chua/"
        },
    ]
  }
];
