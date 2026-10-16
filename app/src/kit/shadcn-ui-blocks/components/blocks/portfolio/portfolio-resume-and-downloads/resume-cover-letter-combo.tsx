import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Download, FileText, FileCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';

export default function ResumeCoverLetterCombo() {
  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Professional Documents
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Download my professional documents to learn more about my skills,
            experience, and approach to work.
          </p>
        </div>

        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="resume" className="flex-1">
              Resume
            </TabsTrigger>
            <TabsTrigger value="coverletter" className="flex-1">
              Cover Letter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary h-5 w-5" />
                  Resume
                </CardTitle>
                <CardDescription>
                  A comprehensive overview of my professional experience,
                  education, skills and achievements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                      <h3 className="text-base font-medium">
                        Professional Resume
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        PDF, 1.2 MB • Updated Apr 2023
                      </p>
                    </div>
                    <Button asChild className="w-fit">
                      <a href="#">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                      <h3 className="text-base font-medium">
                        ATS-Friendly Resume
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        DOCX, 850 KB • Updated Apr 2023
                      </p>
                    </div>
                    <Button asChild variant="outline" className="w-fit">
                      <a href="#">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="text-muted-foreground bg-muted/50 rounded-lg p-4 text-sm">
                    <p className="flex items-start">
                      <FileCheck className="text-primary mt-0.5 mr-2 h-4 w-4" />
                      My resume highlights key accomplishments, relevant
                      experience, and technical skills tailored to the industry.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coverletter">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary h-5 w-5" />
                  Cover Letter
                </CardTitle>
                <CardDescription>
                  A personalized introduction that complements my resume and
                  explains my passion for the work I do.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                      <h3 className="text-base font-medium">
                        General Cover Letter
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        PDF, 450 KB • Updated Apr 2023
                      </p>
                    </div>
                    <Button asChild className="w-fit">
                      <a href="#">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                      <h3 className="text-base font-medium">
                        Editable Cover Letter Template
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        DOCX, 380 KB • Updated Apr 2023
                      </p>
                    </div>
                    <Button asChild variant="outline" className="w-fit">
                      <a href="#">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="text-muted-foreground bg-muted/50 rounded-lg p-4 text-sm">
                    <p className="flex items-start">
                      <FileCheck className="text-primary mt-0.5 mr-2 h-4 w-4" />
                      The editable version allows you to customize sections for
                      specific positions while maintaining professional
                      formatting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4 text-sm">
            Need a customized resume or cover letter for a specific opportunity?
          </p>
          <Button asChild variant="outline">
            <a href="#">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
