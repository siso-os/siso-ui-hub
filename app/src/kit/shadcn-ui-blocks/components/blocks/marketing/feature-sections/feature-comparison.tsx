import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';

export default function HeroSectionFeatureComparison() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Announcement */}
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="text-sm">
            New Enterprise Plan Available
          </Badge>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-primary mx-auto mb-4 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
            Choose the perfect plan for your needs
          </h1>
          <p className="text-foreground mx-auto max-w-4xl text-base text-balance sm:text-lg">
            From startups to enterprises, we have a plan that scales with your
            business. Compare features and find your fit.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border">
              <table className="divide-border min-w-full divide-y">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-foreground px-6 py-3 text-left text-sm font-semibold">
                      Feature
                    </th>
                    <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                      Basic
                    </th>
                    <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                      Pro
                    </th>
                    <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border bg-background divide-y">
                  {features.map((feature, index) => (
                    <tr key={index}>
                      <td className="text-foreground px-6 py-4 text-sm whitespace-nowrap">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                        {feature.basic ? (
                          <CheckIcon className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <XIcon className="mx-auto h-5 w-5 text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                        {feature.pro ? (
                          <CheckIcon className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <XIcon className="mx-auto h-5 w-5 text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                        <CheckIcon className="mx-auto h-5 w-5 text-green-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="outline">
            Compare All Features
          </Button>
          <Button size="lg">
            Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <UsersIcon className="text-primary mx-auto mb-4 h-8 w-8" />
            <h3 className="mb-2 text-xl font-semibold">50,000+ Users</h3>
            <p className="text-muted-foreground">Join our growing community</p>
          </div>
          <div className="text-center">
            <CheckIcon className="text-primary mx-auto mb-4 h-8 w-8" />
            <h3 className="mb-2 text-xl font-semibold">99.9% Uptime</h3>
            <p className="text-muted-foreground">Reliable service guaranteed</p>
          </div>
          <div className="text-center">
            <ShieldCheckIcon className="text-primary mx-auto mb-4 h-8 w-8" />
            <h3 className="mb-2 text-xl font-semibold">Secure & Compliant</h3>
            <p className="text-muted-foreground">GDPR and SOC 2 certified</p>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

const features = [
  { name: 'Unlimited Projects', basic: false, pro: true, enterprise: true },
  { name: 'Team Collaboration', basic: false, pro: true, enterprise: true },
  { name: 'Advanced Analytics', basic: false, pro: false, enterprise: true },
  { name: 'Priority Support', basic: false, pro: true, enterprise: true },
  { name: 'Custom Integrations', basic: false, pro: false, enterprise: true },
  { name: 'API Access', basic: true, pro: true, enterprise: true },
  { name: 'Data Export', basic: true, pro: true, enterprise: true },
  { name: 'Mobile App', basic: false, pro: true, enterprise: true },
];
