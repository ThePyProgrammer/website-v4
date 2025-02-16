import { motion } from 'framer-motion';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { Button } from './ui/button';

type ResearchProject = {
    codename: string,
    title: string | JSX.Element,
    subtitle: string | JSX.Element,
    description: string | JSX.Element,
    awards: (string | JSX.Element)[],
    links: {
        link: string,
        text: string,
        icon: string
    }[],
    // pdfs?: string[],
    timeline: string,
    cover: string,
    imgs: string[]
}

export function Research() {
    const [selectedProject, setSelectedProject] = React.useState(-1);

    const researchProjects: ResearchProject[] = [
        {
            codename: "walledeval",
            title: <span><b>WalledEval</b>: Safety Evaluation Toolkit for LLMs</span>,
            subtitle: <span>Developed a comprehensive and publicly-available Python library <code>walledeval</code> for LLM safety evaluation. Supported various LLMs, datasets, templates and judges.</span>,
            description: "",
            awards: [
                "Accepted into EMNLP 2024 Demo Track"
            ],
            links: [
                {
                    link: "https://aclanthology.org/2024.emnlp-demo.42/",
                    text: "publication",
                    icon: "/img/research/logos/emnlp.png"
                },
                {
                    link: "https://arxiv.org/pdf/2408.03837",
                    text: "pdf",
                    icon: "/img/research/logos/arxiv.png"
                },
                {
                    link: "https://github.com/walledai/walledeval",
                    text: "repo",
                    icon: "/img/research/logos/github.png"
                }
            ],
            timeline: "Jun 2024 - Aug 2024",
            cover: "/img/research/walledeval-cover.jpg",
            imgs: []
        },
        {
            codename: "parkinsons",
            title: <span><b>A Picture Is Worth A Thousand Steps</b>: Using Image Processing Techniques to predict Freezing of Gait (FoG) in Parkinson's Disease Patients</span>,
            subtitle: <span>Designed an Android Application that uses AI algorithms including Support Vector Machines and Convolutional Neural Networks (CNNs) to predict Freezing of Gait (FoG) for post-Parkinson's Disease treatment.</span>,
            description: "",
            awards: [
                <span>Singapore Science and Engineering Fair (SSEF) 2021 and 2023, <b>Gold Award</b></span>,
                <span>International Student Science Fair (ISSF) 2023, <b>1st Place in CS Category</b></span>,
                <span>Global Youth Science and Technology Bowl (GYSTB) 2021, <b>Third Prize</b></span>,
                <span>Accepted in IRC Conf on Science, Engineering and Tech (IRC-SET) 2021, <b>Best Presenters' Award</b></span>,
            ],
            links: [
                {
                    link: "/papers/parkinsons.pdf",
                    text: "recent pdf",
                    icon: "/img/research/logos/doc.png"
                },
                {
                    link: "https://link.springer.com/chapter/10.1007/978-981-16-9869-9_21",
                    text: "publication",
                    icon: "/img/research/logos/sn.png"
                },
            ],
            timeline: "May 2020 - Dec 2023",
            cover: "/img/research/parkinsons-cover.jpg",
            imgs: [
                "/img/research/parkinsons-issf.jpg",
                "/img/research/parkinsons-nush.jpg",
                "/img/research/parkinsons-ssef.jpg",
                "/img/research/parkinsons-gystb.jpeg"
            ]
        },
        {
            codename: "tris",
            title: <span><b>Tris</b>: An Automated Screening System for Trinary Star Candidates</span>,
            subtitle: <span>Developed a multi-stage algorithm to process astronomical light curves for signs of abnormalities indicative of tertiary influence. Released software as Python library.</span>,
            description: "",
            awards: [
                "Accepted into The Physics Educator in 2025"
            ],
            links: [
                {
                    link: "https://www.worldscientific.com/doi/abs/10.1142/S2661339525500015",
                    text: "publication",
                    icon: "/img/research/logos/ws.png"
                },
                {
                    link: "https://github.com/three-body-analysis/tris",
                    text: "repo",
                    icon: "/img/research/logos/github.png"
                }
            ],
            timeline: "Jan 2021 - Aug 2023",
            cover: "/img/research/tris-cover.png",
            imgs: []
        },
        {
            codename: "malwareAI",
            title: <span>A Novel Feature Vector for AI-assisted Windows Malware Detection</span>,
            subtitle: <span>Used simple Deep Learning and Deep Transfer Learning to find an optimal model for Dynamic Malware Analysis using the Cuckoo Sandbox and Tensorflow.</span>,
            description: "",
            awards: [
                "Accepted into IEEE Intl Conf on Dependable, Autonomic & Secure Computing (DASC) 2023"
            ],
            links: [
                {
                    link: "https://ieeexplore.ieee.org/document/10361451",
                    text: "publication",
                    icon: "/img/research/logos/ieee.png"
                },
                {
                    link: "https://www.researchgate.net/profile/Tram-Truong-Huu/publication/374030409_A_Novel_Feature_Vector_for_AI-assisted_Windows_Malware_Detection/links/650aafc7d5293c106cc8ce59/A-Novel-Feature-Vector-for-AI-Assisted-Windows-Malware-Detection.pdf#page=1.00&gsr=0",
                    text: "pdf",
                    icon: "/img/research/logos/rg.svg"
                }
            ],
            timeline: "Jan 2022 - Jun 2023",
            cover: "/img/research/malware-cover.jpg",
            imgs: [
                "/img/research/malware-ssef.jpg"
            ]
        },
        {
            codename: "embodiedai",
            title: <span>Embodied AI for Computational Perception of Spatial Designs</span>,
            subtitle: <span>Trained Semantic Segmentation Models via Transfer Learning capable of segmenting HDB interiors and exteriors.</span>,
            description: "",
            awards: [],
            links: [
                {
                    link: "/papers/embodied_ai.pdf",
                    text: "paper",
                    icon: "/img/research/logos/doc.png"
                },
                {
                    link: "https://github.com/terminalai/EmbodiedAI",
                    text: "repo",
                    icon: "/img/research/logos/github.png"
                }
            ],
            timeline: "May 2021 - Dec 2021",
            cover: "/img/research/embodied-ai-cover.png",
            imgs: []
        },
        {
            codename: "writingAnalysis",
            title: <span>Noisy Student Training to identify Textual Elements in Unsupervised News Data via Argumentative Essay Pieces</span>,
            subtitle: <span>Used HuggingFace Transformers to develop a system of models capable of identifying Textual Elements in Opinion Editorials and Argumentative Essays. Created Vue2 and Flask-based web application to test these models.</span>,
            description: "",
            awards: [],
            links: [
                {
                    link: "https://github.com/terminalai/writingAnalysis",
                    text: "repo",
                    icon: "/img/research/logos/github.png"
                },
                {
                    link: "/papers/writing_analysis.pdf",
                    text: "report",
                    icon: "/img/research/logos/doc.png"
                },
            ],
            timeline: "Feb 2022 - May 2022",
            cover: "/img/research/writinganalysis-cover.png",
            imgs: []
        }
    ]

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
                    <h2 className="text-3xl sm:text-4xl">my research experience</h2>
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
                        {/* {researchProjects.map((project, index) => (
                            <ResearchProjectCard key={index} 
                            index={index} project={project}
                            selected={selectedProject == index}
                            onClick={() => {
                                if(selectedProject == index) {
                                    setSelectedProject(-1);
                                } else {
                                    setSelectedProject(index);
                                }
                            }} />
                        ))} */}
                    </div>
                    {(selectedProject != -1) && (
                        <div className="w-full pr-12">
                            <h3 className="mb-2 text-2xl sm:text-3xl">{researchProjects[selectedProject].title}</h3>
                            <div className="mb-8">
                                <p className="text-muted-foreground font-mono">{researchProjects[selectedProject].timeline}</p>
                            </div>
                            <p className="max-w-2xl text-muted-foreground mb-8">
                                {researchProjects[selectedProject].description}
                            </p>
                            {/* <div className="flex flex-wrap gap-2">
                                {researchProjects[selectedProject].awards.map((award, index) => (
                                    <Badge key={index} variant="secondary">{award}</Badge>
                                ))}
                            </div> */}
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

function ResearchProjectCard({ index, project, selected, onClick, otherSelected }: { index: number, project: ResearchProject, selected: boolean, onClick: () => void, otherSelected: boolean }) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={otherSelected ? "md:block hidden" : ""}
      >
        <Card className={`overflow-hidden${selected && " bg-gray-900"}`} onClick={selected ? onClick : () => {}}>
          {(<div className="aspect-video w-full overflow-hidden">
            <img
              src={project.cover}
              alt={project.codename}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>)}
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.subtitle}</CardDescription>
          </CardHeader>
          {(!selected) && (
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {project.links.map((link, index) => (
                        <a href={link.link} target="_blank" rel="noreferrer" key={index}>
                            <Badge variant="secondary">
                                <img src={link.icon} alt={link.text} className="h-4 w-4 mr-2 inline-block" />
                            {link.text}
                            </Badge>
                        </a>
                    ))}
                </div>
                <div className="w-full flex mt-3">
                <Button variant="secondary" className="ml-auto" onClick={onClick}>Read More</Button>
                </div>
                
            </CardContent>
          )}
        </Card>
      </motion.div>
    )

}