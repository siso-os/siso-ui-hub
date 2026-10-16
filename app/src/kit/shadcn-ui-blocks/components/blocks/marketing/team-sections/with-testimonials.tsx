import { Quote } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Linkedin, Twitter } from '../../../ui/brand-icons';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    testimonial:
      'Building great products with an amazing team is what drives me every day.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80',
    stats: {
      years: '12+',
      projects: '140+',
      clients: '50+',
    },
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    testimonial:
      "Design is not just what it looks like, it's how it works. I strive to make both perfect.",
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80',
    stats: {
      years: '8+',
      projects: '200+',
      awards: '15',
    },
  },
];

export default function WithTestimonials() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Meet our leadership
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          The talented individuals guiding our vision
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {team.map((member) => (
          <Card key={member.name} className="overflow-hidden p-0">
            <CardContent className="!p-0">
              <div className="grid sm:grid-cols-2">
                <div className="relative h-full">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={member.image}
                    alt={member.name}
                    width={320}
                    height={420}
                  />
                </div>
                <div className="p-6">
                  <div className="flex h-full flex-col">
                    <div>
                      <h3 className="text-lg font-medium">{member.name}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {member.role}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-6">
                      {Object.entries(member.stats).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-2xl font-semibold">{value}</p>
                          <p className="text-muted-foreground mt-1 text-xs capitalize">
                            {key}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-muted-foreground mt-4 border-l-2 pl-4 italic">
                      <Quote className="text-primary mb-2 size-4" />
                      {member.testimonial}
                    </blockquote>

                    <div className="mt-6 flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Twitter className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <SiGithub className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Linkedin className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}
