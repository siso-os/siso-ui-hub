import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { cn } from '@/arc-shims/kit-utils';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Code,
  Download,
  Fingerprint,
  Layers,
  Palette,
  Sparkles,
} from 'lucide-react';

import { useState } from 'react';

// Timeline data
const timelineEvents = [
  {
    id: 1,
    year: '2021',
    title: 'Senior Full Stack Developer',
    subtitle: 'TechVision Labs',
    description:
      'Leading development of cloud-based enterprise applications for financial services clients',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    category: 'work',
  },
  {
    id: 2,
    year: '2020',
    title: 'AWS Solutions Architect Certification',
    subtitle: 'Amazon Web Services',
    description:
      'Deepened cloud architecture expertise and implemented solution architecture for enterprise systems',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'education',
  },
  {
    id: 3,
    year: '2018',
    title: 'Frontend Developer',
    subtitle: 'DataSphere Inc.',
    description:
      'Created interactive data visualizations and responsive interfaces for business intelligence platform',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    category: 'work',
  },
  {
    id: 4,
    year: '2016',
    title: 'Full Stack Development Bootcamp',
    subtitle: 'Tech Academy',
    description:
      'Intensive 16-week program focused on modern JavaScript frameworks and backend technologies',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'education',
  },
  {
    id: 5,
    year: '2014',
    title: 'Junior Web Developer',
    subtitle: 'Creative Digital Agency',
    description:
      'Built responsive websites and CMS implementations for small businesses and startups',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    category: 'work',
  },
  {
    id: 6,
    year: '2012',
    title: 'B.S. Computer Science',
    subtitle: 'University of California, Berkeley',
    description:
      'Graduated with honors, specializing in software engineering and human-computer interaction',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'education',
  },
];

// Skills by category
const skillsCategories = [
  {
    id: 'development',
    name: 'Development',
    icon: <Code className="h-5 w-5 text-blue-500" />,
    skills: [
      { name: 'JavaScript/TypeScript', level: 90 },
      { name: 'React & React Native', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Next.js', level: 90 },
      { name: 'GraphQL & REST APIs', level: 85 },
      { name: 'Testing & CI/CD', level: 75 },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    icon: <Palette className="h-5 w-5 text-purple-500" />,
    skills: [
      { name: 'UI/UX Design', level: 80 },
      { name: 'Figma & Adobe XD', level: 85 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Design Systems', level: 75 },
      { name: 'Wireframing', level: 85 },
      { name: 'Visual Hierarchy', level: 80 },
    ],
  },
  {
    id: 'architecture',
    name: 'Architecture',
    icon: <Layers className="h-5 w-5 text-orange-500" />,
    skills: [
      { name: 'System Design', level: 80 },
      { name: 'Cloud Services (AWS)', level: 85 },
      { name: 'Microservices', level: 75 },
      { name: 'Database Design', level: 80 },
      { name: 'Security Practices', level: 70 },
      { name: 'Scalability Patterns', level: 75 },
    ],
  },
];

// Function to get level label
function getSkillLevelLabel(level: number) {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 70) return 'Proficient';
  if (level >= 50) return 'Intermediate';
  return 'Beginner';
}

// Function to get color class based on level
function getSkillColorClass(level: number) {
  if (level >= 90) return 'bg-green-500';
  if (level >= 80) return 'bg-blue-500';
  if (level >= 70) return 'bg-indigo-500';
  if (level >= 60) return 'bg-amber-500';
  return 'bg-slate-500';
}

export default function TimelineCategorySkills() {
  const [activeCategory, setActiveCategory] = useState('development');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            Journey & Expertise
          </Badge>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Path & Skills
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Explore my professional journey and the skills I&apos;ve developed
            along the way
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Timeline Column */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Fingerprint className="text-primary h-5 w-5" />
              <h3 className="text-2xl font-bold">Career Journey</h3>
            </div>

            {/* Vertical Timeline */}
            <div className="border-primary/20 relative ml-[50px] border-l-2 pt-2 pl-6">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative mb-12 last:mb-0 ${index === 0 ? 'pt-0' : 'pt-2'}`}
                >
                  {/* Timeline node */}
                  <div
                    className={cn(
                      'border-background absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full border-2',
                      event.category === 'work' ? 'bg-blue-500' : 'bg-amber-500'
                    )}
                  >
                    {event.icon}
                  </div>

                  {/* Year badge */}
                  <div className="absolute -top-2 -left-[30px] -translate-x-full">
                    <Badge
                      variant="outline"
                      className={cn(
                        'font-mono text-xs',
                        event.category === 'work'
                          ? 'border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
                          : 'border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                      )}
                    >
                      {event.year}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="group bg-card hover:border-primary/50 rounded-lg border p-4 shadow-sm transition-all hover:shadow-md">
                    <h4 className="text-lg font-semibold">{event.title}</h4>
                    <p className="text-primary text-sm font-medium">
                      {event.subtitle}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Column */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              <h3 className="text-2xl font-bold">Skills by Category</h3>
            </div>

            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="mb-6 grid w-full grid-cols-3">
                {skillsCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillsCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="bg-card space-y-4 rounded-lg border p-6"
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <h4 className="text-lg font-semibold">
                      {category.name} Skills
                    </h4>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {category.id === 'development' &&
                      "Technical programming skills I've mastered through various projects and roles."}
                    {category.id === 'design' &&
                      "Design and visual communication skills I've developed to create engaging interfaces."}
                    {category.id === 'architecture' &&
                      'System architecture and planning skills for creating scalable applications.'}
                  </p>

                  <div className="mt-6 space-y-5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {getSkillLevelLabel(skill.level)}
                          </Badge>
                        </div>
                        <Progress
                          value={skill.level}
                          className={cn(
                            'h-2.5',
                            getSkillColorClass(skill.level),
                            hoveredSkill === skill.name ? 'animate-pulse' : ''
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="gap-2">
            <a href="#contact">
              Contact Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <a href="#" download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
