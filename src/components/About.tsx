import { motion } from 'framer-motion';
// import { Brain, Heart, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function About() {
  const links = [
    {
      link: "mailto:prannayagupta@programmer.net",
      icon: <Mail className="h-5 w-5" />,
      text: "prannayagupta@programmer.net"
    },
    {
      link: "https://github.com/ThePyProgrammer",
      icon: <Github className="h-5 w-5" />,
      text: "github.com/ThePyProgrammer"
    },
    {
      link: "https://www.linkedin.com/in/prannaya-gupta",
      icon: <Linkedin className="h-5 w-5" />,
      text: "linkedin.com/in/prannaya-gupta"
    },
    {
      link: "https://x.com/PrannayaG",
      icon: <Twitter className="h-5 w-5" />,
      text: "x.com/PrannayaG"
    },
    {
      link: "/cv.pdf",
      icon: <FileText className="h-5 w-5" />,
      text: "My Resume"
    }
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-left"
        >
          <h2 className="mb-4 text-3xl sm:text-4xl">about me</h2>

          <div className="mx-auto grid max-w-4xl gap-24 lg:grid-cols-2">
            <div className="max-w-2xl text-muted-foreground mb-8">
              <p className="mb-4">
                I am a recent graduate of the <a href="https://www.nushigh.edu.sg/">NUS High School of Math and Science</a>.

                I am currently serving National Service at the <a href="https://rsaf-agile-inno-digital.defence.gov.sg/">RSAF Agile Innovation Digital (RAiD)</a> as an AI Engineer.

                I also currently serve as the Youth Community Lead at <a href="https://better.sg/">better.sg</a>, as part of the larger volunteer-composed executive committee.
              
              </p>
              <p>
                I have previously conducted research at <a href="https://github.com/walledai">Walled AI Labs</a> as a volunteer research assistant while serving my NS obligations.

                I also served as the Overall-in-Charge at <a href="https://buildingblocs.sg/">BuildingBloCS</a> in 2023. I also served as the president of NUS High's computing club, <a href="https://nush.app/">AppVenture</a> in 2023.
              </p>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Find me via...</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      target="_blank" rel="noreferrer" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>

          </div>


        </motion.div>
      </div>
    </section>
  );
}

// function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="group rounded-lg border bg-card p-6 shadow-lg transition-all hover:shadow-xl"
//     >
//       <div className="mb-4 flex justify-center text-primary">
//         <div className="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
//           {icon}
//         </div>
//       </div>
//       <h3 className="mb-2 text-center text-xl font-semibold">{title}</h3>
//       <p className="text-center text-sm text-muted-foreground">{description}</p>
//     </motion.div>
//   );
// }