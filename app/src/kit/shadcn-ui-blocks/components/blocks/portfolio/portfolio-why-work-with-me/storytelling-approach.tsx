import { ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';

// Sample core values data
const coreValues = [
  {
    id: 1,
    title: 'Craftsmanship',
    description:
      'I believe in attention to detail and taking pride in every project I undertake.',
  },
  {
    id: 2,
    title: 'Transparency',
    description:
      'Open communication and honest feedback are essential to successful collaborations.',
  },
  {
    id: 3,
    title: 'Innovation',
    description:
      'I constantly explore new technologies and approaches to deliver cutting-edge solutions.',
  },
  {
    id: 4,
    title: 'Partnership',
    description:
      'I view clients as partners in a shared journey toward achieving their goals.',
  },
];

export default function StorytellingApproach() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            My Story
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Work With Me
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Understanding my background, values, and approach to client projects
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Left column with image */}
            <div>
              <div className="relative mb-6 aspect-square overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                  alt="Portrait photo"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-4xl font-bold">7+</p>
                  <p className="text-muted-foreground text-sm">
                    Years Experience
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-4xl font-bold">100+</p>
                  <p className="text-muted-foreground text-sm">
                    Projects Completed
                  </p>
                </div>
              </div>
            </div>

            {/* Right column with story text */}
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 text-2xl font-semibold">My Journey</h3>
              <div className="space-y-4">
                <p>
                  My path to becoming a freelance professional began over seven
                  years ago when I discovered my passion for creating digital
                  solutions that solve real problems. What started as a
                  curiosity evolved into a career built on continuous learning
                  and client success.
                </p>
                <p>
                  After working with agencies and large teams, I made the
                  decision to go independent to focus on what I love most:
                  working closely with clients to bring their visions to life
                  without the constraints of corporate processes.
                </p>
                <p>
                  Today, I combine technical expertise with a deep understanding
                  of user needs and business goals. This holistic approach
                  allows me to deliver solutions that not only look great but
                  also drive measurable results for my clients.
                </p>
              </div>

              <h3 className="mt-8 mb-4 text-2xl font-semibold">
                Philosophy & Approach
              </h3>
              <p className="mb-6">
                I believe that the best work comes from true collaboration. My
                approach centers on understanding your business deeply,
                communicating clearly throughout the process, and crafting
                solutions that exceed expectations. Every project is an
                opportunity to create something meaningful that delivers value
                long after launch.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <h3 className="mb-8 text-center text-2xl font-semibold">
              Core Values That Guide My Work
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {coreValues.map((value) => (
                <Card key={value.id}>
                  <CardContent>
                    <h4 className="mb-2 text-xl font-medium">{value.title}</h4>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Start a conversation</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
