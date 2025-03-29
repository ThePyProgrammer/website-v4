import { motion } from 'framer-motion';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { WorkExperience } from '@/types/work';
import { TimelineItem } from './work/TimelineItem';
import { RecommendationCard } from './work/RecommendationCard';


export function Experience() {
    const workExperience: WorkExperience[] = [
      {
        iconUrl: "/img/cmp/raid.svg",
        title: "AI Researcher @ RSAF RAiD",
        description: <span>
            I am serving my National Service obligations as a Software Support Assistant at the <a href="https://rsaf-agile-inno-digital.defence.gov.sg/">RSAF Agile Innovation Digital (RAiD)</a>, under their Experimentations branch, <a href="https://maps.app.goo.gl/GLhfqexgm6xFeuRS9">AETHER</a>. 
            <br/><br/>
            Currently, I am leading an innovation team developing human-machine interfaces to enhance RSAF-wide console-based operations. 
            We are investigating research methods to measure the cognitive load of controllers and developing decision support systems for training and operations purposes.
            <br/><br/>
            Previously, our team has
            <ul className="list-disc pl-4">
                <li className="mb-2">deployed a basic MVP VSCode Extension for our RAiDers, using basic LLM-based Multi-Agent Systems as a backbone to communicate with multiple codebases and transfer code snippets between different systems.<br/><small>with <a href="https://scholar.google.com.sg/citations?user=xoQuuC0AAAAJ&hl=en">Cheong Sik Feng</a> and <a href="https://www.linkedin.com/in/en-hao-tew/">Tew En Hao</a></small></li>
                <li>conducted research in the domain of Air Traffic Control transcription, authoring a <a href="https://arxiv.org/abs/2502.20311">research paper</a> comparing and fine-tuning various Whisper models against our own self-collected dataset.<br/><small>with <a href="https://www.linkedin.com/in/marcuswee/">Marcus Wee</a> and <a href="https://www.linkedin.com/in/lynus-lim-286811219/">Lynus Lim</a></small></li>
            </ul>
            <br/>
            I also manage general team operations, including manpower, logistics and finance.
        </span>,
        timeline: "Aug 2024 - Present",
        images: [
            "/img/cmp/raid-aether.jpg", 
            "/img/cmp/raid-bci.jpg",
            "/img/cmp/raid-hd.jpg",
            "/img/cmp/raid-caf.jpg",
            "/img/cmp/raid-cds.jpg",
            "/img/cmp/raid-cems.jpg",
            "/img/cmp/raid-dotc.jpg",
            "/img/cmp/raid-dotchack.jpg",
        ], //, "/img/cmp/raid-mg.jpg"]
        reccs: []
      },
      {
        iconUrl: "/img/cmp/temus.jpg",
        title: "AI and Data Intern @ Temus",
        description: <span>
            I led a team of interns to develop an <a href="https://temus.com/case-study/ai-talent-acquisition-and-development-platform/">LLM-powered HR management system</a> for internal and external use. Our application was deployed within Temus. 
            
            This project, codenamed <b>Northstar</b>, attained <a href="https://temus.com/event/ai-trailblazers-demo-at-google-cloud-explore-ai-event/">Innovation Award at Google x IMDA Generative AI Trailblazers Competition</a>. 
            <br/><br/>
            I also worked on two side projects:
            <ul className="list-disc pl-4">
                <li className="mb-2">a prompt engineering application supporting various service LLMs.</li>
                <li>a simple Air Traffic Control roleplaying software demo for <a href="https://rsaf-agile-inno-digital.defence.gov.sg/">RSAF's RAiD</a>.<br/><small>with <a href="https://www.linkedin.com/in/jamieljs/">Jamie Lim</a></small></li>
            </ul>
            <br/>
            I was later given the informal appointment "senior intern" for my contribution managing three interns on the project.
        </span>,
        timeline: "Nov 2023 - Jan 2024",
        images: ["/img/cmp/temus-trailblazer.jpg", "/img/cmp/temus-team.jpeg", "/img/cmp/temus-teamday.jpg"],
        reccs: [
            {
                name: "John Ang",
                relationship: "Supervisor",
                role: "AI Technical Project Manager",
                currentJob: "Associate Director @ Temus",
                avatarUrl: "/img/cmp/temus-john.jpeg",
                recommendation: <span>
                    "Who's the kid and why is he such a seasoned engineer?"
                    <br/><br/>
                    Prannay landed at Temus for a two month AI and Data internship, and very quickly became the go-to engineer for an entire suite of Generative AI products that we were prototyping. No challenge appeared to be too great - from AI Engineering, and all the way to building the front end, Prannay proved himself to be a consummate engineer, able to navigate and tackle almost any engineering problem given to him.
                    <br/><br/>
                    In addition, Prannay's amazing can-do attitude and inqusitive nature helped him connect with almost all the engineers on our team, and the synergies that came out of that helped us to accelerate our engineering productivity in a major way.
                    <br/><br/>
                    Prannay is very sorely missed since he as gone to NS - we wish him all the best, and whichever organization gets the benefit of his skills next should count themselves very fortunate indeed!"
                </span>,
                link: "https://www.linkedin.com/in/johnangrs/"
            }
        ]
      },
      {
        iconUrl: "/img/cmp/aisg.png",
        title: "AI Intern @ AI Singapore",
        description: <span>Worked with a bleeding-edge AI company under AI Singapore to develop a benchmarking tool and a Proof-of-Concept news classification application to pitch their potential models to Singaporean companies. Set up a MLflow interface for easy logging of experimental results.</span>,
        timeline: "Dec 2022",
        images: [],
        reccs: [
            {
                name: "Ryzal Kamis",
                relationship: "Supervisor",
                role: "Assistant Head (MLOps), Platforms Engineering",
                currentJob: "Lead MLOps @ ST Engineering",
                avatarUrl: "/img/cmp/aisg-ryzal.jpg",
                recommendation: <span>
                    For the tenure of about a month, I mentored Prannaya as he was assigned to an internal project which requires one to quickly pick up concepts and display technical acumen. On top of having to work with AI models and programming tasks, he had to deal with some MLOps concepts which he had not much prior experience with. That however did not stop him from learning and putting whatever he learned in a short period of time to good use. Prannaya would certainly be a great addition to any team that would have him.
                </span>,
                link: "https://www.linkedin.com/in/ryzalkamis/"
            },
            {
                name: "Kenny Chua",
                relationship: "Supervisor",
                role: "Senior AI Engineer",
                currentJob: "Staff Research Scientist @ Numenta",
                avatarUrl: "/img/cmp/aisg-kenny.jpg",
                recommendation: <span>
                    I mentored Prannaya during his internship at AI Singapore, during which he helped to develop a frontend GUI for benchmarking and demonstrating state-of-the-art sparse neural networks for natural language processing. Prannaya is a highly capable developer who greatly exceeded expectations by completing tasks far ahead of time. He was able to independently seek solutions to technical blockers with minimal supervision. Moreover, Prannaya is humble and receptive to feedback. He would be an asset to any organisation.
                </span>,
                link: "https://www.linkedin.com/in/kenny-wj-chua/"
            },
        ]
      }
    ]

    const [focusedItem, setFocusedItem] = React.useState(0);

    return (
        <section id="experience" className="bg-muted/30 py-20 w-screen">
            <div className="container px-4 sm:px-6 md:px-10 w-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="lg:mb-16 text-left w-full"
                >
                    <h2 className="mb-8 text-3xl sm:text-4xl">my work experience</h2>
                    <div className="flex flex-col md:flex-row gap-16 mx-auto w-full">
                        <ul className="flex flex-col w-full max-w-md">
                            {workExperience.map((item, index) => (
                            <TimelineItem key={index} {...item} focused={focusedItem==index} onClick={() => { setFocusedItem(index) }} />
                            ))}
                        </ul>
                        <div className="w-full md:pr-12">
                            <h3 className="mb-6 text-2xl sm:text-3xl">{workExperience[focusedItem].title.toLowerCase()}</h3>
                            <p className="max-w-2xl text-muted-foreground mb-8">
                                {workExperience[focusedItem].description}
                            </p>
                            {(workExperience[focusedItem].images.length > 0) && (
                                <div className="mt-8">
                                    <h4 className="mb-4 text-lg">Gallery</h4>
                                <Carousel className="w-full">
                                    <CarouselContent className="-ml-1">
                                        {workExperience[focusedItem].images.map((image, index) => (
                                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                            <img src={image} alt={workExperience[focusedItem].title} className="w-full h-full object-cover" />
                                        </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                                </div>
                            )}
                            {(workExperience[focusedItem].reccs.length > 0) && (
                                <div className="mt-8">
                                    <h4 className="mb-4 text-lg">Recommendations</h4>
                                    <div className={`grid gap-4 lg:grid-cols-2`}>
                                    {workExperience[focusedItem].reccs.map((recc, index) => (
                                        <RecommendationCard key={index} {...recc} />
                                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}


  
  


