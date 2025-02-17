import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import { ProjectCard } from './projects/ProjectCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

export function Projects() {
  const projects: Project[] = [
    {
      codename: "northstar",
      title: "Northstar",
      subtitle: "A Talent Acquisition and Development Software",
      description: "Project done at Temus, HR management software. Set up LLM-assisted resume evaluation and summarisation with retrieval-augmented chatbot. Leveraged tool-calling in GPT-4 API to create custom views in chatbot. Contributed to React-based user interface and FastAPI-based server, and led project development in later half. Set up GitHub Projects and Google Cloud Actions.",
      technologies: ["React", "Material UI", "FastAPI", "LLM"],
      image: "/img/projects/northstar.webp",
      date: "Nov 2023 - Jan 2024"
    },
    {
      codename: "arxivnush",
      title: "arXiv.nush",
      subtitle: "Compile your research projects, collaborate on competitions and more!",
      description: "A Website to compile your research projects, collaborate on competitions and more. Built with Flask, Vue3 and MySQL.",
      technologies: ["Flask", "Vue3", "MySQL"],
      image: "/img/projects/arxivnush.png",
      date: "Dec 2022 -"
    },
    {
      codename: "gitpolice",
      title: "Git Police",
      subtitle: "Tired of boring or \"undescriptive\" commits? Make them fun (or mildly annoying) with challenges like puzzles, answering trivia, or enduring code roasts—ensuring your commits are always engaging!",
      description: "Git Police is a VSCode extension that enforces creative commit messages through entertaining challenges. Inspired by \"The Password Game,\" it requires users to meet various rules when writing commit messages, such as composing haikus, creating palindromes, or using pig latin. The extension also includes interactive elements like answering trivia questions and using facial recognition to ensure users are smiling while committing. Built using Typer, NLTK, OpenCV2, and deepface, it integrates with VSCode through a React/MUI webview interface to make git commits more engaging while preventing generic messages like \"fix: minor fix.\"",
      technologies: ["VSCode", "React", "Material UI", "OpenCV", "NLTK"],
      image: "/img/projects/gitpolice.jpg",
      date: "Jan 2025"
    },
    {
      codename: "figglespeak",
      title: "FiggleSpeak",
      subtitle: "The all in one, AI-powered speech therapy toolkit. Get instant feedback on your pronunciation, and tips to improve!",
      description: "FiggleSpeak is an AI-powered speech therapy tool that helps users improve their pronunciation. Users select a language and difficulty level, record themselves reading text, and receive feedback on incorrect phonemes. The platform provides AI-generated pronunciation demonstrations and includes gamification features to track progress. Users get specific guidance on pronunciation mistakes and can watch visual demonstrations of correct pronunciations.",
      technologies: ["Vue3", "Material UI", "Tensorflow"],
      image: "/img/projects/figglespeak.png",
      date: "Feb 2024",
      link: "https://figglespeak-ai.netlify.app/"
    },
    {
      codename: "protoprompter",
      title: "ProtoPrompter",
      subtitle: "A Comprehensive (at the time) Prompt Engineering Application",
      description: "Developed as a side project at Temus. Developed a React+FastAPI based application to leverage service LLMs like GPT-4 and Claude. Application to create system prompts and test agentic behaviour of LLMs for production LLM testing. Deployed with Firebase for easy usage within Temus.",
      technologies: ["React", "Material UI", "LLM"],
      image: "/img/projects/protoprompter.png",
      date: "Dec 2023 - Jan 2024"
    },
    {
      codename: "hearme",
      title: "HearMe",
      subtitle: "An AI-powered Utility for Lip Readers",
      description: "An Android Application capable of taking in audio recordings and converting them into text and moving lips using AI algorithms.",
      technologies: ["Android", "Tensorflow"],
      image: "/img/projects/hearme.png",
      date: "Jun - Oct 2022"
    },
    {
      codename: "cura",
      title: "Cura",
      subtitle: "An AI-powered Social Network for Caregivers",
      description: "An Android Application linked with Firebase that uses a matching algorithm to match caregivers for relatable conversations, with AI-powered models to identify potential suicidal tendencies.",
      technologies: ["Android", "Firebase", "Tensorflow"],
      image: "/img/projects/cura.webp",
      date: "Jul - Sep 2022"
    },
    {
      codename: "face",
      title: "Project FACE",
      subtitle: "Facial-recognition AI for Communicating Emotions (FACE) - An application for visual sentimental analysis",
      description: "Used Tensorflow to develop a CNN model to perform Visual Sentiment Analysis over Facial Expressions. Developed a frotnend with Tkinter to visualise the outputs of the CNN and set up an inference server for the application.",
      technologies: ["OpenCV", "Tensorflow", "Tkinter"],
      image: "/img/projects/face.png",
      date: "Jun 2021"
    }
  ];

  // const [currentIndex, setCurrentIndex] = React.useState(0)

  return (
    <section id="projects" className="bg-muted/50 pb-20">
      <div className="container px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 text-left"
        >
          <h2 className="text-3xl sm:text-4xl">(other) featured projects</h2>
        </motion.div>

        <div className="w-full max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <ProjectCard project={project} index={index} total={projects.length} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/*

<div className="w-full max-w-6xl">
      <Carousel className="w-full" onSelect={(index) => setCurrentIndex(index)}>
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem key={index}>
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>

    */