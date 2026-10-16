import { useState } from 'react';

import { ArrowRight, Check, HelpCircle, Info, X } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';

export default function FeatureComparisonTable() {
  const [activeTier, setActiveTier] = useState<string>('premium');

  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$149',
      description: 'All the essentials for daily commuting',
      image:
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$249',
      description: 'Advanced features for the cycling enthusiast',
      image:
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1976&auto=format&fit=crop',
      popular: true,
    },
    {
      id: 'elite',
      name: 'Elite Carbon',
      price: '$399',
      description: 'Professional grade components for serious riders',
      image:
        'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070&auto=format&fit=crop',
      popular: false,
    },
  ];

  const featureCategories = [
    {
      name: 'Frame & Construction',
      features: [
        {
          name: 'Frame Material',
          values: {
            basic: 'Aluminum Alloy',
            premium: 'Hydroformed Aluminum',
            elite: 'Carbon Fiber Composite',
          },
          tooltip: 'The primary material used in the bike frame construction',
        },
        {
          name: 'Weight',
          values: {
            basic: '12.5 kg (27.5 lbs)',
            premium: '10.2 kg (22.5 lbs)',
            elite: '8.3 kg (18.3 lbs)',
          },
          tooltip: 'Total weight of the assembled bicycle',
        },
        {
          name: 'Internal Cable Routing',
          values: {
            basic: false,
            premium: true,
            elite: true,
          },
          tooltip:
            'Cables run inside the frame for a cleaner look and protection',
        },
      ],
    },
    {
      name: 'Components',
      features: [
        {
          name: 'Drivetrain',
          values: {
            basic: 'Shimano Altus (8-speed)',
            premium: 'Shimano Deore (10-speed)',
            elite: 'Shimano XT (12-speed)',
          },
          tooltip: 'The gear and shifting system',
        },
        {
          name: 'Brakes',
          values: {
            basic: 'Mechanical Disc',
            premium: 'Hydraulic Disc',
            elite: 'Shimano XT Hydraulic Disc',
          },
          tooltip: 'Brake system type and quality',
        },
        {
          name: 'Wheelset',
          values: {
            basic: 'Aluminum Double Wall',
            premium: 'Tubeless Ready Aluminum',
            elite: 'Carbon Fiber Tubeless Ready',
          },
          tooltip: 'Type and material of the wheels',
        },
      ],
    },
    {
      name: 'Comfort & Accessories',
      features: [
        {
          name: 'Suspension Fork',
          values: {
            basic: '100mm Travel',
            premium: '120mm Travel, Adjustable',
            elite: '120mm Travel, Fully Adjustable',
          },
          tooltip: 'Front suspension system for absorbing impacts',
        },
        {
          name: 'Dropper Seatpost',
          values: {
            basic: false,
            premium: true,
            elite: true,
          },
          tooltip:
            'Height-adjustable seatpost that can be controlled while riding',
        },
        {
          name: 'Tubeless Tires',
          values: {
            basic: false,
            premium: true,
            elite: true,
          },
          tooltip:
            "Tires that don't use inner tubes, providing better puncture resistance",
        },
      ],
    },
    {
      name: 'Support & Warranty',
      features: [
        {
          name: 'Frame Warranty',
          values: {
            basic: '5 Years',
            premium: 'Lifetime',
            elite: 'Lifetime',
          },
          tooltip: 'Length of manufacturer warranty on the frame',
        },
        {
          name: 'Components Warranty',
          values: {
            basic: '1 Year',
            premium: '2 Years',
            elite: '3 Years',
          },
          tooltip: 'Length of manufacturer warranty on components',
        },
        {
          name: 'Professional Bike Fitting',
          values: {
            basic: false,
            premium: true,
            elite: true,
          },
          tooltip: 'Expert service to adjust the bike to your body dimensions',
        },
      ],
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center space-y-4 text-center md:mb-16">
          <Badge className="px-3.5 py-1.5">Compare Models</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Find your perfect ride
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed">
            Compare our mountain bike models to find the right balance of
            performance and value for your riding style.
          </p>
        </div>

        {/* Product tier selector for mobile */}
        <div className="mb-8 md:hidden">
          <select
            className="w-full rounded-md border p-2"
            value={activeTier}
            onChange={(e) => setActiveTier(e.target.value)}
          >
            {tiers.map((tier) => (
              <option key={tier.id} value={tier.id}>
                {tier.name} - {tier.price}
              </option>
            ))}
          </select>
        </div>

        {/* Product tier cards */}
        <div className="mb-8 hidden grid-cols-4 gap-4 md:grid">
          <div className="flex items-end p-6">
            <h3 className="text-xl font-semibold">Mountain Bike Models</h3>
          </div>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex h-full flex-col rounded-xl border p-6 transition-all ${
                tier.id === activeTier
                  ? 'ring-primary shadow-lg ring-2'
                  : 'hover:border-primary/50 cursor-pointer hover:shadow-md'
              }`}
              onClick={() => setActiveTier(tier.id)}
            >
              {tier.popular && (
                <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 px-3 py-1">
                  Most Popular
                </Badge>
              )}
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg">
                <img
                  src={tier.image}
                  alt={tier.name}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold">{tier.price}</span>
              </div>
              <p className="text-muted-foreground mt-2 flex-grow text-sm">
                {tier.description}
              </p>
              <Button
                variant={tier.id === activeTier ? 'default' : 'outline'}
                size="sm"
                className="mt-4"
                asChild
              >
                <a href="#">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Mobile comparison for selected tier */}
        <div className="space-y-8 md:hidden">
          {featureCategories.map((category) => (
            <div key={category.name} className="space-y-4">
              <h3 className="border-b pb-2 text-lg font-semibold">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.features.map((feature) => (
                  <div key={feature.name} className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <span>{feature.name}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="text-muted-foreground h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              {feature.tooltip}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div>
                      {typeof feature.values[
                        activeTier as keyof typeof feature.values
                      ] === 'boolean' ? (
                        feature.values[
                          activeTier as keyof typeof feature.values
                        ] ? (
                          <Check className="text-primary h-5 w-5" />
                        ) : (
                          <X className="text-muted-foreground h-5 w-5" />
                        )
                      ) : (
                        <span>
                          {
                            feature.values[
                              activeTier as keyof typeof feature.values
                            ]
                          }
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop comparison table */}
        <div className="hidden overflow-x-auto md:block">
          <TooltipProvider>
            <Table className="border-collapse">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-1/4">Feature Categories</TableHead>
                  {tiers.map((tier) => (
                    <TableHead
                      key={tier.id}
                      className={`text-center ${
                        tier.id === activeTier ? 'bg-primary/5' : ''
                      }`}
                    >
                      {tier.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureCategories.map((category, categoryIndex) => (
                  <>
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={4} className="text-base font-medium">
                        {category.name}
                      </TableCell>
                    </TableRow>
                    {category.features.map((feature, featureIndex) => (
                      <TableRow
                        key={`${categoryIndex}-${featureIndex}`}
                        className={`${
                          featureIndex === category.features.length - 1 &&
                          categoryIndex !== featureCategories.length - 1
                            ? 'border-border border-b-2'
                            : ''
                        }`}
                      >
                        <TableCell className="flex items-center gap-2 font-medium">
                          {feature.name}
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="text-muted-foreground h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-sm">
                                {feature.tooltip}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {tiers.map((tier) => (
                          <TableCell
                            key={`${feature.name}-${tier.id}`}
                            className={`text-center ${
                              tier.id === activeTier ? 'bg-primary/5' : ''
                            }`}
                          >
                            {typeof feature.values[
                              tier.id as keyof typeof feature.values
                            ] === 'boolean' ? (
                              feature.values[
                                tier.id as keyof typeof feature.values
                              ] ? (
                                <div className="flex justify-center">
                                  <Check className="text-primary h-5 w-5" />
                                </div>
                              ) : (
                                <div className="flex justify-center">
                                  <X className="text-muted-foreground h-5 w-5" />
                                </div>
                              )
                            ) : (
                              <span>
                                {
                                  feature.values[
                                    tier.id as keyof typeof feature.values
                                  ]
                                }
                              </span>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>

        {/* CTA section */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="text-xl font-semibold">Ready to hit the trails?</h3>
          <p className="text-muted-foreground max-w-[600px]">
            All bikes come with free shipping, professional assembly, and a
            30-day test ride guarantee.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Shop {tiers.find((t) => t.id === activeTier)?.name || 'Premium'}{' '}
                Model
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Schedule Test Ride</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
