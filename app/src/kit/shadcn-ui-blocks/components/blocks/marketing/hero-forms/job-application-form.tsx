import { useState } from 'react';

import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Checkbox } from '../../../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  FileIcon,
  UploadIcon,
  XIcon,
  CheckIcon,
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
  ClockIcon,
} from 'lucide-react';

export default function HeroFormJobApplication() {
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0]);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
  };

  const removeCoverLetter = () => {
    setCoverLetterFile(null);
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="bg-grid-slate-100 dark:bg-grid-slate-800/10 absolute inset-0 bg-[size:40px_40px] opacity-20"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                <BriefcaseIcon className="mr-1 h-4 w-4" />
                Career Opportunity
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
                Senior Product Designer
              </h1>

              <div className="my-6 flex flex-wrap gap-4">
                <div className="text-muted-foreground flex items-center text-sm">
                  <BuildingIcon className="mr-1 h-4 w-4" />
                  <span>Design Team</span>
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                  <MapPinIcon className="mr-1 h-4 w-4" />
                  <span>San Francisco, CA (Remote Available)</span>
                </div>
                <div className="text-muted-foreground flex items-center text-sm">
                  <ClockIcon className="mr-1 h-4 w-4" />
                  <span>Full-time</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 text-xl">
                Join our growing design team and help shape the future of our
                product. We&apos;re looking for a talented designer with a
                passion for creating exceptional user experiences.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <h2 className="mb-3 text-xl font-semibold">
                    What you&apos;ll do
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>
                        Lead design efforts across multiple product areas
                      </span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>
                        Collaborate with product managers and engineers to
                        define and implement solutions
                      </span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>
                        Create user flows, wireframes, prototypes, and
                        high-fidelity designs
                      </span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Conduct user research and usability testing</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold">Requirements</h2>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>5+ years of experience in product design</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>
                        Strong portfolio demonstrating UI/UX expertise
                      </span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>
                        Proficiency with modern design tools (Figma, Adobe XD)
                      </span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>
                        Excellent communication and collaboration skills
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-xl font-semibold">Benefits</h2>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Competitive salary and equity package</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>
                        Comprehensive health, dental, and vision insurance
                      </span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Flexible PTO policy and remote work options</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">•</span>
                      <span>Professional development budget</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:sticky lg:top-10">
              <div className="bg-background rounded-xl border p-8 shadow-lg">
                {!submitted ? (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Apply Now</h2>
                      <div className="text-muted-foreground text-sm">
                        Step {step} of {totalSteps}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                      <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full transition-all duration-300"
                          style={{ width: `${(step / totalSteps) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="mb-2">
                              First name
                            </Label>
                            <Input id="firstName" placeholder="John" required />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="mb-2">
                              Last name
                            </Label>
                            <Input id="lastName" placeholder="Doe" required />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="mb-2">
                            Email address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="mb-2">
                            Phone number
                          </Label>
                          <Input
                            id="phone"
                            placeholder="+1 (555) 000-0000"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="location" className="mb-2">
                            Current location
                          </Label>
                          <Input id="location" placeholder="City, State" />
                        </div>

                        <div>
                          <Label htmlFor="linkedIn" className="mb-2">
                            LinkedIn profile (optional)
                          </Label>
                          <Input
                            id="linkedIn"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>

                        <div>
                          <Label htmlFor="portfolio" className="mb-2">
                            Portfolio URL (optional)
                          </Label>
                          <Input
                            id="portfolio"
                            placeholder="https://yourportfolio.com"
                          />
                        </div>

                        <Button onClick={handleNext} className="w-full">
                          Continue
                        </Button>
                      </div>
                    )}

                    {/* Step 2: Experience & Files */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <h3 className="text-lg font-semibold">
                          Experience & Documents
                        </h3>

                        <div>
                          <Label htmlFor="experience" className="mb-2">
                            Years of experience
                          </Label>
                          <Select>
                            <SelectTrigger id="experience">
                              <SelectValue placeholder="Select years of experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-2">1-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-7">5-7 years</SelectItem>
                              <SelectItem value="8-10">8-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="education" className="mb-2">
                            Highest education
                          </Label>
                          <Select>
                            <SelectTrigger id="education">
                              <SelectValue placeholder="Select education" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high-school">
                                High School
                              </SelectItem>
                              <SelectItem value="associates">
                                Associate&apos;s Degree
                              </SelectItem>
                              <SelectItem value="bachelors">
                                Bachelor&apos;s Degree
                              </SelectItem>
                              <SelectItem value="masters">
                                Master&apos;s Degree
                              </SelectItem>
                              <SelectItem value="doctorate">
                                Doctorate
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="mb-2">Resume/CV</Label>
                          <div className="mt-1.5">
                            {!resumeFile ? (
                              <div className="hover:bg-muted/50 rounded-lg border-2 border-dashed p-6 text-center transition-colors">
                                <div className="flex flex-col items-center">
                                  <UploadIcon className="text-muted-foreground mb-2 h-8 w-8" />
                                  <Label
                                    htmlFor="resume-upload"
                                    className="text-primary cursor-pointer text-sm hover:underline"
                                  >
                                    Upload Resume
                                  </Label>
                                  <Input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleResumeChange}
                                  />
                                  <p className="text-muted-foreground mt-2 text-xs">
                                    PDF, DOC or DOCX (max 5MB)
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-muted/30 flex items-center justify-between rounded-lg p-3">
                                <div className="flex items-center">
                                  <FileIcon className="text-primary mr-2 h-5 w-5" />
                                  <span className="truncate text-sm">
                                    {resumeFile.name}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={removeResume}
                                  className="h-8 w-8"
                                >
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label className="mb-2">
                            Cover Letter (Optional)
                          </Label>
                          <div className="mt-1.5">
                            {!coverLetterFile ? (
                              <div className="hover:bg-muted/50 rounded-lg border-2 border-dashed p-6 text-center transition-colors">
                                <div className="flex flex-col items-center">
                                  <UploadIcon className="text-muted-foreground mb-2 h-8 w-8" />
                                  <Label
                                    htmlFor="cover-letter-upload"
                                    className="text-primary cursor-pointer text-sm hover:underline"
                                  >
                                    Upload Cover Letter
                                  </Label>
                                  <Input
                                    id="cover-letter-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleCoverLetterChange}
                                  />
                                  <p className="text-muted-foreground mt-2 text-xs">
                                    PDF, DOC or DOCX (max 5MB)
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-muted/30 flex items-center justify-between rounded-lg p-3">
                                <div className="flex items-center">
                                  <FileIcon className="text-primary mr-2 h-5 w-5" />
                                  <span className="truncate text-sm">
                                    {coverLetterFile.name}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={removeCoverLetter}
                                  className="h-8 w-8"
                                >
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button variant="outline" onClick={handleBack}>
                            Back
                          </Button>
                          <Button onClick={handleNext} disabled={!resumeFile}>
                            Continue
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Additional Information */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <h3 className="text-lg font-semibold">
                          Additional Information
                        </h3>

                        <div>
                          <Label htmlFor="startDate" className="mb-2">
                            When can you start?
                          </Label>
                          <Select>
                            <SelectTrigger id="startDate">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediately">
                                Immediately
                              </SelectItem>
                              <SelectItem value="two-weeks">
                                2 weeks notice
                              </SelectItem>
                              <SelectItem value="one-month">
                                1 month notice
                              </SelectItem>
                              <SelectItem value="custom">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="salary" className="mb-2">
                            Salary expectations (USD)
                          </Label>
                          <Input id="salary" placeholder="120,000" />
                        </div>

                        <div>
                          <Label htmlFor="whyJoin" className="mb-2">
                            Why do you want to join our team?
                          </Label>
                          <Textarea
                            id="whyJoin"
                            placeholder="Tell us why you're interested in this position..."
                            rows={4}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="mb-2">
                            How did you hear about this position?
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="linkedin">LinkedIn</SelectItem>
                              <SelectItem value="indeed">Indeed</SelectItem>
                              <SelectItem value="glassdoor">
                                Glassdoor
                              </SelectItem>
                              <SelectItem value="referral">
                                Employee Referral
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="mt-4 flex items-start space-x-2">
                          <Checkbox id="privacy" className="mt-1" />
                          <Label
                            htmlFor="privacy"
                            className="text-sm font-normal"
                          >
                            I agree to the{' '}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              privacy policy
                            </a>{' '}
                            and consent to having my personal data processed.
                          </Label>
                        </div>

                        <div className="flex justify-between pt-4">
                          <Button variant="outline" onClick={handleBack}>
                            Back
                          </Button>
                          <Button onClick={handleNext}>
                            Submit Application
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-8 w-8 text-green-600" />
                    </div>

                    <h2 className="mb-2 text-2xl font-bold">
                      Application Submitted!
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for applying for the Senior Product Designer
                      position. We&apos;ll review your application and get back
                      to you soon.
                    </p>

                    <div className="bg-muted/30 mb-6 rounded-lg p-6 text-left">
                      <h3 className="mb-2 font-medium">What happens next?</h3>
                      <ol className="text-muted-foreground list-inside list-decimal space-y-2 text-sm">
                        <li>
                          Our team will review your application (typically
                          within 2-3 business days)
                        </li>
                        <li>
                          If your qualifications match our needs, we&apos;ll
                          reach out to schedule a phone interview
                        </li>
                        <li>
                          Successful candidates will be invited for a remote
                          portfolio review
                        </li>
                        <li>
                          Final interviews with the design team and hiring
                          manager
                        </li>
                      </ol>
                    </div>

                    <Button className="w-full">View Other Openings</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
