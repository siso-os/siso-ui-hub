import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table';

// Sample comparison data
const comparisonPoints = [
  {
    id: 1,
    category: 'Quality',
    me: {
      value: 'Custom solutions built specifically for your needs',
      included: true,
    },
    others: {
      value: 'Often pre-made templates with minimal customization',
      included: false,
    },
  },
  {
    id: 2,
    category: 'Communication',
    me: {
      value: 'Direct access to me throughout the entire project',
      included: true,
    },
    others: {
      value: 'Often dealing with account managers or multiple team members',
      included: false,
    },
  },
  {
    id: 3,
    category: 'Turnaround Time',
    me: {
      value: 'Focused attention on your project with quick iterations',
      included: true,
    },
    others: {
      value: 'Can be delayed due to multiple projects and priorities',
      included: false,
    },
  },
  {
    id: 4,
    category: 'Pricing',
    me: {
      value: 'Transparent pricing with no hidden fees',
      included: true,
    },
    others: {
      value: 'Often includes markups or unexpected costs',
      included: false,
    },
  },
  {
    id: 5,
    category: 'Flexibility',
    me: {
      value: 'Adaptable to changes and evolving requirements',
      included: true,
    },
    others: {
      value: 'Usually rigid process with change fees',
      included: false,
    },
  },
];

// Key advantages data
const keyAdvantages = [
  'Personal attention and care for every detail of your project',
  'Direct collaboration with no middlemen or communication barriers',
  'Competitive pricing without the agency overhead costs',
  'Specialized expertise focused on your industry',
  'Faster delivery with efficient workflows',
];

export default function WhyMeVsCompetition() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Why Choose Me
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How I Compare
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Understanding the differences between working with me versus other
            options
          </p>
        </div>

        <div className="mx-auto">
          {/* Comparison Table */}
          <div className="mb-12 overflow-hidden rounded-xl border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[200px]">Comparison Point</TableHead>
                  <TableHead className="text-center">Working With Me</TableHead>
                  <TableHead className="text-center">Other Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonPoints.map((point) => (
                  <TableRow key={point.id}>
                    <TableCell className="font-medium">
                      {point.category}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 mt-0.5 rounded-full p-1">
                          <Check className="text-primary h-4 w-4" />
                        </div>
                        <span>{point.me.value}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="bg-destructive/10 mt-0.5 rounded-full p-1">
                          <X className="text-destructive h-4 w-4" />
                        </div>
                        <span>{point.others.value}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Key Advantages */}
          <div className="bg-card rounded-xl border p-6 shadow-sm">
            <h3 className="mb-6 text-center text-xl font-semibold">
              My Key Advantages
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {keyAdvantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1">
                    <Check className="text-primary h-4 w-4" />
                  </div>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Discuss your project</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
