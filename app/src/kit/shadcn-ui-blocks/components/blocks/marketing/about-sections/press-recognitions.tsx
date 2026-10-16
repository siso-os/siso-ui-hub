import { useState } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  ExternalLink,
  Award,
  Newspaper,
  TrendingUp,
  Calendar,
} from 'lucide-react';

// Press coverage data
const pressCategories = [
  {
    id: 'featured',
    label: 'Featured Coverage',
    items: [
      {
        id: 'tech-crunch',
        logo: '/images/logos/techcrunch.svg', // Placeholder, use actual logo
        logoFallback: 'TC',
        publisher: 'TechCrunch',
        date: 'May 15, 2023',
        title:
          'This Startup Is Revolutionizing How Companies Approach Digital Transformation',
        excerpt:
          'In a rapidly evolving tech landscape, this company stands out by offering a unique approach to helping businesses navigate digital transformation challenges.',
        link: '#',
        featured: true,
      },
      {
        id: 'forbes',
        logo: '/images/logos/forbes.svg', // Placeholder, use actual logo
        logoFallback: 'F',
        publisher: 'Forbes',
        date: 'March 8, 2023',
        title: 'The Top Innovators Redefining Technology in 2023',
        excerpt:
          'Among the most innovative companies of the year, this organization is leading the charge with groundbreaking solutions to long-standing industry problems.',
        link: '#',
        featured: true,
      },
      {
        id: 'wired',
        logo: '/images/logos/wired.svg', // Placeholder, use actual logo
        logoFallback: 'W',
        publisher: 'Wired',
        date: 'January 22, 2023',
        title:
          'The Future of Work: How This Company Is Building Tools for Tomorrow',
        excerpt:
          'A deep dive into how cutting-edge technology is being applied to create the workplace tools that will define how we collaborate in the coming decade.',
        link: '#',
        featured: true,
      },
    ],
  },
  {
    id: 'recent',
    label: 'Recent Mentions',
    items: [
      {
        id: 'zdnet',
        logo: '/images/logos/zdnet.svg', // Placeholder, use actual logo
        logoFallback: 'Z',
        publisher: 'ZDNet',
        date: 'June 5, 2023',
        title: 'New Partnership Aims to Bridge Enterprise Technology Gaps',
        excerpt:
          'The strategic alliance announced this week could reshape how enterprise software is delivered and supported.',
        link: '#',
      },
      {
        id: 'bloomberg',
        logo: '/images/logos/bloomberg.svg', // Placeholder, use actual logo
        logoFallback: 'B',
        publisher: 'Bloomberg',
        date: 'May 30, 2023',
        title:
          'Tech Company Exceeds Growth Projections for Third Consecutive Quarter',
        excerpt:
          'Analysts are taking notice as financial results continue to impress investors and exceed market expectations.',
        link: '#',
      },
      {
        id: 'fast-company',
        logo: '/images/logos/fastcompany.svg', // Placeholder, use actual logo
        logoFallback: 'FC',
        publisher: 'Fast Company',
        date: 'May 18, 2023',
        title:
          'How This Leadership Team Is Building Culture in a Hybrid Work World',
        excerpt:
          'An inside look at the innovative approaches to maintaining company culture while supporting remote and in-office work.',
        link: '#',
      },
      {
        id: 'venturebeat',
        logo: '/images/logos/venturebeat.svg', // Placeholder, use actual logo
        logoFallback: 'VB',
        publisher: 'VentureBeat',
        date: 'May 10, 2023',
        title:
          'Product Update Introduces AI-Powered Features for Business Users',
        excerpt:
          'The latest release includes several AI enhancements designed to streamline workflow and improve productivity.',
        link: '#',
      },
    ],
  },
  {
    id: 'awards',
    label: 'Awards & Recognition',
    items: [
      {
        id: 'best-places',
        logo: '/images/logos/inc.svg', // Placeholder, use actual logo
        logoFallback: 'Inc',
        publisher: 'Inc. Magazine',
        date: 'April 2023',
        title: 'Best Places to Work 2023',
        excerpt:
          'Recognized for exceptional workplace culture, employee satisfaction, and innovative benefits programs.',
        link: '#',
        type: 'award',
      },
      {
        id: 'innovation-award',
        logo: '/images/logos/fastcompany.svg', // Placeholder, use actual logo
        logoFallback: 'FC',
        publisher: 'Fast Company',
        date: 'March 2023',
        title: 'Most Innovative Companies 2023',
        excerpt:
          'Named among the top 50 companies making the most profound impact on both industry and culture.',
        link: '#',
        type: 'award',
      },
      {
        id: 'sustainability',
        logo: '/images/logos/wsj.svg', // Placeholder, use actual logo
        logoFallback: 'WSJ',
        publisher: 'Wall Street Journal',
        date: 'February 2023',
        title: 'Sustainability Leaders Index',
        excerpt:
          'Highlighted for commitment to environmental sustainability and corporate social responsibility initiatives.',
        link: '#',
        type: 'award',
      },
      {
        id: 'design-excellence',
        logo: '/images/logos/webby.svg', // Placeholder, use actual logo
        logoFallback: 'W',
        publisher: 'Webby Awards',
        date: 'January 2023',
        title: 'Excellence in Product Design',
        excerpt:
          'Award-winning user interface and experience design recognized for both aesthetics and functionality.',
        link: '#',
        type: 'award',
      },
    ],
  },
];

export default function AboutSectionPressRecognitions() {
  const [activeTab, setActiveTab] = useState('featured');

  // Function to render logo placeholder if image isn't available
  const LogoPlaceholder = ({ fallback }: { fallback: string }) => (
    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-md">
      <span className="text-primary text-xs font-bold">{fallback}</span>
    </div>
  );

  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
          Press & Recognition
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Our Story in the Media
        </h2>
        <p className="text-muted-foreground">
          See what journalists, analysts, and industry experts are saying about
          our company, products, and impact in the technology landscape.
        </p>
      </div>

      {/* Featured press card - always visible */}
      <div className="bg-accent/30 rounded-xl p-6 lg:p-8">
        <div className="mb-4 flex items-center gap-3">
          <LogoPlaceholder fallback="FT" />
          <div>
            <p className="font-medium">Financial Times</p>
            <p className="text-muted-foreground text-sm">
              Special Report · June 12, 2023
            </p>
          </div>
          <Badge variant="outline" className="ml-auto">
            Featured
          </Badge>
        </div>
        <h3 className="mb-3 text-2xl font-bold">
          &quot;Redefining What&apos;s Possible in Enterprise Software&quot;
        </h3>
        <p className="text-muted-foreground mb-6">
          &quot;In a comprehensive analysis of the evolving enterprise software
          landscape, this company stands out for its innovative approach to
          solving complex business challenges. Their unique combination of
          advanced technology and intuitive design is setting new standards for
          what businesses can expect from their software partners.&quot;
        </p>
        <Button asChild variant="outline" className="gap-2">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Read full article
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Tabs for different categories */}
      <div className="mt-16">
        <Tabs
          defaultValue="featured"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Dropdown for mobile */}
          <div className="mb-6 w-full md:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {pressCategories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2">
                      {category.id === 'featured' && (
                        <TrendingUp className="h-4 w-4" />
                      )}
                      {category.id === 'recent' && (
                        <Newspaper className="h-4 w-4" />
                      )}
                      {category.id === 'awards' && (
                        <Award className="h-4 w-4" />
                      )}
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabs list for desktop */}
          <div className="mb-8 hidden justify-center md:flex">
            <TabsList>
              {pressCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  {category.id === 'featured' && (
                    <TrendingUp className="h-4 w-4" />
                  )}
                  {category.id === 'recent' && (
                    <Newspaper className="h-4 w-4" />
                  )}
                  {category.id === 'awards' && <Award className="h-4 w-4" />}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {pressCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {category.items.map((item) => (
                  <Card key={item.id} className="p-0">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <LogoPlaceholder fallback={item.logoFallback} />
                        <div className="flex-1">
                          <p className="font-medium">{item.publisher}</p>
                          <div className="text-muted-foreground flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </div>
                        </div>
                        {'type' in item && item.type === 'award' && (
                          <Award className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <h3 className="mb-2 font-bold">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {item.excerpt}
                      </p>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="hover:text-primary gap-1"
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read more
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" className="gap-2">
          <a href="#">View our press kit</a>
        </Button>
      </div>
    </section>
  );
}
