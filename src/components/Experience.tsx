import { motion } from 'framer-motion';
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"

export function Experience() {
    const workExperience = [
      {
        iconUrl: "assets/img/cmp/raid.svg",
        title: "AI Engineer @ RSAF RAiD",
        description: <span>Serving my National Service obligations as a Software Support Assistant at the <a href="https://rsaf-agile-inno-digital.defence.gov.sg/">RSAF Agile Innovation Digital (RAiD)</a>, under their Experimentations branch, AETHER. Currently leading an innovation team developing human-machine interfaces to enhance RSAF-wide console-based operations. Investigating research methods to measure the cognitive load of controllers and developing decision support systems for training and operations purposes. Managing general team operations, including manpower, logistics and finance.</span>,
        timeline: "Aug 2024 - Present",
        images: ["assets/img/cmp/raid-aether.jpg", "assets/img/cmp/raid-bci.jpg", "assets/img/cmp/raid-mg.jpg"]
      },
      {
        iconUrl: "assets/img/cmp/temus.jpg",
        title: "AI and Data Intern @ Temus",
        description: "Led a team of interns to develop an LLM-powered HR management system for internal and external use. Assigned work and contributed actively to codebase and deployed application within Temus. Project attained Innovation Award at Google x IMDA Generative AI Trailblazers Competition. Worked on two side projects: a prompt engineering application supporting various service LLMs and a simple Air Traffic Control roleplaying software demo for RSAF's RAiD.",
        timeline: "Nov 2023 - Jan 2024",
        images: ["assets/img/cmp/temus-trailblazer.jpg", "assets/img/cmp/temus-team.jpeg", "assets/img/cmp/temus-teamday.jpg"]
      },
      {
        iconUrl: "assets/img/cmp/aisg.png",
        title: "AI Intern @ AI Singapore",
        description: "Worked with a bleeding-edge AI company under AI Singapore to develop a benchmarking tool and a Proof-of-Concept news classification application to pitch their potential models to Singaporean companies. Set up a MLflow interface for easy logging of experimental results.",
        timeline: "Dec 2022",
        images: []
      }
    ]

    const [focusedItem, setFocusedItem] = React.useState(0);

    return (
        <section id="experience" className="bg-muted/30 py-20">
            <div className="container mx-6 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16 text-left"
                >
                    <h2 className="mb-8 text-3xl sm:text-4xl">work experience</h2>
                    <div className="flex gap-16 mx-auto">
                        <ul className="flex flex-col w-full max-w-md">
                            {workExperience.map((item, index) => (
                            <TimelineItem key={index} {...item} focused={focusedItem==index} onClick={() => { setFocusedItem(index) }} />
                            ))}
                        </ul>
                        <div className="w-full">
                            <h3 className="mb-6 text-2xl sm:text-3xl">{workExperience[focusedItem].title.toLowerCase()}</h3>
                            <p className="max-w-2xl text-muted-foreground mb-8">
                                {workExperience[focusedItem].description}
                            </p>
                            {(workExperience[focusedItem].images.length > 0) && (
                                <Carousel className="w-full">
                                    <CarouselContent className="-ml-1">
                                        {workExperience[focusedItem].images.map((image, index) => (
                                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                            <img src={image} alt={workExperience[focusedItem].title} className="w-full h-full object-cover" />
                                        </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                        )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}


function TimelineItem({ iconUrl, title, timeline, focused, onClick }: { iconUrl: string; title: string; timeline: string, focused: boolean, onClick: () => void }) {
    return (
        <li className="relative flex flex-col gap-2 h-28 mb-4" onClick={onClick}>
            <div
            className={`relative flex items-center gap-8 py-3 pl-4 pr-8 shadow-lg rounded-xl border-blue-gray-50 shadow-blue-gray-900/5 max-w-md${focused ? " bg-gray-900" : " bg-black"}`}>
                <span
                className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full">
                    <img src={iconUrl} alt={title}
                        className="relative inline-block h-20 w-20 !rounded-full border-2 border-gray-900 object-cover object-center" />
                </span>
                <div className="flex flex-col gap-1">
                <h6
                    className="block font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    {title}
                </h6>
                <p className="block font-sans text-md antialiased font-normal leading-normal text-gray-400">
                    {timeline}
                </p>
                </div>
            </div>
        </li>
    //   <li className="relative flex flex-col gap-2">
    //     <span className="absolute left-0 grid justify-center transition-opacity duration-200 bg-transparent">
    //       <span className="h-full w-0.5 bg-blue-gray-100"></span>
    //     </span>
    //     <div className="flex items-center gap-4">
    //       <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900 p-0 text-white">
    //         <img src={iconUrl} alt="user 2"
    //           className="relative inline-block h-9 w-9 !rounded-full border-2 border-gray-900 object-cover object-center" />
    //       </span>
    //       <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
    //         {title}
    //       </h5>
    //     </div>
    //     <div className="flex gap-4 pb-8">
    //       <span className="flex-shrink-0 invisible h-full pointer-events-none"></span>
    //       <div>
    //         <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-600">
    //           {description}
    //         </p>
    //       </div>
    //     </div>
    //   </li>
    )
  }