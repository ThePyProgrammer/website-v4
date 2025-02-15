import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    title: 'AI-Powered Health Assistant',
    description: 'A virtual health assistant that uses AI to provide personalized health recommendations and monitor vital signs.',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2032&auto=format&fit=crop',
    tags: ['AI', 'Healthcare', 'React', 'Python'],
  },
  {
    title: 'Medical Image Analysis Platform',
    description: 'Deep learning platform for analyzing medical images and detecting anomalies with superhuman accuracy.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    tags: ['Machine Learning', 'Computer Vision', 'Python', 'TensorFlow'],
  },
  {
    title: 'Smart Patient Monitoring System',
    description: 'IoT-based system for real-time patient monitoring inspired by superhero tech.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
    tags: ['IoT', 'React', 'Node.js', 'MongoDB'],
  },
];

export function Projects() {
  return (
    <section id="projects" className="bg-muted/50 py-20">
      <div className="container px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-left"
        >
          <h2 className="mb-4 text-3xl sm:text-4xl">featured projects</h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, description, image, tags, index }: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}