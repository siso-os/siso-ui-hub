import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { CheckIcon, ShieldIcon, LockIcon, ServerIcon } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';
import { Separator } from '../../../ui/separator';

const plans = [
  {
    name: 'Business',
    price: '$99',
    description: 'For small to medium-sized businesses',
    features: [
      'Up to 25 users',
      'Unlimited projects',
      'Priority support',
      '50GB storage',
      'API access',
      'Advanced analytics',
      'Custom domains',
    ],
    securityFeatures: [
      'Two-factor authentication',
      'SSO with Google',
      'Basic audit logs',
      'Standard encryption',
    ],
  },
  {
    name: 'Enterprise',
    price: '$299',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited users',
      'Unlimited projects',
      '24/7 phone support',
      '500GB storage',
      'Advanced API access',
      'Enterprise analytics',
      'Custom domains',
      'Dedicated account manager',
      'Custom integrations',
    ],
    securityFeatures: [
      'Two-factor authentication',
      'SSO with any provider',
      'Advanced audit logs',
      'End-to-end encryption',
      'Role-based access control',
      'IP restrictions',
      'Data residency options',
      'Compliance certifications',
    ],
    highlight: true,
  },
];

const complianceCertifications = [
  {
    name: 'SOC 2 Type II',
    description: 'Security, availability, and confidentiality',
  },
  {
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
  },
  {
    name: 'GDPR',
    description: 'General Data Protection Regulation compliance',
  },
  { name: 'ISO 27001', description: 'Information security management' },
  {
    name: 'PCI DSS',
    description: 'Payment Card Industry Data Security Standard',
  },
];

export default function PricingSectionEnterprise() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Enterprise-grade security and compliance
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
              Secure, compliant solutions for organizations of all sizes.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'flex flex-col',
                plan.highlight && 'border-primary shadow-lg'
              )}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1 text-sm">
                    /month
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <ServerIcon className="text-primary h-5 w-5" />
                    <h3 className="font-medium">Core Features</h3>
                  </div>
                  <Separator className="my-3" />
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="text-primary mr-2 h-4 w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <ShieldIcon className="text-primary h-5 w-5" />
                    <h3 className="font-medium">Security & Compliance</h3>
                  </div>
                  <Separator className="my-3" />
                  <ul className="space-y-2 text-sm">
                    {plan.securityFeatures.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckIcon className="text-primary mr-2 h-4 w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.highlight ? 'default' : 'outline'}
                  asChild
                >
                  <a href="#">
                    {plan.highlight ? 'Contact Sales' : 'Get Started'}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="bg-card rounded-lg border p-8">
            <div className="flex items-center gap-3">
              <LockIcon className="text-primary h-6 w-6" />
              <h3 className="text-xl font-medium">Compliance Certifications</h3>
            </div>
            <p className="text-muted-foreground mt-2">
              Our Enterprise plan includes all the certifications you need to
              meet your compliance requirements.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {complianceCertifications.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-background rounded-lg border p-4"
                >
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    {cert.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-primary/5 mx-auto mt-16 max-w-4xl rounded-lg border p-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-medium">
                Need a custom enterprise solution?
              </h3>
              <p className="text-muted-foreground">
                Our team can help you customize a plan that meets your specific
                requirements.
              </p>
            </div>
            <Button size="lg" asChild>
              <a href="#">Contact Enterprise Sales</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
