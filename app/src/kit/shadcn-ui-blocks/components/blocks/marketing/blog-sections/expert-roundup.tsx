import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardFooter } from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { ExternalLink, BookOpen, MessageCircle, Quote, ThumbsUp, Share2 } from 'lucide-react';
import { Linkedin, Twitter } from '../../../ui/brand-icons';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

// Types
interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  bio: string;
  response: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface ExpertRoundupData {
  id: string;
  title: string;
  subtitle: string;
  topic: string;
  introText: string;
  question: string;
  publishDate: string;
  categories: string[];
  experts: Expert[];
  conclusion: string;
}

// Sample data
const expertRoundupData: ExpertRoundupData = {
  id: 'content-marketing-trends-2023',
  title: 'Content Marketing Trends for 2023',
  subtitle: '12 Industry Experts Share Their Predictions',
  topic: 'Content Marketing',
  introText:
    "As we move further into the digital age, content marketing continues to evolve at a rapid pace. To help you stay ahead of the curve, we've reached out to leading experts in the field to get their insights on the most important trends shaping content marketing in 2023 and beyond.",
  question:
    'What do you believe will be the biggest trend or shift in content marketing strategy for 2023?',
  publishDate: 'January 15, 2023',
  categories: ['Content Marketing', 'Industry Trends', 'Expert Opinions'],
  experts: [
    {
      id: 'expert-1',
      name: 'Alex Reynolds',
      title: 'Chief Marketing Officer',
      company: 'GrowthLab Digital',
      avatarUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      bio: 'Alex has over 15 years of experience in digital marketing and has helped scale content operations for several Fortune 500 companies.',
      response:
        "The biggest shift I'm seeing is towards what I call 'content atomization' – creating a single, comprehensive piece of content and then breaking it down into dozens of micro-content pieces optimized for different platforms and formats. This approach maximizes ROI on content creation while addressing the decreasing attention spans across digital channels. Companies that master this approach will see 3-5x more engagement from the same content investment.",
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        website: '#',
      },
    },
    {
      id: 'expert-2',
      name: 'Sophia Chen',
      title: 'Content Strategy Director',
      company: 'TechInnovate',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      bio: 'Sophia specializes in B2B content strategy and has pioneered several data-driven approaches to content optimization.',
      response:
        "AI-assisted content creation will become mainstream, but not in the way most people think. The best content teams won't use AI to replace writers but to enhance human creativity and productivity. I expect to see content teams using AI for research, outlining, editing, and personalization at scale, while keeping human creativity at the core. This hybrid approach will allow brands to produce more personalized content without losing authenticity.",
      socialLinks: {
        linkedin: '#',
        website: '#',
      },
    },
    {
      id: 'expert-3',
      name: 'Marcus Johnson',
      title: 'Founder',
      company: 'ContentScale Academy',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      bio: 'Marcus runs one of the most popular content marketing education platforms, training over 50,000 marketers annually.',
      response:
        "User-generated content will evolve from a nice-to-have to a strategic necessity. As consumer trust in branded content continues to decline, smart companies will build systematic approaches to cultivate, curate, and amplify authentic customer voices. This isn't just about collecting reviews – it's about building community-driven content programs that turn customers into contributors and advocates. The brands that do this well will see dramatic improvements in both trust metrics and conversion rates.",
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        website: '#',
      },
    },
    {
      id: 'expert-4',
      name: 'Priya Sharma',
      title: 'VP of Content',
      company: 'GlobalReach Media',
      avatarUrl:
        'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=200&auto=format&fit=crop',
      bio: 'Priya has led content strategy for multinational brands across APAC, Europe, and North America.',
      response:
        "Content localization is becoming more sophisticated and essential. It's no longer enough to simply translate content for different markets – you need to culturally adapt it while maintaining brand consistency. I'm seeing leading companies invest in AI-powered localization tools combined with local content creators to produce truly resonant content for each market. This 'glocal' approach – global strategy with local execution – will be critical for brands with international ambitions.",
      socialLinks: {
        linkedin: '#',
        website: '#',
      },
    },
    {
      id: 'expert-5',
      name: 'David Ogilvy',
      title: 'Content Intelligence Lead',
      company: 'DataDriven Content',
      avatarUrl:
        'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=200&auto=format&fit=crop',
      bio: 'David combines content expertise with data science to help companies optimize their content performance.',
      response:
        "Real-time content optimization based on audience behavior will become the new standard. Static content calendars planned months in advance will give way to more dynamic approaches that respond to audience signals. The most successful content teams will build systems that can quickly identify trending topics, test multiple angles, and double down on what's working. This requires not just new tools but a cultural shift toward more agile content operations.",
      socialLinks: {
        twitter: '#',
        linkedin: '#',
      },
    },
    {
      id: 'expert-6',
      name: 'Emma Wilson',
      title: 'Founder & Content Strategist',
      company: 'Narrative Studio',
      avatarUrl:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      bio: 'Emma helps brands develop distinctive voices and narrative frameworks that build audience connection.',
      response:
        "The pendulum is swinging back toward quality over quantity. After years of content saturation, audiences are becoming more selective, and algorithm changes across platforms are increasingly rewarding depth and expertise. I'm advising clients to produce fewer pieces but invest more in each one – more original research, more thoughtful analysis, more memorable storytelling. This approach not only performs better but is more sustainable for content teams facing burnout from constant production demands.",
      socialLinks: {
        twitter: '#',
        website: '#',
      },
    },
  ],
  conclusion:
    "While each expert brings a unique perspective, several common themes emerge from their predictions. The focus on quality over quantity, the strategic integration of AI tools, and the importance of authentic human connection all point to a more mature phase of content marketing. As the field continues to evolve, successful marketers will need to balance technological innovation with timeless principles of valuable, audience-focused content. By incorporating these insights into your 2023 strategy, you'll be well-positioned to stay ahead of the curve in the changing content landscape.",
};

export default function BlogSectionExpertRoundup() {
  const {
    title,
    subtitle,
    topic,
    introText,
    question,
    publishDate,
    categories,
    experts,
    conclusion,
  } = expertRoundupData;

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <Badge variant="outline" className="text-sm">
              {topic}
            </Badge>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mx-auto mb-6 max-w-3xl text-xl">
            {subtitle}
          </p>
          <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            <span>Published: {publishDate}</span>
            <span className="text-xs">•</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto gap-1 p-0 text-sm font-normal"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <div className="prose prose-lg mb-8 max-w-none">
            <p>{introText}</p>
          </div>

          <div className="bg-muted/50 rounded-lg border p-6">
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <MessageCircle className="text-primary h-5 w-5" />
              Our Question to the Experts
            </h2>
            <p className="text-lg font-medium italic">&quot;{question}&quot;</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        {/* Expert responses - Mobile tabs */}
        <div className="mb-16 block md:hidden">
          <Tabs defaultValue={experts[0]!.id} className="w-full">
            <TabsList className="mb-6 flex h-auto w-full overflow-auto pb-px">
              {experts.map((expert) => (
                <TabsTrigger
                  key={expert.id}
                  value={expert.id}
                  className="flex flex-shrink-0 items-center gap-2 py-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                    <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{expert.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {experts.map((expert) => (
              <TabsContent key={expert.id} value={expert.id} className="mt-0">
                <ExpertCard expert={expert} />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Expert responses - Desktop */}
        <div className="hidden md:block">
          <div className="mb-16 grid gap-8">
            {experts.map((expert, index) => (
              <ExpertCard key={expert.id} expert={expert} index={index + 1} />
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="text-primary h-5 w-5" />
            Key Takeaways
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>{conclusion}</p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Button className="gap-2">
            Subscribe for More Industry Insights
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// Expert card component
function ExpertCard({ expert, index }: { expert: Expert; index?: number }) {
  const { name, title, company, avatarUrl, bio, response, socialLinks } =
    expert;

  return (
    <Card className="overflow-hidden p-0">
      <div className="md:flex">
        {/* Expert info */}
        <div className="bg-muted/30 p-6 md:w-72 md:flex-shrink-0">
          <div className="mb-4 flex items-start gap-4 md:flex-col">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              {index && (
                <Badge variant="outline" className="mb-2">
                  Expert #{index}
                </Badge>
              )}
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-muted-foreground text-sm">{title}</p>
              <p className="text-muted-foreground text-sm">{company}</p>
            </div>
          </div>

          <p className="mb-4 text-sm">{bio}</p>

          {socialLinks && (
            <div className="flex gap-2">
              {socialLinks.twitter && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={socialLinks.twitter}>
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {socialLinks.linkedin && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={socialLinks.linkedin}>
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {socialLinks.website && (
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a href={socialLinks.website}>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Expert response */}
        <div className="p-6 md:flex-1">
          <div className="relative mb-6">
            <Quote className="text-primary/20 absolute -top-2 -left-2 h-8 w-8" />
            <div className="prose prose-quoteless pt-2 pl-4">
              <p className="italic">{response}</p>
            </div>
          </div>

          <CardFooter className="flex-wrap justify-between gap-4 border-t px-0 pt-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ThumbsUp className="h-4 w-4" />
                Helpful
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            <Button variant="link" size="sm" className="h-8 p-0">
              View more from {name}
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

// Basic prose styles
const styles = `
.prose { color: var(--foreground); }
.prose p { margin-bottom: 1.25em; }
.prose h1, .prose h2, .prose h3 { color: var(--foreground); margin-bottom: 0.8em; }
.prose a { color: var(--primary); text-decoration: none; }
.prose a:hover { text-decoration: underline; }
.prose-quoteless p { quotes: none; }
.prose-quoteless p:before, .prose-quoteless p:after { content: none; }
`;

if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
