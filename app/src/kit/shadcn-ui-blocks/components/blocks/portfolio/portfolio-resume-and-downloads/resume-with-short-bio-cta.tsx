import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Download, ArrowRight, FileText } from 'lucide-react';
import { Separator } from '../../../ui/separator';

export default function ResumeWithShortBioCta() {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-card overflow-hidden border shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Biography Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FileText className="text-primary h-8 w-8" />
                  <h2 className="text-3xl font-bold">My Resume</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  A seasoned professional with over 8 years of industry
                  experience, specializing in creative problem-solving and
                  strategic implementation. My background combines technical
                  expertise with strong communication skills to deliver
                  exceptional results across diverse projects.
                </p>

                <h3 className="text-xl font-semibold">Key Skills Include:</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li className="leading-normal">
                    Strategic planning and execution
                  </li>
                  <li className="leading-normal">
                    Cross-functional team leadership
                  </li>
                  <li className="leading-normal">
                    Client relationship management
                  </li>
                  <li className="leading-normal">
                    Advanced technical proficiency
                  </li>
                </ul>

                <div className="pt-4">
                  <Button asChild className="group">
                    <a href="#">
                      Let&apos;s work together
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Download Column */}
              <div className="bg-muted flex flex-col justify-between space-y-6 rounded-lg p-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Download Options
                  </h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Choose the format that works best for you. All documents
                    have been professionally formatted and optimized.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-background flex flex-col gap-3 rounded-md p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="font-medium">Complete Resume</span>
                        <p className="text-muted-foreground text-xs">
                          PDF • 1.2 MB
                        </p>
                      </div>
                      <Button asChild size="sm" className="w-fit">
                        <a href="#">
                          <Download className="mr-1 h-4 w-4" />
                          PDF
                        </a>
                      </Button>
                    </div>

                    <div className="bg-background flex flex-col gap-3 rounded-md p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="font-medium">Resume (Editable)</span>
                        <p className="text-muted-foreground text-xs">
                          DOCX • 850 KB
                        </p>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="w-fit"
                      >
                        <a href="#">
                          <Download className="mr-1 h-4 w-4" />
                          DOCX
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Separator className="my-6" />
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                      Last updated: April 2023
                    </p>
                    <Button asChild variant="ghost" size="sm">
                      <a href="#">View Online</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
