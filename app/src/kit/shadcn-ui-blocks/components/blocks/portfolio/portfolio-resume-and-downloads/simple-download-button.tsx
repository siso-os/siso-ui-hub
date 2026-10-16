import { Button } from '../../../ui/button';
import { Download } from 'lucide-react';

export default function SimpleDownloadButton() {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Download My Resume
        </h2>
        <p className="text-muted-foreground mb-8">
          Feel free to download my resume to learn more about my skills and
          experience.
        </p>

        <Button asChild size="lg" className="group">
          <a href="#">
            <Download className="mr-2 h-5 w-5" />
            <span>Download CV (PDF, 1.2MB)</span>
          </a>
        </Button>
      </div>
    </section>
  );
}
