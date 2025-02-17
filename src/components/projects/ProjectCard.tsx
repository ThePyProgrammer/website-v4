import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/types/project"
import { Badge } from "../ui/badge"
import { ExternalLink } from "lucide-react"

export function ProjectCard({ project, index, total }: { project: Project, index: number, total: number }) {
  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="tracking-widest font-bold absolute top-5 right-5 text-md">
            {/* {project.date.toUpperCase()} */}
            { `${index+1}/${total}` }
        </div>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
            {project.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 w-full">
            <h3 className="text-xl font-semibold">Project Details</h3>
            <p className="text-muted-foreground">{project.description}</p>
            {(project.technologies.length) && (
                // <>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary">{tech}</Badge>
                        ))}
                    </div>
                // </>
            )}
            {project.link && (
              <div>
                {/* <h4 className="font-semibold">Project Link:</h4> */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm hover:underline"
                >
                  View Project<ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            )}
          </div>
          <div className="space-y-4 max-w-lg mx-auto md:mr-0 md:ml-auto">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="rounded-lg object-cover object-top w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

