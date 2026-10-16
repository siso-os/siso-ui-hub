import { Button } from '../../../ui/button';
import { Download, Mail, ArrowRight } from 'lucide-react';

export default function ResumeDownload() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Resume Download Section */}
        <div className="bg-card flex flex-col overflow-hidden rounded-xl border md:flex-row">
          {/* Resume Preview */}
          <div className="relative w-full md:w-2/5">
            <div className="aspect-[3/4] md:h-full md:min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Resume Preview"
                className="object-cover"
              />
              <div className="bg-foreground/40 dark:bg-background/40 absolute inset-0 backdrop-blur-sm"></div>

              {/* Overlay content */}
              <div className="text-foreground absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h2 className="dark:text-foreground text-background text-3xl font-bold">
                  Resume
                </h2>
                <p className="dark:text-foreground/90 text-background/90 mt-2 mb-4 max-w-xs">
                  Download my resume to learn more about my experience,
                  education, and qualifications.
                </p>
                <Button variant="default" size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Resume Information */}
          <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12">
            <h2 className="text-2xl font-bold md:text-3xl">
              Hire Me For Your Next Project
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              I&apos;m currently available for freelance projects, full-time
              positions, or consulting opportunities. Let&apos;s discuss how I
              can contribute to your team.
            </p>

            {/* Highlights */}
            <div className="my-6 grid gap-4 md:grid-cols-2">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold">Experience</h3>
                <p className="text-muted-foreground text-sm">
                  8+ years in full stack development with expertise in modern
                  web technologies.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold">Education</h3>
                <p className="text-muted-foreground text-sm">
                  B.S. Computer Science, Stanford University with specialization
                  in software engineering.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold">Industries</h3>
                <p className="text-muted-foreground text-sm">
                  Experience in fintech, healthcare, e-commerce, and enterprise
                  software solutions.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold">Services</h3>
                <p className="text-muted-foreground text-sm">
                  Web & mobile development, UI/UX design, system architecture,
                  technical consultation.
                </p>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button className="gap-2" asChild>
                <a href="#" download>
                  Download Resume
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <a href="#contact">
                  Contact Me
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 flex flex-col justify-between rounded-lg border p-6 sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold">Need more information?</h3>
            <p className="text-muted-foreground">
              Feel free to contact me directly for a more detailed resume or
              portfolio.
            </p>
          </div>
          <Button
            variant="secondary"
            className="gap-2 whitespace-nowrap"
            asChild
          >
            <a href="mailto:hello@example.com">
              <Mail className="h-4 w-4" />
              hello@example.com
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
