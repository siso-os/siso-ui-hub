import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

export default function SocialProofHero() {
  return (
    <div className="bg-background relative">
      <div className="container mx-auto px-4 py-24 md:px-6 md:py-28 lg:py-32 2xl:max-w-[1400px]">
        {/* Main Hero Content */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/10 text-primary mb-6"
          >
            Trusted by 50,000+ Users
          </Badge>
          <h1 className="text-primary mb-6 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
            Join thousands of successful teams building amazing products
          </h1>
          <p className="text-foreground mb-8 max-w-4xl text-base text-balance sm:text-lg">
            From startups to Fortune 500 companies, teams around the world trust
            our platform to deliver exceptional results. Experience the
            difference that proven tools and dedicated support can make.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="px-8 py-6 text-lg">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-muted-foreground mb-16 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Free 14-day trial
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="grid items-start gap-8 lg:grid-cols-3">
          {/* Statistics */}
          <div className="space-y-6">
            <h3 className="text-primary mb-4 max-w-4xl text-2xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-3xl xl:tracking-tighter">
              Proven Results
            </h3>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="text-primary mb-2 text-3xl font-bold">
                  50,000+
                </div>
                <div className="text-muted-foreground text-sm">
                  Active Users
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="text-primary mb-2 text-3xl font-bold">
                  99.9%
                </div>
                <div className="text-muted-foreground text-sm">Uptime</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="text-primary mb-2 text-3xl font-bold">
                  4.8/5
                </div>
                <div className="text-muted-foreground text-sm">
                  Average Rating
                  <div className="mt-1 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? 'text-yellow-400' : 'text-muted-foreground'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-primary mb-4 max-w-4xl text-2xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-3xl xl:tracking-tighter">
              What Our Customers Say
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-muted/20">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.quote}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Company Logos */}
        <div className="mt-20">
          <p className="text-muted-foreground mb-8 text-center text-sm">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
            {companyLogos.map((logo, index) => (
              <div key={index} className="flex items-center">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at TechCorp',
    initials: 'SC',
    avatar:
      'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg?w=150&h=150&fit=crop&crop=face',
    quote:
      "This platform transformed how our team collaborates. We've seen a 40% increase in productivity since switching.",
  },
  {
    name: 'Michael Rodriguez',
    role: 'CEO at StartupX',
    initials: 'MR',
    avatar:
      'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg?w=150&h=150&fit=crop&crop=face',
    quote:
      "The analytics dashboard gives us insights we never had before. It's been a game-changer for our business.",
  },
  {
    name: 'Emily Johnson',
    role: 'Design Lead at CreativeCo',
    initials: 'EJ',
    avatar:
      'https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_1280.jpg?w=150&h=150&fit=crop&crop=face',
    quote:
      'Intuitive design and powerful features. Our clients love the results we deliver using this platform.',
  },
  {
    name: 'David Kim',
    role: 'CTO at InnovateNow',
    initials: 'DK',
    avatar:
      'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg?w=150&h=150&fit=crop&crop=face',
    quote:
      "Rock-solid reliability and excellent support. We've never experienced any downtime issues.",
  },
];

const companyLogos = [
  <svg
    key={1}
    className="h-auto w-24"
    width={120}
    height={40}
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="120"
      height="40"
      rx="8"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <text
      x="60"
      y="25"
      textAnchor="middle"
      className="fill-current text-sm font-semibold"
    >
      TechCorp
    </text>
  </svg>,
  <svg
    key={2}
    className="h-auto w-24"
    width={120}
    height={40}
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="120"
      height="40"
      rx="8"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <text
      x="60"
      y="25"
      textAnchor="middle"
      className="fill-current text-sm font-semibold"
    >
      StartupX
    </text>
  </svg>,
  <svg
    key={3}
    className="h-auto w-24"
    width={120}
    height={40}
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="120"
      height="40"
      rx="8"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <text
      x="60"
      y="25"
      textAnchor="middle"
      className="fill-current text-sm font-semibold"
    >
      CreativeCo
    </text>
  </svg>,
  <svg
    key={4}
    className="h-auto w-24"
    width={120}
    height={40}
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="120"
      height="40"
      rx="8"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <text
      x="60"
      y="25"
      textAnchor="middle"
      className="fill-current text-sm font-semibold"
    >
      InnovateCorp
    </text>
  </svg>,
  <svg
    key={5}
    className="h-auto w-24"
    width={120}
    height={40}
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="120"
      height="40"
      rx="8"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <text
      x="60"
      y="25"
      textAnchor="middle"
      className="fill-current text-sm font-semibold"
    >
      DataFlow
    </text>
  </svg>,
];
