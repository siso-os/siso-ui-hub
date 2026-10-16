import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { CalendarIcon, Clock3Icon, ArrowRightIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

// Define blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  month: string;
  readTime: string;
  imageUrl: string;
}

const allPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of AI in Marketing: Predictions for 2023',
    excerpt:
      'Explore how artificial intelligence is transforming marketing strategies and what to expect in the coming year.',
    category: 'AI & Technology',
    date: 'April 10, 2023',
    month: 'April',
    readTime: '10 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Customer Retention Strategies That Actually Work',
    excerpt:
      'Discover proven tactics to keep your customers coming back and increase lifetime value.',
    category: 'Customer Success',
    date: 'April 3, 2023',
    month: 'April',
    readTime: '8 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    title: 'How to Build a Strong Brand Identity in 2023',
    excerpt:
      'Learn the essential elements of creating a memorable brand that resonates with your target audience.',
    category: 'Branding',
    date: 'March 25, 2023',
    month: 'March',
    readTime: '12 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 4,
    title: 'Social Media Marketing Strategies for Small Businesses',
    excerpt:
      'Practical social media tactics that small businesses can implement without big budgets.',
    category: 'Social Media',
    date: 'March 18, 2023',
    month: 'March',
    readTime: '7 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: 5,
    title: 'Email Automation: Setting Up Effective Drip Campaigns',
    excerpt:
      'Step-by-step guide to creating email sequences that nurture leads and drive conversions.',
    category: 'Email Marketing',
    date: 'February 28, 2023',
    month: 'February',
    readTime: '9 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: 6,
    title: 'Content Marketing ROI: Measuring What Matters',
    excerpt:
      'Learn how to track and analyze the true impact of your content marketing efforts.',
    category: 'Content',
    date: 'February 15, 2023',
    month: 'February',
    readTime: '11 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const recentPosts = allPosts.slice(0, 4);
const popularPosts = [allPosts[2]!, allPosts[4]!, allPosts[0]!, allPosts[5]!];

export default function BlogSectionTimeline() {
  // Group posts by month
  const groupedByMonth = allPosts.reduce<Record<string, BlogPost[]>>(
    (acc, post) => {
      if (!acc[post.month]) {
        acc[post.month] = [];
      }
      acc[post.month]!.push(post);
      return acc;
    },
    {}
  );

  // Sort months chronologically (newest first)
  const months = Object.keys(groupedByMonth).sort((a, b) => {
    const monthOrder = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthOrder.indexOf(b) - monthOrder.indexOf(a);
  });

  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Marketing Insights Timeline
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Stay up to date with our latest marketing articles, tips, and
          strategies.
        </p>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-8">
          <div className="space-y-12">
            {months.map((month) => (
              <div key={month} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold">{month}</h3>
                  <div className="bg-border h-px flex-grow"></div>
                </div>

                <div className="border-muted space-y-8 border-l-2 pl-4">
                  {groupedByMonth[month]!.map((post) => (
                    <div key={post.id} className="timeline-item relative">
                      {/* Timeline dot */}
                      <div className="bg-primary border-background absolute top-0 -left-[25px] h-4 w-4 rounded-full border-4"></div>

                      <div className="relative grid gap-6 md:grid-cols-3">
                        <div className="relative aspect-video overflow-hidden rounded-lg md:col-span-1">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-4 md:col-span-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge>{post.category}</Badge>
                            <div className="text-muted-foreground flex items-center text-sm">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              <span>{post.date}</span>
                            </div>
                            <div className="text-muted-foreground flex items-center text-sm">
                              <Clock3Icon className="mr-1 h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground">
                            {post.excerpt}
                          </p>

                          <Button variant="link" className="px-0" asChild>
                            <a href="#">
                              Read Article{' '}
                              <ArrowRightIcon className="ml-1 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-start gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="mb-1">
                    {post.category}
                  </Badge>
                  <h3 className="line-clamp-2 font-medium">{post.title}</h3>
                  <div className="text-muted-foreground flex items-center text-sm">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <Button variant="link" className="h-auto px-0" asChild>
                    <a href="#">Read More</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {popularPosts.map((post) => (
              <div key={post.id} className="flex items-start gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="mb-1">
                    {post.category}
                  </Badge>
                  <h3 className="line-clamp-2 font-medium">{post.title}</h3>
                  <div className="text-muted-foreground flex items-center text-sm">
                    <Clock3Icon className="mr-1 h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="link" className="h-auto px-0" asChild>
                    <a href="#">Read More</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button className="w-full max-w-sm">
          <a href="#">View All Articles</a>
        </Button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .timeline-item {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
