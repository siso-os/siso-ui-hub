import { SiGithub } from '@icons-pack/react-simple-icons';

import { Linkedin, Twitter } from '../../../ui/brand-icons';
import { Button } from '../../../ui/button';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'David has been in the tech industry for over 12 years, founding multiple successful startups. His vision and leadership have been instrumental in our growth.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'With a background in psychology and design, Amil brings a unique perspective to our product development process, ensuring our solutions are both beautiful and functional.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
  },
];

export default function AlternatingSections() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Leadership team
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          Meet the people shaping our future
        </p>
      </div>
      {/* End Title */}

      {/* Alternating Sections */}
      <div className="space-y-24">
        {team.map((member, index) => (
          <div
            key={member.name}
            className="grid items-center gap-8 md:grid-cols-2 lg:gap-12"
          >
            <div
              className={`relative ${index % 2 === 1 ? 'md:order-last' : ''}`}
            >
              <div className="relative aspect-[4/3]">
                <img
                  className="rounded-xl object-cover"
                  src={member.image}
                  alt={member.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Background Pattern */}
              <div
                className={`absolute -z-10 size-48 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] ${
                  index % 2 === 1 ? '-bottom-6 -left-6' : '-right-6 -bottom-6'
                }`}
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground mt-1 text-lg">
                  {member.role}
                </p>
              </div>

              <p className="text-muted-foreground">{member.bio}</p>

              <div className="flex gap-2">
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
        ))}
      </div>
      {/* End Alternating Sections */}
    </div>
  );
}
