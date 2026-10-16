import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  Globe,
  LifeBuoy,
  Lock,
  Mail,
  MessageSquareText,
  PenTool,
  Receipt,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Star,
  Users2,
  Wrench,
} from 'lucide-react';

interface IconFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  features: IconFeature[];
}

export default function IconTabsCategories() {
  const categories: FeatureCategory[] = [
    {
      id: 'business',
      name: 'Business',
      description:
        "Essential features to help your business grow and succeed in today's competitive market.",
      features: [
        {
          icon: <Building2 className="h-5 w-5" />,
          title: 'Company Management',
          description:
            'Comprehensive tools to organize and manage your company structure efficiently.',
        },
        {
          icon: <CircleDollarSign className="h-5 w-5" />,
          title: 'Finance Tracking',
          description:
            'Real-time monitoring of revenue, expenses, and financial performance.',
        },
        {
          icon: <Receipt className="h-5 w-5" />,
          title: 'Invoicing',
          description:
            'Create and send professional invoices with automated payment reminders.',
        },
        {
          icon: <BriefcaseBusiness className="h-5 w-5" />,
          title: 'Client Management',
          description:
            'Organize client information and track engagement history in one place.',
        },
        {
          icon: <BarChart3 className="h-5 w-5" />,
          title: 'Performance Analytics',
          description:
            'Detailed insights and reporting to measure business performance.',
        },
        {
          icon: <Calendar className="h-5 w-5" />,
          title: 'Scheduling',
          description:
            'Efficiently manage appointments, meetings, and team availability.',
        },
      ],
    },
    {
      id: 'technology',
      name: 'Technology',
      description:
        'Cutting-edge technology features designed to enhance productivity and streamline operations.',
      features: [
        {
          icon: <Globe className="h-5 w-5" />,
          title: 'Cloud Integration',
          description:
            'Seamlessly connect with popular cloud services for data synchronization.',
        },
        {
          icon: <Lock className="h-5 w-5" />,
          title: 'Advanced Security',
          description:
            'Enterprise-grade encryption and protection for sensitive information.',
        },
        {
          icon: <Smartphone className="h-5 w-5" />,
          title: 'Mobile Optimization',
          description:
            'Fully responsive design that works perfectly on any device.',
        },
        {
          icon: <SearchCheck className="h-5 w-5" />,
          title: 'Smart Search',
          description:
            'AI-powered search functionality that learns from user behavior.',
        },
        {
          icon: <Wrench className="h-5 w-5" />,
          title: 'API Access',
          description:
            'Integrate our platform with your existing tools and workflows.',
        },
        {
          icon: <ClipboardList className="h-5 w-5" />,
          title: 'Version Control',
          description: 'Track changes and maintain document history with ease.',
        },
      ],
    },
    {
      id: 'support',
      name: 'Support',
      description:
        'Comprehensive support features to ensure you have help whenever you need it.',
      features: [
        {
          icon: <MessageSquareText className="h-5 w-5" />,
          title: 'Live Chat',
          description:
            'Connect with our support team instantly through our real-time chat system.',
        },
        {
          icon: <Mail className="h-5 w-5" />,
          title: 'Email Support',
          description:
            'Detailed responses to your inquiries with 24-hour turnaround time.',
        },
        {
          icon: <LifeBuoy className="h-5 w-5" />,
          title: 'Help Center',
          description:
            'Extensive knowledge base with guides, tutorials, and FAQs.',
        },
        {
          icon: <Users2 className="h-5 w-5" />,
          title: 'Community Forum',
          description:
            'Connect with other users to share tips and solve problems together.',
        },
        {
          icon: <ShieldCheck className="h-5 w-5" />,
          title: 'Priority Support',
          description:
            'Dedicated support agents for premium customers with expedited response times.',
        },
        {
          icon: <PenTool className="h-5 w-5" />,
          title: 'Custom Solutions',
          description:
            'Tailored support for your specific business needs and challenges.',
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(categories[0]!.id);

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Categories</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explore our features
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Discover our full suite of tools organized by category to help you
            find exactly what you need.
          </p>
        </div>

        <Tabs
          defaultValue={categories[0]!.id}
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="flex justify-center">
            <TabsList className="grid h-fit w-full max-w-md grid-cols-3">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-sm md:text-base"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-8"
            >
              <div className="text-center">
                <h3 className="mb-2 text-xl font-semibold">
                  {category.name} Features
                </h3>
                <p className="text-muted-foreground mx-auto max-w-2xl">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {category.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group bg-card hover:border-primary/50 flex flex-col rounded-lg border p-6 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200">
                      {feature.icon}
                    </div>
                    <h4 className="mb-2 text-lg font-medium">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 flex-1 text-sm">
                      {feature.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group mt-auto w-fit"
                    >
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button asChild>
                  <a href="#">
                    Explore all {category.name.toLowerCase()} features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Testimonial */}
        <div className="mt-24 text-center">
          <div className="bg-card relative mx-auto max-w-[800px] rounded-lg border p-8 shadow-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-background flex h-6 w-6 items-center justify-center rounded-full border">
                <Star className="fill-primary text-primary h-3 w-3" />
              </div>
            </div>

            <blockquote className="text-muted-foreground relative text-lg font-medium italic">
              &ldquo;The categorized feature set has been a game-changer for our
              team. We can quickly find the tools we need and implement them
              into our workflow without any hassle.&rdquo;
            </blockquote>

            <div className="mt-6">
              <p className="font-medium">Alex Morgan</p>
              <p className="text-muted-foreground text-sm">
                Product Manager at TechCorp
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
