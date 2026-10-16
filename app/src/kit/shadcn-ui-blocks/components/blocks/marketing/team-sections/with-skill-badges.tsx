import { SiGithub } from '@icons-pack/react-simple-icons';

import { Linkedin, Twitter } from '../../../ui/brand-icons';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'Leading innovation and strategic growth initiatives.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['Leadership', 'Strategy', 'Innovation', 'Product Vision'],
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'Creating beautiful and intuitive user experiences.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
  },
  {
    name: 'Ebele Egbuna',
    role: 'Lead Developer',
    bio: 'Building scalable and maintainable applications.',
    image:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['React', 'Node.js', 'TypeScript', 'Cloud Architecture'],
  },
];

export default function WithSkillBadges() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Meet our experts
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          The skilled professionals behind our success
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card key={member.name} className="group relative pt-0">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="border-background ring-primary/10 size-32 rounded-full border-4 ring-4">
                    <img
                      className="rounded-full"
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 flex justify-center gap-2">
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
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}
