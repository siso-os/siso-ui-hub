import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';

// Sample project data with client quotes
const projects = [
  {
    id: 1,
    title: 'Enterprise Client Portal',
    category: 'Web Development',
    description:
      'Secure client portal with custom dashboards and document management for a financial services firm.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['React', 'Next.js', 'TypeScript', 'Prisma'],
    quote: {
      text: 'The client portal transformed how we interact with customers. Our document processing time decreased by 40% while client satisfaction scores increased by 35%.',
      author: 'Sarah Johnson',
      role: 'VP of Operations, Financial Services Inc.',
    },
    link: '#',
  },
  {
    id: 2,
    title: 'AI-Powered Recommendation Engine',
    category: 'Machine Learning',
    description:
      'Intelligent product recommendation engine built for an e-commerce platform using machine learning algorithms.',
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Python', 'TensorFlow', 'AWS', 'Node.js'],
    quote: {
      text: 'This recommendation engine completely changed our game. Customer engagement increased by 28% and our average order value went up by 22% within just three months of implementation.',
      author: 'Michael Chen',
      role: 'CTO, RetailPlus',
    },
    link: '#',
  },
  {
    id: 3,
    title: 'Healthcare Patient Management System',
    category: 'Full Stack Development',
    description:
      'Comprehensive patient management system designed for a network of healthcare clinics.',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    quote: {
      text: 'The system we built together not only streamlined our operations but also improved patient care. Our staff now spends 35% less time on administrative tasks and more time with patients.',
      author: 'Dr. Amelia Rivera',
      role: 'Medical Director, HealthFirst Clinics',
    },
    link: '#',
  },
  {
    id: 4,
    title: 'Mobile Fitness Tracking Platform',
    category: 'Mobile Development',
    description:
      'Cross-platform fitness application with personalized workout plans, nutrition tracking, and social features.',
    image:
      'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    quote: {
      text: 'Working on this fitness app challenged me to deeply understand user habits and motivation. The integration of social features with personalized fitness tracking created an experience that users truly connected with.',
      author: 'Personal Insight',
      role: 'Key Learning',
    },
    link: '#',
  },
  {
    id: 5,
    title: 'Supply Chain Optimization System',
    category: 'Data Engineering',
    description:
      'End-to-end supply chain visibility and optimization platform for manufacturing industry.',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Python', 'React', 'Docker', 'Kubernetes'],
    quote: {
      text: "This system revolutionized our supply chain operations. We've reduced inventory costs by 18% and decreased delivery times by 25%. I've never seen such a significant operational improvement from a single technology implementation.",
      author: 'Robert Williams',
      role: 'Supply Chain Director, ManufacturePro',
    },
    link: '#',
  },
  {
    id: 6,
    title: 'Blockchain Identity Verification',
    category: 'Blockchain Development',
    description:
      'Secure identity verification solution using blockchain technology for a fintech company.',
    image:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Ethereum', 'Solidity', 'React', 'Web3.js'],
    quote: {
      text: "The most challenging aspect of this project was balancing cutting-edge blockchain technology with user-friendly interfaces. Finding that balance taught me that technical innovation is only valuable when it's accessible to users.",
      author: 'Personal Insight',
      role: 'Technical Challenge',
    },
    link: '#',
  },
];

export default function PortfolioQuoteStack() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-16 text-center md:mb-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Projects & Perspectives
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            A showcase of my technical work paired with client testimonials and
            personal insights
          </p>
        </div>

        {/* Project grid with stacked images and quotes */}
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {/* Project image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Project title and category overlay */}
                <div className="absolute right-6 bottom-6 left-6">
                  <Badge
                    variant="secondary"
                    className="bg-primary/90 text-primary-foreground"
                  >
                    {project.category}
                  </Badge>
                  <h3 className="mt-2 text-2xl font-bold text-white drop-shadow-md">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Quote card - positioned overlapping the image */}
              <Card className="relative mx-4 -mt-20 border-2 shadow-lg">
                <CardContent>
                  <div className="mb-4 flex items-start gap-2">
                    <Quote className="text-primary h-6 w-6 shrink-0 -scale-x-100" />
                    <p className="text-muted-foreground italic">
                      &ldquo;{project.quote.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{project.quote.author}</p>
                      <p className="text-muted-foreground text-sm">
                        {project.quote.role}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      asChild
                    >
                      <a href={project.link}>
                        Details
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project details */}
              <div className="mt-6 px-4">
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
