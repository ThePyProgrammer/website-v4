import { ResearchProject } from '@/types/project';

export const researchProjects: ResearchProject[] = [
    {
        codename: "walledeval",
        title: <span><b>WalledEval</b>: Safety Evaluation Toolkit for LLMs</span>,
        subtitle: <span>Developed a comprehensive and publicly-available Python library <code>walledeval</code> for LLM safety evaluation. Supported various LLMs, datasets, templates and judges.</span>,
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
        awards: [
            "Singapore Science and Engineering Fair (SSEF) 2021 and 2023, **Gold Award**",
            "International Student Science Fair (ISSF) 2023, **1st Place in CS Category**",
            "Global Youth Science and Technology Bowl (GYSTB) 2021, **Third Prize**",
            "Accepted in IRC Conf on Science, Engineering and Tech (IRC-SET) 2021, **Best Presenters' Award**",
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
    },
    {
        codename: "atcSpeech",
        title: <span>Adapting Automatic Speech Recognition for Accented Air Traffic Control Communications</span>,
        subtitle: <span>We developed and fine-tuned ASR models for Southeast Asian-accented ATC speech using a new dataset, achieving a 9.82% WER. Work done at RSAF RAiD.</span>,
        awards: [],
        links: [
            {
                link: "https://arxiv.org/pdf/2502.20311",
                text: "pdf",
                icon: "/img/research/logos/arxiv.png"
            },
        ],
        timeline: "Nov 2024 - Jan 2025",
        cover: "/img/research/atcspeech-cover.jpg",
        imgs: []
    }
];
