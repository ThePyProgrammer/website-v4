import { motion } from 'framer-motion';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { TimelineItem } from './work/TimelineItem';
import { RecommendationCard } from './work/RecommendationCard';
import { workExperience } from '@/data/experience';


export function Experience() {
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
