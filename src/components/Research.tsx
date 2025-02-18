import { motion } from 'framer-motion';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import { ResearchProject } from '@/types/project';
import { ResearchProjectCard } from './projects/ResearchProjectCard';

export function Research() {
    const [selectedProject, setSelectedProject] = React.useState(-1);

    const researchProjects: ResearchProject[] = [
        {
            codename: "walledeval",
            title: <span><b>WalledEval</b>: Safety Evaluation Toolkit for LLMs</span>,
            subtitle: <span>Developed a comprehensive and publicly-available Python library <code>walledeval</code> for LLM safety evaluation. Supported various LLMs, datasets, templates and judges.</span>,
            description: <>
                <p className='pt-2'>
                    This was a project I completed as part of a voluntary research assistant role I assumed during my time as an Ops Clerk in the Singapore Army. I spearheaded the development of <a href="https://github.com/walledai">Walled AI Labs</a>, a non-profit initiative within the larger Walled AI started by my close friend, <a href="https://sg.linkedin.com/in/rishabh-bhardwaj-nlp">Dr Rishabh Bhardwaj</a>, who, at the time, was a PhD candidate at the <a href="https://sutd.edu.sg">Singapore University of Technology and Design</a>.
                </p>
                <p>
                    I spent a small block period from Jun to Aug 2024 developing <a href="https://hf.co/walledai/walledguard-c">models</a>, <a href="https://hf.co/datasets/walledai/SGXSTest">datasets</a> and a giant standalone <a href="https://github.com/walledai/walledeval">library named <code>walledeval</code></a>. These systems were built to evaluate the safety of large language models (LLMs) like GPT-4 and Claude. The library was designed to be user-friendly and accessible to researchers and practitioners in the field of AI safety.
                </p>
                <p>
                    Under Rishabh's tutelage, I gained invaluable experience in the field of AI safety and research methodologies. This project not only honed my technical skills but also deepened my understanding of the ethical implications and safety concerns associated with large language models.
                </p>
                <p>
                    We recently published a paper at EMNLP 2024, under the System Demonstrations Track! Check it out <a href="https://aclanthology.org/2024.emnlp-demo.42/">here</a>. The paper details the library and its capabilities, and how it can be used to evaluate the safety of LLMs.
                </p>
            </>,
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
            description: <>
                <p>
                    This project initially started off within the <a href="https://sites.google.com/site/scimphome/about-smp">Science Mentorship Programme (SMP)</a> in 2020, where our team was grouped with <a href="https://cde.nus.edu.sg/ece/staff/arthur-tay/">Prof Arthur Tay</a> from the NUS ECE Department. We were tasked with developing a system that could predict Freezing of Gait (FoG) in Parkinson's Disease patients, specifically focused on adapting algorithms from <a href="https://www.sciencedirect.com/science/article/abs/pii/S0165027007004281">Moore et al</a> and <a href="https://ieeexplore.ieee.org/document/5325884">Bachlin et al</a> and using the <a href="https://archive.ics.uci.edu/dataset/245/daphnet+freezing+of+gait">DaphNET dataset</a>.
                </p>
                <p>
                    Initially, we developed a simple system by using the Moore-Bächlin Algorithm for Freeze and Energy Indices as detailed in Moore et al to calculate a simple metric known as the Freeze Index. Unlike Moore et al, which decided to identify a baseline threshold value for the freeze indices, we attempted to train a Support Vector Machine (SVM) model to identify any patterns within the 3D space. We then attempted to deploy our best-performing SVM model onto a Arduino Nano 33 BLE Board to identify real-time freeze events based off the on-board accelerometers.
                </p>
                <p>
                    We submitted this project for several local and international research fairs, including the <a href="https://www.science.edu.sg/for-schools/competitions/singapore-science-and-engineering-fair">Singapore Science and Engineering Fair (SSEF)</a> 2021 (where we attained a Gold Award) and the <a href="https://isyf.hci.edu.sg/">HCI International Science Youth Forum (ISYF)</a> 2021 (where we received 2nd Place for Poster Presentation). Due to our success at SSEF, we were later selected among 4 teams to represent Singapore internationally at the <a href="https://ce.hkfyg.org.hk/gystb/">Global Youth Science and Technology Bowl (GYSTB)</a> 2021 in Hong Kong, though we were unable to attend the competition physically due to COVID-19 restrictions at the time. We clinched the Third Prize at that competition.
                </p>
                <p>
                    In tandem with all this, as part of the CS4131 Mobile Application Development module at NUS High, I embarked on a side quest to design a mobile application to interface with the sensor prototype we had created and store information on the web for easy tracking and emergency activation of medical resources in case of any injury. I designed an Android application in Kotlin to interface with the sensor via Bluetooth, and relied on Firebase Cloud Firestore to store major logs and authentication. We continued to develop this prototype application past the module too.
                </p>
                <p>
                    We submitted a preliminary draft of our work to the <a href="https://ircset.org/main/conference-2021/">Seventh IRC Conference on Science, Engineering and Technology (IRC-SET) 2021</a>, presenting our work on the trained Support Vector Machine, our Arduino prototype as well as the new Android application. We clinched the Best Presenters' Award at the conference, and our paper was published in Springer Nature as <a href="https://link.springer.com/chapter/10.1007/978-981-16-9869-9_21">a chapter in the proceedings of the conference</a>.
                </p>
                <p>
                    Around a year later, we restarted the project to explore more avenues of exploration. We had simply scratched the surface in terms of research development, and we wished to explore if there were better approaches to classifying the signal besides what was attained by the Moore-Bächlin Algorithm. We tested Google Cloud's AutoML service to identify if it could handle the data collected, but it was relatively unsuccessful. We also tested many traditional ML algorithms using cuml to attempt to extract any key insights from the freeze indices.
                </p>
                <p>
                    After all this, we decided to try to map the overall accelerometer data into a 16x16 image, and try using a very small convolutional neural network (CNN) model to attempt to mimic the behaviour of the freeze index calculation, but without aggregation. It was able to classify all our data by a landslide, showing how effective a CNN would be in this sort of signal processing task. We attempted to deploy this CNN algorithm within the mobile application too.
                </p>
                <p>
                    We finally submitted <a href="/papers/parkinsons.pdf">this work</a> (which has not yet been published) to the <a href="https://issf2023.com/">International Student Science Fair (ISSF) 2023</a> in Brisbane, and we attained 1st Place within the Computing & Mathematics category.
                </p>
                <p>
                    This work has been truly instrumental in building up my interest in research, and especially in doing research in fields at the intersection point between technology and healthcare, which I would take with me moving forward. I am truly indebted to my two teammates, who have been very supportive in the development of this project.
                </p>
            </>,
            awards: [
                <span>Singapore Science and Engineering Fair (SSEF) 2021 and 2023, <b>Gold Award</b></span>,
                <span>International Student Science Fair (ISSF) 2023, <b>1st Place in CS Category</b></span>,
                <span>Global Youth Science and Technology Bowl (GYSTB) 2021, <b>Third Prize</b></span>,
                <span>Accepted in IRC Conf on Science, Engineering and Tech (IRC-SET) 2021, <b>Best Presenters' Award</b></span>,
            ],
            links: [
                {
                    link: "https://link.springer.com/chapter/10.1007/978-981-16-9869-9_21",
                    text: "publication",
                    icon: "/img/research/logos/sn.png"
                },
                {
                    link: "/papers/parkinsons.pdf",
                    text: "pdf",
                    icon: "/img/research/logos/doc.png"
                },
                {
                    link: "https://www.researchgate.net/profile/Prannaya-Gupta/publication/362375886_Analysing_Gait_Patterns_of_Parkinsons'_Disease_Patients_to_Predict_Freezing_of_Gait_FoG_Using_Machine_Learning_Algorithms/links/6510dffcc05e6d1b1c2d6f8e/Analysing-Gait-Patterns-of-Parkinsons-Disease-Patients-to-Predict-Freezing-of-Gait-FoG-Using-Machine-Learning-Algorithms.pdf#page=1.00&gsr=0",
                    text: "pdf",
                    icon: "/img/research/logos/rg.svg"
                }
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
            description: <>
                <p>
                    I uptook this project at the start of 2021, when I was looking for interesting problem statements to explore in my 4th year of high school studies. At the time, this idea popped out for it's innovative premise: exploring the Three-Body Problem and finding such stellar triples. The root was highly comedic, as my friend Ernest proposed the idea after reading <a href="https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)">The Three-Body Problem by Liu Cixin</a>.
                </p>
                <p>
                    Since 2021, this project has seen several different direction changes. Initially, we had built a <a href="https://youtu.be/V3xyT9h0Ong">Three-Body Simulator</a>, that would be able to simulate the light curves of systems based on the masses, initial positions and velocities of the bodies. We developed a system culling pipeline based on this to observe light curves and take out bodies with less than 3 bodies based off a simple culling method.
                </p>
                <p>
                    After we consulted <a href="https://www.physics.nus.edu.sg/faculty/yang-jiahui-abel/">Prof Abel Yang Jiahui</a>, we had a better idea of the task at hand: we had to identify the eclipse time variations (ETVs) of the light curves, i.e. the variation in how long the eclipses were. We developed a simple pipeline for this, based on existing literature on the same, and we were able to get the paper published in The Physics Educator in 2025. Our work was also packaged into a Python library named <a href="https://three-body-analysis.github.io/tris/"><code>tris</code></a>.
                </p>
            </>,
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
            description: <>
                <p>
                    I embarked on this project with my co-organisers from <a href="https://buildingblocs.sg/">BuildingBloCS</a>, and assembled an unlikely ensemble of 6 students from 4 different Junior Colleges across Singapore. Under the tutelage of <a href="https://sites.google.com/site/htrtruong/home">Prof Tram Truong-Huu</a>, we trained and hyperparameter tuned several CNN-based AI models for Dynamic Malware Classification.
                </p>
                <p>
                    We worked to group and form a proper training plan, and trained many, many models for AI training. After this, we submitted and published this paper in the <a href="https://ieeexplore.ieee.org/xpl/conhome/10361260/proceeding">IEEE International Symposium on Dependable, Autonomic and Secure Computing (DASC)</a>.
                </p>
            </>,
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
            codename: "nushsat",
            title: <span>Optimization of the Telemetry, Tracking and Commmunications System in a CubeSat</span>,
            subtitle: <span>Designed a link budget and fragmentation protocol inspired by NASA's ICER system. Developed a primitive user interface in PyQt5 for receiving data transmission from satellite.</span>,
            description: <>
                <p>
                    This might be the coolest project I worked on during my time at NUS High, which is unfortunate for it was also the one I was the least invested in. As part of our school's 15-year anniversary in 2020, this project was initiated and greenlit. The development of a full nanosatellite, from conception to planning to construction to takeoff, was a daunting task for NUS High students. Luckily, we had a lot of support from <a href="https://www.linkedin.com/in/zhen-ning-ng-206676141/">Mr Ng Zhen Ning</a>, the CEO of NuSpace and a nanosatellite expert.
                </p>
                <p>
                    I joined this project in 2021, looking to explore the crazy madness of engineering and prototype development. I was tasked to work on developing a telemetry, tracking and communications (TT&C) system for the nanosatellite, mostly housed on a TT&C module procured by my predecessors. We had to explore methods to compress the images from the camera procured to transmit across RF to the ground station, in a lossless manner. Initially, we had explored using JPEG 2000 (JP2) for their image processing format, and attempted to use the <a href="https://github.com/jasper-software/jasper">JasPer Image Coding Toolkit</a>.
                </p>
                <p>
                    However, with major support from senior Lin Yicheng, who had developed <a href="https://github.com/TheRealOrange/icer_compression">a robust toolkit</a> to use NASA's proposed <a href="https://ipnpr.jpl.nasa.gov/progress_report/42-155/155J.pdf">ICER algorithm</a> for lossless compression of images, we integrated his system to our final prototype. Of course, I would say "we" but my junior, <a href="https://github.com/cryptoAlgorithm">Vincent Kwok</a>, did a bulk of the work, and Vincent and Yicheng deserve unlimited credit for their work on this satellite.
                </p>
                <p>
                    In case you're wondering, the satellite is indeed due to fly up to space soon! <a href="https://www.channelnewsasia.com/singapore/nus-high-school-nanosatellite-space-launch-4832781">Read here for more information!</a>
                </p>
            </>,
            awards: [],
            links: [],
            timeline: "Mar 2021 - Jun 2023",
            cover: "/img/research/nushsat-cover.jpg",
            imgs: ["/img/research/nushsat-camera.png", "/img/research/nushsat-2022.jpg"]
        },
        {
            codename: "embodiedai",
            title: <span>Embodied AI for Computational Perception of Spatial Designs</span>,
            subtitle: <span>Trained Semantic Segmentation Models via Transfer Learning capable of segmenting HDB interiors and exteriors.</span>,
            description: <>
                <p>
                    I joined this project as part of <a href="https://www.sutd.edu.sg/innovation/davincisutd/mentorship-programmes/research-mentorship-programme/">SUTD's Research Mentorship Programme</a>, where I applied to work with <a href="https://www.sutd.edu.sg/profile/immanuel-koh">Prof Immanuel Koh</a> from SUTD's Architecture and Sustainable Design (ASD) Pillar. We were assigned to develop a system to semantically segment features of HDB buildings, based off real buildings in a classified set. We finetuned models to conduct the semantic segmentation, and tested our systems against various different sample sets.
                </p>
            </>,
            awards: [],
            links: [
                {
                    link: "/papers/embodied_ai.pdf",
                    text: "pdf",
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
                    text: "pdf",
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
                            <div className="max-w-2xl text-muted-foreground mb-8 space-y-4">
                                {researchProjects[selectedProject].description}
                            </div>
                            {/* <div className="flex flex-wrap gap-2">
                                {researchProjects[selectedProject].awards.map((award, index) => (
                                    <Badge key={index} variant="secondary">{award}</Badge>
                                ))}
                            </div> */}
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

