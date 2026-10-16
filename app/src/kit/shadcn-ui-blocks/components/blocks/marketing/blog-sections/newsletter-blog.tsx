import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  CalendarIcon,
  Clock3Icon,
  MailIcon,
  ChevronRightIcon,
  ArrowUpRightIcon,
  CheckCircle2Icon,
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Marketing: What's Next?",
    excerpt:
      'Explore how artificial intelligence is reshaping marketing strategies and what it means for businesses in 2024.',
    category: 'AI & Technology',
    date: 'April 25, 2023',
    readTime: '8 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Sustainable Marketing: Building a Green Brand',
    excerpt:
      'Learn how to incorporate sustainability into your marketing strategy and appeal to eco-conscious consumers.',
    category: 'Sustainability',
    date: 'April 23, 2023',
    readTime: '6 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 3,
    title: 'Voice Search Optimization: The Next SEO Frontier',
    excerpt:
      'Discover how to optimize your content for voice search and stay ahead of the curve in SEO.',
    category: 'SEO',
    date: 'April 20, 2023',
    readTime: '7 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: 4,
    title: 'The Psychology of Color in Brand Marketing',
    excerpt:
      'Understanding how color choices impact consumer behavior and brand perception.',
    category: 'Branding',
    date: 'April 18, 2023',
    readTime: '5 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
];

const newsletterBenefits = [
  'Weekly marketing insights and trends',
  'Exclusive case studies and success stories',
  'Early access to new content',
  'Free marketing templates and resources',
  'Expert tips and strategies',
];

export default function BlogSectionNewsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">
              Marketing Insights
            </h2>
            <p className="text-muted-foreground">
              Stay ahead of the curve with our latest marketing strategies and
              industry insights.
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col gap-6 sm:flex-row"
              >
                <div className="flex-none sm:w-1/3">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:w-2/3">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline">{post.category}</Badge>
                    {post.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                  <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                    <a href="#">{post.title}</a>
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                      <span className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock3Icon className="mr-1 h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:text-primary"
                      asChild
                    >
                      <a href="#" className="flex items-center gap-1">
                        Read More{' '}
                        <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="w-full max-w-xs" asChild>
              <a href="#">
                View All Articles <ChevronRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Newsletter Sidebar */}
        <div className="space-y-8">
          <Card className="bg-primary/5">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <MailIcon className="text-primary h-5 w-5" />
                <CardTitle>Stay Updated</CardTitle>
              </div>
              <CardDescription>
                Get the latest marketing insights delivered to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Subscribe to Newsletter
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 pt-0">
              <div className="text-muted-foreground text-sm">
                By subscribing, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Newsletter Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {newsletterBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2Icon className="text-primary mt-0.5 h-5 w-5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Categories</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {Array.from(new Set(blogPosts.map((post) => post.category))).map(
                (category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    asChild
                  >
                    <a href="#">{category}</a>
                  </Button>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
