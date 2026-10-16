import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import { CheckCircle, Lock, ShieldCheck, Zap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';

type SecurityStat = {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

type Certification = {
  name: string;
  logo: React.ReactNode;
  description: string;
};

const securityStats: SecurityStat[] = [
  {
    value: '99.99%',
    label: 'Uptime Guarantee',
    description:
      'Enterprise-grade reliability for critical business operations',
    icon: <Zap className="h-5 w-5" />,
  },
  {
    value: 'SOC 2',
    label: 'Compliant',
    description: 'Independently verified security controls and practices',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    value: '256-bit',
    label: 'Encryption',
    description: 'Bank-level encryption for all data in transit and at rest',
    icon: <Lock className="h-5 w-5" />,
  },
  {
    value: 'GDPR',
    label: 'Compliant',
    description: 'Fully compliant with global data protection regulations',
    icon: <CheckCircle className="h-5 w-5" />,
  },
];

const certifications: Certification[] = [
  {
    name: 'ISO 27001',
    logo: (
      <div className="bg-background flex h-10 w-20 items-center justify-center rounded-md border text-sm font-semibold">
        ISO 27001
      </div>
    ),
    description: 'Information Security Management',
  },
  {
    name: 'HIPAA',
    logo: (
      <div className="bg-background flex h-10 w-20 items-center justify-center rounded-md border text-sm font-semibold">
        HIPAA
      </div>
    ),
    description: 'Health Information Privacy',
  },
  {
    name: 'PCI DSS',
    logo: (
      <div className="bg-background flex h-10 w-20 items-center justify-center rounded-md border text-sm font-semibold">
        PCI DSS
      </div>
    ),
    description: 'Payment Card Industry Compliance',
  },
  {
    name: 'CCPA',
    logo: (
      <div className="bg-background flex h-10 w-20 items-center justify-center rounded-md border text-sm font-semibold">
        CCPA
      </div>
    ),
    description: 'California Consumer Privacy Act',
  },
  {
    name: 'SOC 2 Type II',
    logo: (
      <div className="bg-background flex h-10 w-20 items-center justify-center rounded-md border text-sm font-semibold">
        SOC 2
      </div>
    ),
    description: 'Service Organization Control',
  },
  {
    name: 'GDPR',
    logo: (
      <div className="bg-background flex h-10 w-20 items-center justify-center rounded-md border text-sm font-semibold">
        GDPR
      </div>
    ),
    description: 'General Data Protection Regulation',
  },
];

export default function TrustIndicators() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Enterprise Security</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Built with Security and Compliance in Mind
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Your data deserves the highest level of protection. Our platform is
            built with enterprise-grade security at its core.
          </p>
        </div>

        {/* Security Stats */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {securityStats.map((stat, index) => (
            <Card key={index} className="bg-primary/5 border-primary/20 p-0">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 rounded-full p-3">
                    {stat.icon}
                  </div>
                </div>
                <div className="mb-1 text-2xl font-bold">{stat.value}</div>
                <div className="mb-2 font-medium">{stat.label}</div>
                <p className="text-muted-foreground text-sm">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Protected Data Section */}
        <div className="bg-card mb-16 rounded-lg border p-8">
          <div className="mb-10 text-center">
            <h3 className="mb-2 text-2xl font-bold">
              Protecting Critical Data
            </h3>
            <p className="text-muted-foreground">
              Our platform processes and safeguards your most sensitive
              information
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
              <h4 className="mb-2 text-lg font-semibold">Sensitive Data</h4>
              <p className="text-muted-foreground text-sm">
                Personal information, financial records, and business data kept
                secure
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Lock className="text-primary h-6 w-6" />
              </div>
              <h4 className="mb-2 text-lg font-semibold">Encrypted Storage</h4>
              <p className="text-muted-foreground text-sm">
                All data encrypted at rest and in transit with advanced
                protocols
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <CheckCircle className="text-primary h-6 w-6" />
              </div>
              <h4 className="mb-2 text-lg font-semibold">Access Controls</h4>
              <p className="text-muted-foreground text-sm">
                Role-based permissions and multi-factor authentication
              </p>
            </div>
          </div>

          <div className="mt-10 border-t pt-8">
            <div className="flex flex-wrap items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="text-muted-foreground text-sm">
                  Protected by
                </div>
                <div className="text-lg font-semibold">
                  Enterprise Security Framework
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 md:flex">
                <div className="bg-muted/30 flex h-12 w-12 items-center justify-center rounded-full">
                  <Lock className="h-6 w-6" />
                </div>
                <div className="bg-muted/30 flex h-12 w-12 items-center justify-center rounded-full">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="bg-muted/30 flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-muted rounded-lg p-8">
          <h3 className="mb-8 text-center text-2xl font-bold">
            Certifications & Compliance
          </h3>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {certifications.map((cert, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-background flex cursor-help flex-col items-center gap-3 rounded-lg border p-4 md:flex-row">
                      {cert.logo}
                      <div className="text-center md:text-left">
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-muted-foreground hidden text-xs md:block">
                          {cert.description}
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="md:hidden">
                    <p>{cert.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-muted-foreground text-center text-sm md:text-left">
              Our security measures and compliance certifications are regularly
              audited by independent third parties.
            </div>
            <a
              href="#"
              className="text-primary text-sm font-medium hover:underline"
            >
              View Security Whitepaper
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
