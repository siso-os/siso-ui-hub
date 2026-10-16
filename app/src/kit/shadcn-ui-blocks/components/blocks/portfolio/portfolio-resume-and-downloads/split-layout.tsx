import { Button } from '../../../ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../../../ui/card';

export default function ResumePreviewDownload() {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            About Me & Resume
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Learn more about my background and download my resume to explore my
            professional journey.
          </p>
        </div>

        <Card className="overflow-hidden py-0">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
              {/* Profile Image */}
              <div className="relative h-full">
                <div className="h-full min-h-[300px] w-full md:min-h-[400px]">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
                    alt="Professional portrait"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* About Me & Download Section */}
              <div className="flex flex-col justify-center p-6 lg:p-10">
                <h3 className="mb-3 text-2xl font-semibold">
                  Hi, I&apos;m Sarah Wilson
                </h3>

                <div className="text-muted-foreground mb-6 space-y-3">
                  <p>
                    A creative designer with 8+ years of experience crafting
                    digital experiences that blend beauty with functionality.
                  </p>
                  <p>
                    I specialize in user-centered design approaches that
                    transform complex problems into elegant, intuitive
                    solutions.
                  </p>
                </div>

                <div className="mt-2 mb-8">
                  <Button
                    asChild
                    variant="link"
                    className="group text-primary -ml-4 p-0"
                  >
                    <a href="#">
                      Learn more about my process
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>

                <h4 className="mb-4 text-lg font-medium">Download My Resume</h4>
                <div className="space-y-4 space-x-4">
                  <Button asChild className="w-full sm:w-auto">
                    <a href="#">
                      <Download className="mr-2 h-4 w-4" />
                      PDF Format (1.4 MB)
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <a href="#">
                      <Download className="mr-2 h-4 w-4" />
                      Word Format (850 KB)
                    </a>
                  </Button>

                  <p className="text-muted-foreground mt-4 text-sm">
                    Last updated: April 2023 •
                    <a href="#" className="text-primary ml-1 hover:underline">
                      Request custom information
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
