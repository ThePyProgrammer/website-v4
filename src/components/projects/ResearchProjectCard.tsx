import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ResearchProject } from '@/types/project';

export function ResearchProjectCard({ index, project, selected, onClick, otherSelected }: { index: number, project: ResearchProject, selected: boolean, onClick: () => void, otherSelected: boolean }) {
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