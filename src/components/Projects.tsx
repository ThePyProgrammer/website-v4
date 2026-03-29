import { motion } from 'framer-motion';
import { ProjectCard } from './projects/ProjectCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { projects } from '@/data/projects';

export function Projects() {
  return (
    <section id="projects" className="bg-muted/50 pb-20">
      <div className="container px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8 text-left"
        >
          <h2 className="text-3xl sm:text-4xl">(other) featured projects</h2>
        </motion.div>

        <div className="w-full max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index}>
                  <ProjectCard project={project} index={index} total={projects.length} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
