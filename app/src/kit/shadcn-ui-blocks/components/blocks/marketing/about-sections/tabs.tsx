import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  FolderOpen,
  Users,
  Briefcase,
  Award,
  ChevronRight,
} from 'lucide-react';

export default function AboutSectionTabs() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">About Our Company</h2>
        <p className="text-muted-foreground">
          Learn more about our company, our team, and what drives us to create
          exceptional experiences for our clients.
        </p>
      </div>

      <Tabs defaultValue="story" className="mx-auto max-w-4xl">
        <div className="mb-8 flex justify-center">
          <TabsList className="grid h-fit w-full max-w-2xl grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="story" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden md:inline">Our Story</span>
              <span className="md:hidden">Story</span>
            </TabsTrigger>
            <TabsTrigger value="mission" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden md:inline">Mission & Vision</span>
              <span className="md:hidden">Mission</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Our Team</span>
              <span className="md:hidden">Team</span>
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-2"
            >
              <Award className="h-4 w-4" />
              <span className="hidden md:inline">Achievements</span>
              <span className="md:hidden">Awards</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="story" className="space-y-6">
          <div className="bg-accent rounded-lg p-8">
            <h3 className="mb-4 text-2xl font-bold">Our Journey</h3>
            <div className="space-y-4">
              <p>
                Founded in 2010, our company began with a simple mission: to
                help businesses leverage technology to achieve their goals. What
                started as a small team of three passionate individuals has
                grown into a global organization.
              </p>
              <p>
                Over the years, we&apos;ve expanded our services, opened offices
                across multiple countries, and built a team of experts dedicated
                to delivering exceptional solutions. Through economic ups and
                downs, technological shifts, and changing market dynamics,
                we&apos;ve remained committed to our core values.
              </p>
              <div className="pt-4">
                <Button asChild variant="outline" className="gap-1">
                  <a href="#">
                    Read our full story
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mission" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-accent rounded-lg p-8">
              <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
              <p>
                To empower organizations with innovative technology solutions
                that drive growth, efficiency, and sustainable success. We are
                committed to understanding our clients&apos; unique challenges
                and delivering tailored solutions that exceed expectations.
              </p>
            </div>
            <div className="bg-accent rounded-lg p-8">
              <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
              <p>
                To be the leading technology partner for forward-thinking
                organizations, recognized for our expertise, integrity, and the
                measurable impact we create for our clients, employees, and
                communities.
              </p>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="mb-2 font-bold">Our Core Values</h4>
            <ul className="ml-5 grid list-disc grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <li>Excellence in everything we do</li>
              <li>Integrity and transparency</li>
              <li>Client-centered approach</li>
              <li>Innovation and continuous learning</li>
              <li>Collaboration and teamwork</li>
              <li>Social responsibility</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="bg-accent rounded-lg p-8">
            <h3 className="mb-4 text-2xl font-bold">Our Leadership Team</h3>
            <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-bold">Sarah Johnson</h4>
                <p className="text-primary text-sm">Chief Executive Officer</p>
                <p className="text-muted-foreground text-sm">
                  15+ years of industry experience. Previously led successful
                  startups in the tech sector.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold">David Chen</h4>
                <p className="text-primary text-sm">Chief Technology Officer</p>
                <p className="text-muted-foreground text-sm">
                  Former CTO at Fortune 500 company. Expert in emerging
                  technologies and system architecture.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold">Maria Rodriguez</h4>
                <p className="text-primary text-sm">Chief Operating Officer</p>
                <p className="text-muted-foreground text-sm">
                  20+ years experience in operations and process optimization
                  across multiple industries.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <Button asChild variant="outline" className="gap-1">
                <a href="#">
                  Meet our entire team
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="bg-accent rounded-lg p-8">
            <h3 className="mb-4 text-2xl font-bold">Our Achievements</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div className="bg-background rounded-lg p-4">
                  <p className="text-3xl font-bold">150+</p>
                  <p className="text-muted-foreground text-sm">
                    Industry Awards
                  </p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-3xl font-bold">5,000+</p>
                  <p className="text-muted-foreground text-sm">
                    Projects Completed
                  </p>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <p className="text-3xl font-bold">15,000+</p>
                  <p className="text-muted-foreground text-sm">Happy Clients</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold">Recent Recognition</h4>
                <ul className="grid grid-cols-1 gap-2">
                  <li className="flex items-start gap-2">
                    <Award className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        Best Technology Solution 2023
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Global Tech Awards
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Top Employer 2023</p>
                      <p className="text-muted-foreground text-sm">
                        Business Excellence Awards
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Innovation Leader 2022</p>
                      <p className="text-muted-foreground text-sm">
                        Industry Innovation Index
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
