import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { Separator } from '../../../ui/separator';
import { Badge } from '../../../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  GiftIcon,
  TrophyIcon,
  ClockIcon,
  ShareIcon,
  CheckIcon,
  UsersIcon,
} from 'lucide-react';

export default function HeroFormContestEntry() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareMethod, setShareMethod] = useState<string | null>(null);

  // Contest details
  const contestEndDate = 'June 30, 2024';
  const prizeItems = [
    {
      id: 'grand',
      name: 'Grand Prize',
      description: 'Latest Pro Tablet',
      image: '/images/contest/tablet.jpg',
      value: '$999',
    },
    {
      id: 'second',
      name: 'Second Prize',
      description: 'Wireless Earbuds',
      image: '/images/contest/earbuds.jpg',
      value: '$249',
    },
    {
      id: 'third',
      name: 'Third Prize (5 winners)',
      description: 'Smart Fitness Band',
      image: '/images/contest/fitness.jpg',
      value: '$99',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleShare = (method: string) => {
    setShareMethod(method);
    // In a real implementation, this would open the respective share dialog
    console.log(`Sharing via ${method}`);

    // Reset after a brief delay
    setTimeout(() => {
      setShareMethod(null);
    }, 2000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-950 dark:to-slate-900">
      {/* Background elements */}
      <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-yellow-200 opacity-20 blur-3xl dark:bg-yellow-900"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-orange-200 opacity-20 blur-3xl dark:bg-orange-900"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left column - Content */}
          <div>
            <Badge
              variant="outline"
              className="mb-6 border-yellow-200 bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
            >
              <TrophyIcon className="mr-1 h-3.5 w-3.5" />
              Enter Our Giveaway
            </Badge>

            <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
              Win Amazing Prizes in our{' '}
              <span className="text-yellow-600 dark:text-yellow-400">
                Summer Tech
              </span>{' '}
              Giveaway!
            </h1>

            <div className="mb-8 flex w-fit items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm dark:bg-slate-800">
              <ClockIcon className="h-4 w-4 text-yellow-600" />
              <span>Contest ends on {contestEndDate}</span>
            </div>

            <p className="text-muted-foreground mb-8 text-xl">
              Enter for your chance to win one of our amazing tech prizes.
              It&apos;s quick, easy, and completely free to enter!
            </p>

            <div className="mb-10 space-y-6">
              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-yellow-100 p-1 dark:bg-yellow-900/30">
                  <CheckIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Free entry</span> - no
                    purchase necessary
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-yellow-100 p-1 dark:bg-yellow-900/30">
                  <CheckIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Multiple winners</span> -
                    increased chances to win
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-yellow-100 p-1 dark:bg-yellow-900/30">
                  <CheckIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Worldwide shipping</span> -
                    open to international entries
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 rounded-full bg-yellow-100 p-1 dark:bg-yellow-900/30">
                  <CheckIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Bonus entries</span> - share
                    with friends for extra chances
                  </p>
                </div>
              </div>
            </div>

            {/* Prizes showcase */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Prizes Up For Grabs
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {prizeItems.map((prize) => (
                  <Card
                    key={prize.id}
                    className="overflow-hidden border pt-0 shadow-sm"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                      {/* Placeholder for prize image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <GiftIcon className="h-12 w-12 text-yellow-500" />
                      </div>
                    </div>
                    <CardContent className="">
                      <h4 className="text-sm font-medium">{prize.name}</h4>
                      <p className="text-muted-foreground text-xs">
                        {prize.description}
                      </p>
                      <p className="mt-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                        Value: {prize.value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:hidden">
              <Button
                onClick={() =>
                  document
                    .getElementById('entry-form')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="w-full bg-yellow-600 text-white hover:bg-yellow-700"
              >
                Enter Now - It&apos;s Free
              </Button>
            </div>
          </div>

          {/* Right column - Form */}
          <div id="entry-form">
            {!submitted ? (
              <Card className="overflow-hidden border p-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
                  <CardTitle className="text-2xl">Enter to Win</CardTitle>
                  <CardDescription className="text-white/80">
                    {' '}
                    out the form below to participate
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label className="mb-1.5" htmlFor="firstName">
                          First Name*
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-1.5" htmlFor="lastName">
                          Last Name*
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="mb-1.5" htmlFor="email">
                        Email Address*
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            'agreeToTerms',
                            checked as boolean
                          )
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm leading-tight font-normal"
                      >
                        <div>
                          I agree to the contest{' '}
                          <a
                            href="#"
                            className="text-yellow-600 hover:underline dark:text-yellow-400"
                          >
                            terms and conditions
                          </a>{' '}
                          and have read the{' '}
                          <a
                            href="#"
                            className="text-yellow-600 hover:underline dark:text-yellow-400"
                          >
                            privacy policy*
                          </a>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.agreeToMarketing}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            'agreeToMarketing',
                            checked as boolean
                          )
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="marketing"
                        className="text-sm leading-tight font-normal"
                      >
                        I would like to receive marketing emails about products,
                        services, and future contests. (Optional)
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-yellow-600 text-white hover:bg-yellow-700"
                      disabled={
                        !formData.email || !formData.agreeToTerms || loading
                      }
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <span>Enter the Contest</span>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <div className="border-t bg-slate-50 px-6 py-4 dark:bg-slate-900/50">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                      <UsersIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">1,847 people</span> have
                        already entered
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="overflow-hidden border p-0 shadow-md">
                <div className="p-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                    <TrophyIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>

                  <h3 className="mb-2 text-2xl font-bold">You&apos;re In!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your entry has been received. Good luck!
                  </p>

                  <div className="mb-6 rounded-lg bg-yellow-50 p-6 dark:bg-yellow-900/20">
                    <h4 className="mb-4 font-medium">
                      Increase Your Chances of Winning
                    </h4>
                    <p className="mb-4 text-sm">
                      Share this contest with your friends and family to get
                      bonus entries!
                    </p>

                    <div className="flex justify-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                        onClick={() => handleShare('facebook')}
                      >
                        {shareMethod === 'facebook' ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <ShareIcon className="h-4 w-4" />
                        )}
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                        onClick={() => handleShare('twitter')}
                      >
                        {shareMethod === 'twitter' ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <ShareIcon className="h-4 w-4" />
                        )}
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-900 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                        onClick={() => handleShare('email')}
                      >
                        {shareMethod === 'email' ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <ShareIcon className="h-4 w-4" />
                        )}
                        Email
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4 text-left">
                    <h4 className="font-medium">What happens next?</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-medium dark:bg-yellow-900/30">
                          1
                        </div>
                        <p className="text-sm">
                          We&apos;ll send you a confirmation email shortly to{' '}
                          {formData.email}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-medium dark:bg-yellow-900/30">
                          2
                        </div>
                        <p className="text-sm">
                          Winners will be randomly selected after the contest
                          ends on {contestEndDate}
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-xs font-medium dark:bg-yellow-900/30">
                          3
                        </div>
                        <p className="text-sm">
                          Winners will be notified by email within 5 days after
                          the drawing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Contest rules teaser */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                <a
                  href="#"
                  className="text-yellow-600 hover:underline dark:text-yellow-400"
                >
                  View complete contest rules
                </a>{' '}
                | No purchase necessary. Void where prohibited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
