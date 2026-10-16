import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import {
  CalendarIcon,
  Clock3Icon,
  ArrowRightIcon,
  TrendingUpIcon,
  StarIcon,
  BookmarkIcon,
} from 'lucide-react';

// Define blog post types
interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: Author;
}

const featuredPost: BlogPost = {
  id: 1,
  title: 'The Future of Digital Marketing: Trends to Watch in 2023',
  excerpt:
    'Explore the emerging technologies and strategies that will shape the digital marketing landscape in the coming year.',
  category: 'Strategy',
  date: 'April 15, 2023',
  readTime: '14 min read',
  imageUrl:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  author: {
    name: 'Jessica Morgan',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  },
};

const popularPosts: BlogPost[] = [
  {
    id: 2,
    title: 'Why Personalization is the Key to Customer Engagement',
    excerpt:
      'Learn how data-driven personalization can dramatically improve your marketing results and customer loyalty.',
    category: 'Personalization',
    date: 'April 12, 2023',
    readTime: '9 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: {
      name: 'David Chen',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 3,
    title:
      'Voice Search Optimization: Preparing Your Content for the Voice Revolution',
    excerpt:
      'Discover strategies to optimize your content for voice search and stay ahead of this rapidly growing trend.',
    category: 'SEO',
    date: 'April 8, 2023',
    readTime: '11 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: {
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
];

const latestPosts: BlogPost[] = [
  {
    id: 4,
    title: 'Social Media Algorithms: Understanding the Changes in 2023',
    excerpt:
      'Stay updated on the latest algorithm changes across major social platforms and how to adapt your strategy.',
    category: 'Social Media',
    date: 'April 10, 2023',
    readTime: '8 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    author: {
      name: 'Michael Thomas',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 5,
    title: 'Interactive Content: Boosting Engagement with Quizzes and Polls',
    excerpt:
      'Learn how to create interactive content that captivates your audience and increases time spent on your site.',
    category: 'Content',
    date: 'April 5, 2023',
    readTime: '10 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: {
      name: 'Emily Wilson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 6,
    title: 'Email Deliverability: Ensuring Your Messages Reach the Inbox',
    excerpt:
      'Discover best practices and techniques to improve your email deliverability rates and avoid the spam folder.',
    category: 'Email',
    date: 'April 2, 2023',
    readTime: '7 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    author: {
      name: 'Alex Rivera',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 7,
    title: 'Video Marketing: Creating Content That Converts',
    excerpt:
      'Explore strategies for developing video content that not only engages viewers but drives them to take action.',
    category: 'Video',
    date: 'March 28, 2023',
    readTime: '12 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    author: {
      name: 'Jason Park',
      avatar:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
];

export default function BlogSectionFeaturedList() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Marketing Insights
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Expert advice, analysis, and strategies to elevate your marketing
          game.
        </p>
      </div>

      {/* Featured Article */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <StarIcon className="text-primary h-5 w-5" />
          <h3 className="text-xl font-semibold">Featured Article</h3>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl lg:col-span-3 lg:aspect-auto">
            <img
              src={featuredPost.imageUrl}
              alt={featuredPost.title}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
              <Badge className="mb-3">{featuredPost.category}</Badge>
              <h4 className="mb-2 text-2xl font-bold lg:text-3xl">
                {featuredPost.title}
              </h4>
            </div>
          </div>

          <div className="flex flex-col justify-between lg:col-span-2">
            <div className="space-y-4">
              <p className="text-muted-foreground">{featuredPost.excerpt}</p>

              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{featuredPost.author.name}</p>
                  <div className="text-muted-foreground flex items-center text-sm">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <span>{featuredPost.date}</span>
                    <span className="mx-2">•</span>
                    <Clock3Icon className="mr-1 h-3 w-3" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button size="lg" asChild>
                <a href="#">Read Full Article</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Popular Articles Section */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <TrendingUpIcon className="text-primary h-5 w-5" />
          <h3 className="text-xl font-semibold">Popular Articles</h3>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {popularPosts.map((post) => (
            <div key={post.id} className="flex flex-col gap-6 md:flex-row">
              <div className="relative aspect-video flex-shrink-0 overflow-hidden rounded-md md:w-1/3">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-background/50 hover:bg-background/70 absolute top-2 right-2"
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 md:w-2/3">
                <Badge variant="outline">{post.category}</Badge>
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                  <span className="text-muted-foreground mx-2">•</span>
                  <div className="text-muted-foreground flex items-center text-sm">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <Button variant="link" className="px-0" asChild>
                  <a href="#">
                    Read Article <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-12" />

      {/* Latest Articles Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="text-primary h-5 w-5" />
            <h3 className="text-xl font-semibold">Latest Articles</h3>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="#">View All</a>
          </Button>
        </div>

        <div className="space-y-6">
          {latestPosts.map((post, index) => (
            <div key={post.id}>
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden rounded-md sm:hidden md:block md:w-48">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-muted-foreground text-sm">
                      {post.date}
                    </span>
                  </div>

                  <h4 className="font-semibold">{post.title}</h4>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">{post.author.name}</span>
                    </div>

                    <div className="text-muted-foreground flex items-center text-sm">
                      <Clock3Icon className="mr-1 h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>

                    <Button variant="link" className="h-auto p-0" asChild>
                      <a href="#">Read More</a>
                    </Button>
                  </div>
                </div>
              </div>

              {index < latestPosts.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button size="lg" className="gap-2">
          <a href="#">Explore All Articles</a>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
