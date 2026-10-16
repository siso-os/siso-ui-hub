import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Textarea } from '../../../ui/textarea';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Slider } from '../../../ui/slider';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Checkbox } from '../../../ui/checkbox';
import { Card, CardContent, CardHeader } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import { CheckIcon, ChevronRightIcon, StarIcon } from 'lucide-react';

export default function HeroFormUserFeedback() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState({
    // Rating scores (1-10)
    ratings: {
      overall: 8,
      usability: 7,
      features: 8,
      support: 6,
      value: 9,
    },
    // Recommendation score (0-10)
    nps: 8,
    // Feature usage
    usedFeatures: [] as string[],
    // Text feedback
    improvements: '',
    likedMost: '',
    email: '',
    // Would use again
    wouldUseAgain: 'yes',
  });

  // Features list for checkboxes
  const featuresList = [
    { id: 'feature1', label: 'Dashboard' },
    { id: 'feature2', label: 'Reports & Analytics' },
    { id: 'feature3', label: 'User Management' },
    { id: 'feature4', label: 'Automation Tools' },
    { id: 'feature5', label: 'Mobile App' },
    { id: 'feature6', label: 'Integrations' },
    { id: 'feature7', label: 'Content Management' },
    { id: 'feature8', label: 'Customization Options' },
  ];

  // Handle rating changes
  const handleRatingChange = (
    category: keyof typeof feedback.ratings,
    value: number[]
  ) => {
    setFeedback({
      ...feedback,
      ratings: {
        ...feedback.ratings,
        [category]: value[0],
      },
    });
  };

  // Handle feature toggle
  const toggleFeature = (featureId: string) => {
    if (feedback.usedFeatures.includes(featureId)) {
      setFeedback({
        ...feedback,
        usedFeatures: feedback.usedFeatures.filter((id) => id !== featureId),
      });
    } else {
      setFeedback({
        ...feedback,
        usedFeatures: [...feedback.usedFeatures, featureId],
      });
    }
  };

  // Get average rating
  const getAverageRating = () => {
    const ratings = Object.values(feedback.ratings);
    return (
      ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    ).toFixed(1);
  };

  // Get NPS category
  const getNPSCategory = () => {
    const score = feedback.nps;
    if (score >= 9) return 'Promoter';
    if (score >= 7) return 'Passive';
    return 'Detractor';
  };

  // Get stars display for a rating
  const getStarsDisplay = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const filled = i < Math.round(rating / 2);
        return (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${
              filled
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        );
      });
  };

  // Handle form navigation
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              {!submitted ? (
                <>
                  <Badge
                    variant="outline"
                    className="mb-4 px-3 py-1 text-sm font-medium"
                  >
                    Help us improve
                  </Badge>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    Your feedback matters
                  </h1>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                    We value your opinion and would love to hear about your
                    experience with our product.
                  </p>
                </>
              ) : (
                <>
                  <Badge
                    variant="outline"
                    className="mb-4 border-green-600 px-3 py-1 text-sm font-medium text-green-600"
                  >
                    Success
                  </Badge>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    Thanks for your feedback!
                  </h1>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                    Your insights help us create a better product for everyone.
                  </p>
                </>
              )}
            </div>

            {!submitted ? (
              <Card className="border shadow-sm">
                <CardHeader className="p-6">
                  {/* Progress steps */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground text-sm font-medium">
                        Step {step} of 3
                      </div>
                      <div className="text-sm font-medium">
                        {step === 1
                          ? 'Overall Ratings'
                          : step === 2
                            ? 'Features & Experience'
                            : 'Final Thoughts'}
                      </div>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(step / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Overall Rating */}
                    {step === 1 && (
                      <div className="space-y-6">
                        {/* Overall Satisfaction */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="overall-rating">
                              Overall Satisfaction
                            </Label>
                            <div className="flex items-center">
                              {getStarsDisplay(feedback.ratings.overall)}
                              <span className="ml-2 text-sm font-medium">
                                {feedback.ratings.overall}/10
                              </span>
                            </div>
                          </div>
                          <Slider
                            id="overall-rating"
                            min={1}
                            max={10}
                            step={1}
                            value={[feedback.ratings.overall]}
                            onValueChange={(value) =>
                              handleRatingChange('overall', value)
                            }
                          />
                          <div className="text-muted-foreground flex justify-between text-xs">
                            <span>Very Dissatisfied</span>
                            <span>Very Satisfied</span>
                          </div>
                        </div>

                        {/* Usability */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="usability-rating">
                              Usability & Ease of Use
                            </Label>
                            <span className="text-sm font-medium">
                              {feedback.ratings.usability}/10
                            </span>
                          </div>
                          <Slider
                            id="usability-rating"
                            min={1}
                            max={10}
                            step={1}
                            value={[feedback.ratings.usability]}
                            onValueChange={(value) =>
                              handleRatingChange('usability', value)
                            }
                          />
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="features-rating">
                              Features & Functionality
                            </Label>
                            <span className="text-sm font-medium">
                              {feedback.ratings.features}/10
                            </span>
                          </div>
                          <Slider
                            id="features-rating"
                            min={1}
                            max={10}
                            step={1}
                            value={[feedback.ratings.features]}
                            onValueChange={(value) =>
                              handleRatingChange('features', value)
                            }
                          />
                        </div>

                        {/* Support */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="support-rating">
                              Customer Support
                            </Label>
                            <span className="text-sm font-medium">
                              {feedback.ratings.support}/10
                            </span>
                          </div>
                          <Slider
                            id="support-rating"
                            min={1}
                            max={10}
                            step={1}
                            value={[feedback.ratings.support]}
                            onValueChange={(value) =>
                              handleRatingChange('support', value)
                            }
                          />
                        </div>

                        {/* Value */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="value-rating">
                              Value for Money
                            </Label>
                            <span className="text-sm font-medium">
                              {feedback.ratings.value}/10
                            </span>
                          </div>
                          <Slider
                            id="value-rating"
                            min={1}
                            max={10}
                            step={1}
                            value={[feedback.ratings.value]}
                            onValueChange={(value) =>
                              handleRatingChange('value', value)
                            }
                          />
                        </div>

                        {/* Net Promoter Score */}
                        <div className="space-y-3 pt-4">
                          <Label htmlFor="nps-rating">
                            How likely are you to recommend our product to
                            others?
                          </Label>
                          <Slider
                            id="nps-rating"
                            min={0}
                            max={10}
                            step={1}
                            value={[feedback.nps]}
                            onValueChange={(value) =>
                              setFeedback({ ...feedback, nps: value[0]! })
                            }
                          />
                          <div className="flex justify-between">
                            <span className="text-muted-foreground text-xs">
                              Not likely at all
                            </span>
                            <span className="text-sm font-medium">
                              {feedback.nps}/10
                            </span>
                            <span className="text-muted-foreground text-xs">
                              Extremely likely
                            </span>
                          </div>
                          <div className="mt-2 text-sm font-medium">
                            Category:{' '}
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                getNPSCategory() === 'Promoter'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : getNPSCategory() === 'Passive'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                            >
                              {getNPSCategory()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Features & Experience */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label>
                            Which features did you use? (Select all that apply)
                          </Label>
                          <div className="mt-2 grid gap-3 md:grid-cols-2">
                            {featuresList.map((feature) => (
                              <div
                                key={feature.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={feature.id}
                                  checked={feedback.usedFeatures.includes(
                                    feature.id
                                  )}
                                  onCheckedChange={() =>
                                    toggleFeature(feature.id)
                                  }
                                />
                                <Label
                                  htmlFor={feature.id}
                                  className="cursor-pointer text-sm font-normal"
                                >
                                  {feature.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <Label htmlFor="liked-most">
                            What did you like most about our product?
                          </Label>
                          <Textarea
                            id="liked-most"
                            value={feedback.likedMost}
                            onChange={(e) =>
                              setFeedback({
                                ...feedback,
                                likedMost: e.target.value,
                              })
                            }
                            placeholder="Share what you enjoyed about your experience..."
                            rows={3}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="improvements">
                            What do you think could be improved?
                          </Label>
                          <Textarea
                            id="improvements"
                            value={feedback.improvements}
                            onChange={(e) =>
                              setFeedback({
                                ...feedback,
                                improvements: e.target.value,
                              })
                            }
                            placeholder="Tell us how we can make your experience better..."
                            rows={3}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Final Thoughts */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label>
                            Would you use our product again in the future?
                          </Label>
                          <RadioGroup
                            value={feedback.wouldUseAgain}
                            onValueChange={(value) =>
                              setFeedback({ ...feedback, wouldUseAgain: value })
                            }
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="use-again-yes" />
                              <Label
                                htmlFor="use-again-yes"
                                className="font-normal"
                              >
                                Yes, definitely
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="maybe"
                                id="use-again-maybe"
                              />
                              <Label
                                htmlFor="use-again-maybe"
                                className="font-normal"
                              >
                                Maybe, it depends
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="use-again-no" />
                              <Label
                                htmlFor="use-again-no"
                                className="font-normal"
                              >
                                No, I wouldn&apos;t
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <Label htmlFor="email">
                            Email address (optional, for follow-up questions)
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={feedback.email}
                            onChange={(e) =>
                              setFeedback({
                                ...feedback,
                                email: e.target.value,
                              })
                            }
                          />
                          <p className="text-muted-foreground text-xs">
                            We&apos;ll never share your email with anyone else.
                          </p>
                        </div>

                        <div className="mt-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
                          <h3 className="mb-3 text-sm font-medium">
                            Summary of Your Feedback
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Average Rating:
                              </span>
                              <div className="flex items-center">
                                {getStarsDisplay(
                                  parseFloat(getAverageRating())
                                )}
                                <span className="ml-2">
                                  {getAverageRating()}/10
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Recommendation:
                              </span>
                              <span>
                                {feedback.nps}/10 ({getNPSCategory()})
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Features Used:
                              </span>
                              <span>
                                {feedback.usedFeatures.length}/
                                {featuresList.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                      {step > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                      ) : (
                        <div></div>
                      )}
                      {step < 3 ? (
                        <Button type="button" onClick={nextStep}>
                          Continue
                          <ChevronRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button type="submit">
                          Submit Feedback
                          <ChevronRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border p-8 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <div className="mb-6 space-y-2">
                  <h3 className="text-2xl font-bold">
                    Feedback Successfully Submitted
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for taking the time to share your experience with
                    us.
                  </p>
                </div>

                <div className="mx-auto mb-6 max-w-md rounded-lg bg-slate-50 p-6 dark:bg-slate-800/50">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-muted-foreground mb-1 text-sm">
                        Your Average Rating
                      </div>
                      <div className="flex items-center justify-center">
                        {getStarsDisplay(parseFloat(getAverageRating()))}
                        <span className="ml-2 text-lg font-bold">
                          {getAverageRating()}/10
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-center">
                      <div className="text-muted-foreground mb-1 text-sm">
                        Your Recommendation Score
                      </div>
                      <div className="text-lg font-bold">{feedback.nps}/10</div>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          getNPSCategory() === 'Promoter'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : getNPSCategory() === 'Passive'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {getNPSCategory()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    We constantly work to improve our product based on feedback
                    like yours.
                    {feedback.email &&
                      " We'll follow up with you soon if we have any questions."}
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Submit Another Response
                  </Button>
                </div>
              </Card>
            )}

            <div className="text-muted-foreground mt-8 text-center text-sm">
              <p>
                Need immediate assistance? Contact our support team at
                support@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
