import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../../ui/avatar';
import {
  ArrowRightIcon,
  CheckIcon,
  PlayIcon,
  ShieldCheckIcon,
  StarIcon,
  UsersIcon,
} from 'lucide-react';

export default function HeroSectionWithTrustIndicators() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <Badge variant="outline" className="mb-4">
              <ShieldCheckIcon className="mr-1 h-3 w-3" />
              Trusted by 50,000+ Companies
            </Badge>

            <h1 className="text-primary mb-6 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              The platform that serious businesses trust
            </h1>

            <p className="text-foreground mb-8 max-w-4xl text-base text-balance sm:text-lg">
              Join industry leaders who rely on our enterprise-grade platform
              for mission-critical operations. Built with security, scalability,
              and reliability at its core.
            </p>

            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                <PlayIcon className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-6">
              {/* Security & Compliance */}
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                  <span className="font-medium">SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                  <span className="font-medium">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                  <span className="font-medium">99.9% Uptime</span>
                </div>
              </div>

              {/* Customer Rating */}
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  4.9/5 from 2,847 reviews
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Trust Elements */}
          <div className="space-y-6">
            {/* Customer Testimonial */}
            <Card className="border-l-primary border-l-4">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg leading-relaxed font-medium">
                    "This platform transformed our entire workflow. We've seen a
                    40% increase in productivity and our team couldn't be
                    happier."
                  </blockquote>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Sarah Chen"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-muted-foreground text-sm">
                      CTO, TechCorp
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-2">
                    <UsersIcon className="mx-auto h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-muted-foreground text-sm">
                    Active Companies
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-2">
                    <CheckIcon className="mx-auto h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-muted-foreground text-sm">Uptime SLA</p>
                </CardContent>
              </Card>
            </div>

            {/* Features List */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">What's included:</h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckIcon className="h-4 w-4 flex-shrink-0 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Company Logos */}
        <div className="mt-20">
          <p className="text-muted-foreground mb-8 text-center text-sm">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
          <div className="grid grid-cols-2 items-center gap-8 opacity-60 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-muted h-8 w-24 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-16">
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:border-green-800 dark:from-green-950/20 dark:to-blue-950/20">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                <div className="flex-shrink-0">
                  <ShieldCheckIcon className="h-12 w-12 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold">
                    Enterprise Security & Compliance
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Bank-level encryption, regular security audits, and
                    compliance with industry standards ensure your data is
                    always protected.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

const features = [
  'Advanced analytics and reporting',
  'Real-time collaboration tools',
  'API access and integrations',
  'Priority customer support',
  'Custom onboarding assistance',
  'Enterprise-grade security',
];
