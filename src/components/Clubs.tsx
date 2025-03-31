import { motion } from 'framer-motion'
import { TimelineItem } from './work/TimelineItem';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { ClubExperience } from '@/types/clubs';
import React from 'react';

export function Clubs() {
    const workExperience: ClubExperience[] = [
      // Better.SG Youth Community Lead
      {
        iconUrl: "/img/clubs/bettersg.png",
        title: "EXCO Member @ Better.sg",
        description: <span>
            I am in charge of youth engagement, be it organising hackathons or mentorship programmes for youths. I also serve as an ad-hoc executive committee member, helping out with various planning activities in my free time.
        </span>,
        timeline: "Aug 2023 - Present",
        images: [
            "/img/clubs/better-beacon24.jpg",
            "/img/clubs/better-gin.jpg",
            "/img/clubs/better-louhei.jpg",
            "/img/clubs/better-meeting.jpg"
        ]
      },
      // BuildingBloCS 2023 OIC
      {
        iconUrl: "/img/clubs/bbcs.png",
        title: "Overall-in-Charge @ BBCS",
        description: <span>
            I was one of the three Overalls-in-Charge (OICs) at <a href="https://old.buildingblocs.sg/2023-newnew/">BuildingBloCS 2023</a>.
            <br/><br/>
            During my term in BuildingBloCS, I was responsible for the large-scale Development side of BuildingBloCS, where-in we developed <a href="https://github.com/buildingblocs/starvation">Starvation</a>, an open source gamified coding platform inspired by <a href="https://codecombat.com/">CodeCombat</a>, with the gameplay influenced by <a href="https://battlecats.club/en/series/battlecats/">BattleCats</a>.
            Developed with Vue, Flask, PostgreSQL and the Google Cloud Kubernetes Engine, this game was designed for beginner students to learn the workings of Python by solving coding challenges and data skills acquired from the workshops within the March Conference.
            <br/><br/>
            In addition to my work as the Development Lead on Starvation, I led efforts for the March and June Conference alongside by fellow OICs, including liasing with external sponsors like FOSSASIA, Better.sg, AI Singapore and Temus. We established a detailed curriculum to teach students the basics of programming, from basic Python programming up to data analytics, deep learning and advanced AI algorithms like Transformers and Reinforcement Learning. I personally taught a few workshops on <a href="https://www.youtube.com/watch?v=_sBc1KkuezU">Python Programming</a> and Flask-AI Integration.
            <br/><br/>
            I also largely led the management of the <a href="https://buildingblocs-2023.devpost.com/project-gallery">June Conference Hackathon</a> and the <a href="https://singathon.devpost.com/project-gallery">Singathon</a>. We also "incubated" the first ever <a href="https://blahaj.sg/">Blahaj CTF</a> in December 2023, advising the team with their logistics and planning.
        </span>,
        timeline: "Dec 2022 - Dec 2023",
        images: [
            "/img/clubs/bbcs-june.jpg",
            "/img/clubs/bbcs-action.png",
            "/img/clubs/bbcs-aisdc2.jpg",
            "/img/clubs/bbcs-workshop.jpg",
            "/img/clubs/bbcs-aisdc.jpg",
            "/img/clubs/bbcs-awards.jpg",
            "/img/clubs/bbcs-fossasia.jpg",
            "/img/clubs/bbcs-network.png",
        ],
      },
      // AppVenture President
      {
        iconUrl: "/img/clubs/appv.svg",
        title: "President @ AppVenture",
        description: <span>
            During my term as the President of the Computer Science Interest Group at NUS High, namely <a href="https://nush.app/">AppVenture</a>, I was responsuble for several structural and operational changes to the club, including the introduction of two new divisions, namely <b>Outreach</b> and <b>AI</b>. Under the Outreach division, our club seconded students to volunteer with <a href="https://old.buildingblocs.sg/2023-newnew/">BuildingBloCS 2023</a> for their March, June and September conferences, and <a href="https://vivita.sg/">VIVITA</a> for the <a href="https://techsat.ai/">Tech Saturdays</a> event. Within AI, we crafted a full curriculum to teach students basic AI and Machine Learning concepts that students could use in future hackathon or research projects.
            <br/><br/>
            Beyond this, we also organised a learning journey to TikTok Singapore, where we were given a tour of the office and a talk on the workings of TikTok and how it is used in Singapore. We also organised the first ever Quanta-AppVenture Physics Tournament (QAPT), a collaboration with Quanta, the Physics Interest Group of NUS High, to promote Computational Physics in NUS High as a whole.
        </span>,
        timeline: "Dec 2022 - Dec 2023",
        images: [
            "/img/clubs/appv-openhouse.jpg",
            "/img/clubs/appv-tiktok.jpg",
            "/img/clubs/appv-via.jpg",
            "/img/clubs/appv-via-engage.jpg",
            "/img/clubs/appv-via-teach.jpg",
            "/img/clubs/appv-dundies.jpg",
            "/img/clubs/appv-gm.jpg",
        ]
      },
      // SPhL Frontend Developer
      {
        iconUrl: "/img/clubs/sphl.png",
        title: "Frontend Developer @ SPhL",
        description: <span>
            I worked as one of the 2 (now 3) frontend developers on <a href="https://sgphysicsleague.org/">Singapore Physics League (SPhL)</a> website throughout the past 2 years. A large part of my work has also been to work with other leagues such as the <a href="https://sgbioleague.org/">Singapore Biology League (SBL)</a> and the Singapore Informatics League (SIL) to support their operations and foster a community of "League" competitions across Singapore.
        </span>,
        timeline: "Oct 2023 - Present",
        images: [
            "/img/clubs/sphl-2024.jpg",
            "/img/clubs/sphl-2025.jpg"
        ],
      },
      // NUSH Astro Club Director
      {
        iconUrl: "/img/clubs/astro.jpg",
        title: "Club Director @ NUSH Astro",
        description: <span>
            I served as the Club Director of the <a href="https://nushastro.github.io/website/">NUS High Astronomy Club</a>, where I was in charge of developing slides and materials and teaching theoretical astronomy concepts to the rest of the club on a weekly basis. Part of this was actually developing the entire website from the ground up using MKDocs and GitHub Pages.
        </span>,
        timeline: "Dec 2021 - Nov 2022",
        images: ["/img/clubs/astro-club.jpg"]
      }
    ]

    const [focusedItem, setFocusedItem] = React.useState(0);

    return (
        <section id="experience" className="bg-muted/20 py-20 w-screen">
            <div className="container px-4 sm:px-6 md:px-10 w-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="lg:mb-16 text-left w-full"
                >
                    <h2 className="mb-8 text-3xl sm:text-4xl">clubs and volunteering</h2>
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
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}


  
  


