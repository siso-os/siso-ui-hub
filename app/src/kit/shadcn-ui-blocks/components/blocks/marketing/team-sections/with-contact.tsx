import { Mail, Phone, MapPin } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { Linkedin, Twitter } from '../../../ui/brand-icons';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'Available for strategic partnerships and speaking engagements.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    contact: {
      email: 'david@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
    },
    availability: 'Available for meetings',
    status: 'active',
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'Open to freelance projects and consulting.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    contact: {
      email: 'amil@example.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
    },
    availability: 'Available next month',
    status: 'busy',
  },
];

export default function WithContact() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Get in touch
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          Connect with our team members
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {team.map((member) => (
          <Card key={member.name} className="p-0">
            <CardContent className="!p-6">
              <div className="flex gap-6">
                <div className="relative shrink-0">
                  <img
                    className="size-24 rounded-xl object-cover"
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                  />
                  <span
                    className={`border-background absolute -top-2 -right-2 size-4 rounded-full border-2 ${
                      member.status === 'active'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-4">
                    <h3 className="truncate text-lg font-medium">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                    <p className="text-sm font-medium">{member.availability}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t pt-6">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Mail className="size-4" />
                  {member.contact.email}
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Phone className="size-4" />
                  {member.contact.phone}
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="size-4" />
                  {member.contact.location}
                </div>
              </div>

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
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}
