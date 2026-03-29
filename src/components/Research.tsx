import { motion } from 'framer-motion';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { ResearchProjectCard } from './projects/ResearchProjectCard';
import { researchProjects } from '@/data/research';
import { researchContent } from '@/content';
import { MarkdownContent } from './MarkdownContent';

export function Research() {
    const [selectedProject, setSelectedProject] = React.useState(-1);

    return (
        <section id="research" className="bg-muted/50 py-20">
            <div className="container mx-0 sm:mx-6 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-8 text-left"
                >
                    <h2 className="text-3xl sm:text-4xl">research projects</h2>
                </motion.div>
                <div className={`flex flex-col md:flex-row gap-16 mx-auto w-full`}>
                    <div className={`grid gap-12 ${(selectedProject == -1) ? " lg:mr-12 md:grid-cols-2 lg:grid-cols-3": " max-w-md"}`}>
                        {(selectedProject != -1) && (
                            <ResearchProjectCard key={selectedProject}
                            index={selectedProject} project={researchProjects[selectedProject]}
                            selected={true}
                            onClick={() => {
                                setSelectedProject(-1);
                            }} otherSelected={false} />
                        )}
                        {
                            researchProjects.map((project, index) => ({ project, index, selected: selectedProject == index})).filter(it => !it.selected).map(({ project, index }) => (
                                <ResearchProjectCard key={index}
                                index={index} project={project}
                                selected={selectedProject == index}
                                onClick={() => {
                                    if(selectedProject == index) {
                                        setSelectedProject(-1);
                                    } else {
                                        setSelectedProject(index);
                                    }
                                }}
                                otherSelected={selectedProject != -1} />
                            ))
                        }
                    </div>
                    {(selectedProject != -1) && (
                        <div className="w-full pr-12">
                            <h3 className="mb-2 text-2xl sm:text-3xl">{researchProjects[selectedProject].title}</h3>
                            <div className="mb-8">
                                <p className="text-muted-foreground font-mono">{researchProjects[selectedProject].timeline}</p>
                            </div>
                            <div className="max-w-2xl text-muted-foreground mb-8 space-y-4">
                                <MarkdownContent content={researchContent[researchProjects[selectedProject].codename] ?? ''} />
                            </div>
                            {(researchProjects[selectedProject].links.length > 0) && (
                            <div className="mt-8">
                                <h4 className="mb-4 text-lg">Links</h4>
                                <div className="flex gap-2">
                                    {researchProjects[selectedProject].links.map((link, index) => (
                                        <a href={link.link} target="_blank" rel="noreferrer" key={index}>
                                            <Badge variant="secondary">
                                                <img src={link.icon} alt={link.text} className="h-4 w-4 mr-2 inline-block" />
                                                {link.text}
                                            </Badge>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            )}
                            {(researchProjects[selectedProject].imgs.length > 0) && (
                                <div className="mt-8">
                                    <h4 className="mb-4 text-lg">Gallery</h4>
                                    <Carousel className="w-full">
                                        <CarouselContent className="-ml-1">
                                            {researchProjects[selectedProject].imgs.map((image, index) => (
                                            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                                <img src={image} alt={researchProjects[selectedProject].codename} className="w-full h-full object-cover" />
                                            </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}
