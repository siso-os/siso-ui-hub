import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';

import { Sparkles } from 'lucide-react';

// Sample education data
const education = [
  {
    id: 1,
    degree: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop',
    years: '2012 - 2014',
    description:
      "Specialized in Machine Learning and Distributed Systems. Thesis on 'Optimizing Resource Allocation in Cloud Computing Environments'.",
    achievements: [
      'GPA: 3.92/4.0',
      'Graduate Teaching Assistant for Advanced Algorithms',
      'Stanford AI Lab Research Assistant',
    ],
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'University of California, Berkeley',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1171&auto=format&fit=crop',
    years: '2008 - 2012',
    description:
      'Strong focus on software architecture and development methodologies. Minor in Business Administration.',
    achievements: [
      "Dean's List (8 semesters)",
      'Capstone Project: Real-time Collaborative Code Editor',
      'ACM Programming Team Captain',
    ],
  },
];

// Sample certification data
const certifications = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1172&auto=format&fit=crop',
    year: '2023',
    credentialId: 'AWS-PSA-00123456',
    skills: [
      'Cloud Architecture',
      'Serverless',
      'AWS Services',
      'Cloud Security',
    ],
  },
  {
    id: 2,
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1034&auto=format&fit=crop',
    year: '2022',
    credentialId: 'CKA-1234-5678-9012',
    skills: ['Kubernetes', 'Container Orchestration', 'DevOps', 'Cloud Native'],
  },
  {
    id: 3,
    name: 'Machine Learning Engineering Certification',
    issuer: 'Google Cloud',
    logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1170&auto=format&fit=crop',
    year: '2021',
    credentialId: 'GCP-ML-ENG-12345',
    skills: ['Machine Learning', 'TensorFlow', 'Data Analysis', 'AI Systems'],
  },
  {
    id: 4,
    name: 'Certified Scrum Master (CSM)',
    issuer: 'Scrum Alliance',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop',
    year: '2020',
    credentialId: 'CSM-123456',
    skills: [
      'Agile Methodologies',
      'Team Leadership',
      'Project Management',
      'Sprint Planning',
    ],
  },
];

export default function EducationCertifications() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            Credentials
          </Badge>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Education & Certifications
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            My academic background and professional credentials that have shaped
            my expertise and technical knowledge in the field.
          </p>
        </div>

        {/* Education Section */}
        <div className="mb-20">
          <h3 className="mb-8 flex items-center justify-center gap-2 text-2xl font-bold">
            <Sparkles className="text-primary h-5 w-5" />
            <span>Academic Background</span>
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {education.map((item) => (
              <div
                key={item.id}
                className="bg-card overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-black/10"></div>
                  <img
                    src={item.logo}
                    alt={item.institution}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 z-20 p-4 text-white">
                    <div className="text-sm font-medium">{item.years}</div>
                    <h4 className="text-xl font-bold">{item.degree}</h4>
                    <p className="text-sm text-white/80">{item.institution}</p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>

                  <h5 className="text-primary mb-2 text-sm font-medium uppercase">
                    Highlights
                  </h5>
                  <ul className="space-y-1 text-sm">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="mb-8 flex flex-col items-center justify-center gap-2 text-2xl font-bold">
            <Badge className="mb-1 h-5 px-2 py-0.5 sm:mb-0">Professional</Badge>
            <span>Certifications & Training</span>
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group bg-card relative overflow-hidden rounded-lg border p-4 transition-all hover:shadow-md"
              >
                <div className="xs:flex-row flex flex-col items-start gap-3">
                  <div className="bg-muted xs:mb-0 relative mb-2 h-20 w-full shrink-0 overflow-hidden rounded-md">
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="object-cover"
                    />
                  </div>
                  <div className="">
                    <h4 className="leading-tight font-semibold">{cert.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {cert.issuer}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-y-1 text-xs">
                      <Badge variant="secondary" className="mr-2">
                        {cert.year}
                      </Badge>
                      <span className="text-muted-foreground">
                        ID: {cert.credentialId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuing Education Banner */}
        <div className="bg-muted mt-16 rounded-xl p-6 text-center">
          <h4 className="text-xl font-semibold">Continuous Learner</h4>
          <p className="text-muted-foreground mx-auto mt-2 max-w-2xl text-sm">
            I regularly participate in workshops, conferences, and online
            courses to stay current with emerging technologies and best
            practices in software development.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <a href="#contact">Let&apos;s Connect and Learn Together</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
