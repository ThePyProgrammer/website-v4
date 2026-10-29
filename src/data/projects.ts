import { Project } from '@/types/project';

// Metadata order determines display order. Set published: true when ready to show a project.
const projectMetadata: Project[] = [
    {
      codename: "researchos",
      title: "ResearchOS",
      subtitle: "What if your research papers, notes, experiments, and AI agents could all live in one place? ResearchOS turns a scattered research workflow into a connected, AI-powered workspace.",
      published: true,
      technologies: ["React", "FastAPI", "Supabase", "Pydantic AI"],
      image: "/img/projects/researchos.png",
      date: "Feb 2026 - Present",
      link: "https://github.com/ThePyProgrammer/ResearchOS"
    },
    {
      codename: "argus",
      title: "Argus",
      subtitle: "One robot can only see so much. Give it a hundred eyes, a few teammates, and a shared understanding of the world, and suddenly things get interesting.",
      published: true,
      technologies: ["MuJoCo", "Three.js", "FastAPI"],
      image: "/img/projects/argus.png",
      date: "Mar 2026 - Present",
      link: "https://github.com/ThePyProgrammer/argus"
    },
    {
      codename: "aitc",
      title: "AI Traffic Controller",
      subtitle: "Running five coding agents at once sounds great until two of them edit the same file and a third deletes it. Someone needs to control the airspace.",
      published: true,
      technologies: ["Tauri", "React", "tree-sitter"],
      image: "/img/projects/aitc.png",
      date: "Apr 2026 - Jun 2026",
      link: "https://github.com/ThePyProgrammer/aitc"
    },
    {
      codename: "northstar",
      title: "Northstar",
      subtitle: "A Talent Acquisition and Development Software",
      published: false,
      technologies: ["React", "Material UI", "FastAPI", "LLM"],
      image: "/img/projects/northstar.webp",
      date: "Nov 2023 - Jan 2024"
    },
    {
      codename: "arxivnush",
      title: "arXiv.nush",
      subtitle: "Ever wondered what research your classmates have been working on, or where all those award-winning projects end up? Think arXiv, but for an entire school's research ecosystem!",
      published: false,
      technologies: ["Flask", "Vue3", "MySQL"],
      image: "/img/projects/arxivnush.png",
      date: "Dec 2022 - Nov 2023",
      link: "https://github.com/ThePyProgrammer/arxiv.nush"
    },
    {
      codename: "gitpolice",
      title: "Git Police",
      subtitle: "Tired of boring or \"undescriptive\" commits? Make them fun (or mildly annoying) with challenges like puzzles, answering trivia, or enduring code roasts—ensuring your commits are always engaging!",
      published: false,
      technologies: ["VSCode", "React", "Material UI", "OpenCV", "NLTK"],
      image: "/img/projects/gitpolice.jpg",
      date: "Jan 2025",
      link: "https://github.com/ThePyProgrammer/git-police"
    },
    {
      codename: "figglespeak",
      title: "FiggleSpeak",
      subtitle: "The all in one, AI-powered speech therapy toolkit. Get instant feedback on your pronunciation, and tips to improve!",
      published: false,
      technologies: ["Vue3", "Material UI", "Tensorflow"],
      image: "/img/projects/figglespeak.png",
      date: "Feb 2024",
      link: "https://figglespeak-ai.netlify.app/"
    },
    {
      codename: "protoprompter",
      title: "ProtoPrompter",
      subtitle: "A Comprehensive (at the time) Prompt Engineering Application",
      published: false,
      technologies: ["React", "Material UI", "LLM"],
      image: "/img/projects/protoprompter.png",
      date: "Dec 2023 - Jan 2024"
    },
    {
      codename: "hearme",
      title: "HearMe",
      subtitle: "An AI-powered Utility for Lip Readers",
      published: false,
      technologies: ["Android", "Tensorflow"],
      image: "/img/projects/hearme.png",
      date: "Jun - Oct 2022",
      link: "https://github.com/ThePyProgrammer/HearMe"
    },
    {
      codename: "cura",
      title: "Cura",
      subtitle: "An AI-powered Social Network for Caregivers",
      published: false,
      technologies: ["Android", "Firebase", "Tensorflow"],
      image: "/img/projects/cura.webp",
      date: "Jul - Sep 2022",
      link: "https://github.com/ThePyProgrammer/cura"
    },
    {
      codename: "face",
      title: "Project FACE",
      subtitle: "Facial-recognition AI for Communicating Emotions (FACE) - An application for visual sentimental analysis",
      published: false,
      technologies: ["OpenCV", "Tensorflow", "Tkinter"],
      image: "/img/projects/face.png",
      date: "Jun 2021"
    }
];

// Explicit opt-in keeps new projects hidden until they are ready.
export const projects = projectMetadata.filter(project => project.published === true);
