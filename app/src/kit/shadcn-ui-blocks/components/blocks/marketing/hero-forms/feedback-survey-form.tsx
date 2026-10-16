import { useState } from 'react';

import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Star } from 'lucide-react';

export default function HeroFormFeedbackSurvey() {
  const [step, setStep] = useState(1);
  const [satisfaction, setSatisfaction] = useState<string>('');
  const [experienceRating, setExperienceRating] = useState<number | null>(null);
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

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="bg-grid-slate-100 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:30px_30px] opacity-20"></div>

        <div className="relative z-10 container mx-auto px-4 py-20 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              We value your feedback
            </h1>
            <p className="text-muted-foreground text-xl">
              {!submitted
                ? 'Help us improve your experience by sharing your thoughts.'
                : 'Thank you for taking the time to share your feedback!'}
            </p>
          </div>

          <div className="mx-auto max-w-xl">
            {!submitted ? (
              <div className="bg-background rounded-xl border p-8 shadow-lg">
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Step {step} of {totalSteps}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {Math.round((step / totalSteps) * 100)}% Complete
                    </span>
                  </div>
                  <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Step 1: Overall Satisfaction */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                      Overall Satisfaction
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      How would you rate your overall satisfaction with our
                      product or service?
                    </p>

                    <RadioGroup
                      value={satisfaction}
                      onValueChange={setSatisfaction}
                      className="space-y-3"
                    >
                      <div className="hover:bg-muted flex items-center space-x-2 rounded-lg border p-3 transition-colors">
                        <RadioGroupItem
                          value="very_satisfied"
                          id="very_satisfied"
                        />
                        <Label
                          htmlFor="very_satisfied"
                          className="flex-1 cursor-pointer"
                        >
                          Very Satisfied
                        </Label>
                      </div>
                      <div className="hover:bg-muted flex items-center space-x-2 rounded-lg border p-3 transition-colors">
                        <RadioGroupItem value="satisfied" id="satisfied" />
                        <Label
                          htmlFor="satisfied"
                          className="flex-1 cursor-pointer"
                        >
                          Satisfied
                        </Label>
                      </div>
                      <div className="hover:bg-muted flex items-center space-x-2 rounded-lg border p-3 transition-colors">
                        <RadioGroupItem value="neutral" id="neutral" />
                        <Label
                          htmlFor="neutral"
                          className="flex-1 cursor-pointer"
                        >
                          Neutral
                        </Label>
                      </div>
                      <div className="hover:bg-muted flex items-center space-x-2 rounded-lg border p-3 transition-colors">
                        <RadioGroupItem
                          value="dissatisfied"
                          id="dissatisfied"
                        />
                        <Label
                          htmlFor="dissatisfied"
                          className="flex-1 cursor-pointer"
                        >
                          Dissatisfied
                        </Label>
                      </div>
                      <div className="hover:bg-muted flex items-center space-x-2 rounded-lg border p-3 transition-colors">
                        <RadioGroupItem
                          value="very_dissatisfied"
                          id="very_dissatisfied"
                        />
                        <Label
                          htmlFor="very_dissatisfied"
                          className="flex-1 cursor-pointer"
                        >
                          Very Dissatisfied
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 2: Experience Rating */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                      Rate Your Experience
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      How would you rate your experience using our platform?
                    </p>

                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setExperienceRating(rating)}
                              className="relative p-1"
                            >
                              <Star
                                className={`h-10 w-10 ${
                                  rating <= (experienceRating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-muted text-muted'
                                }`}
                              />
                              <span className="sr-only">{rating} stars</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-muted-foreground text-center text-sm">
                        {experienceRating === 1 && 'Poor'}
                        {experienceRating === 2 && 'Fair'}
                        {experienceRating === 3 && 'Good'}
                        {experienceRating === 4 && 'Very Good'}
                        {experienceRating === 5 && 'Excellent'}
                      </div>

                      <div>
                        <Label htmlFor="usedFeatures" className="mb-2">
                          Which features do you use most?
                        </Label>
                        <Select>
                          <SelectTrigger id="usedFeatures">
                            <SelectValue placeholder="Select features" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dashboard">Dashboard</SelectItem>
                            <SelectItem value="reporting">Reporting</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                            <SelectItem value="collaboration">
                              Collaboration
                            </SelectItem>
                            <SelectItem value="automation">
                              Automation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Comments and Suggestions */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                      Additional Comments
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Please share any additional feedback or suggestions for
                      improvement.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="improvement" className="mb-2">
                          What could we improve?
                        </Label>
                        <Textarea
                          id="improvement"
                          placeholder="Your suggestions here..."
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label htmlFor="favorite" className="mb-2">
                          What do you like most about our product?
                        </Label>
                        <Textarea
                          id="favorite"
                          placeholder="Your feedback here..."
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label htmlFor="referralLikelihood" className="mb-2">
                          How likely are you to recommend us?
                        </Label>
                        <Select>
                          <SelectTrigger id="referralLikelihood">
                            <SelectValue placeholder="Select likelihood" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="very_likely">
                              Very Likely
                            </SelectItem>
                            <SelectItem value="likely">Likely</SelectItem>
                            <SelectItem value="neutral">Neutral</SelectItem>
                            <SelectItem value="unlikely">Unlikely</SelectItem>
                            <SelectItem value="very_unlikely">
                              Very Unlikely
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !satisfaction) ||
                      (step === 2 && !experienceRating)
                    }
                  >
                    {step === totalSteps ? 'Submit Feedback' : 'Continue'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-background rounded-xl border p-8 text-center shadow-lg">
                <div className="mb-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="mb-2 text-2xl font-bold">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your feedback is invaluable to us. We appreciate you taking
                  the time to share your thoughts.
                </p>

                <div className="mb-8 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-primary text-3xl font-bold">97%</div>
                    <div className="text-muted-foreground text-sm">
                      Response Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary text-3xl font-bold">4.8/5</div>
                    <div className="text-muted-foreground text-sm">
                      Average Rating
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button className="flex-1" variant="outline">
                    Take Another Survey
                  </Button>
                  <Button className="flex-1">Return to Dashboard</Button>
                </div>
              </div>
            )}
          </div>

          <div className="text-muted-foreground mt-8 text-center text-sm">
            <p>
              We take your privacy seriously.{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
