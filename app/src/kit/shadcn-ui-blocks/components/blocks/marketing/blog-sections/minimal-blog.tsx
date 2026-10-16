import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Clock3Icon, ArrowRightIcon, FilterIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { Separator } from '../../../ui/separator';

// Define post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Defining Your Brand Voice: A Step-by-Step Guide',
    excerpt:
      'Learn how to develop a consistent and authentic brand voice that resonates with your target audience and strengthens your market position.',
    category: 'Branding',
    date: 'April 15, 2023',
    readTime: '8 min read',
    author: {
      name: 'Emma Parker',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 2,
    title: 'The Psychology of Color in Marketing: Choosing the Right Palette',
    excerpt:
      'Explore how color choices influence consumer perception and how to select the optimal color scheme for your marketing materials.',
    category: 'Design',
    date: 'April 10, 2023',
    readTime: '6 min read',
    author: {
      name: 'Michael Chen',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Building an Effective Content Distribution Strategy',
    excerpt:
      'Discover how to get your content in front of the right audience at the right time through strategic distribution channels.',
    category: 'Content',
    date: 'April 7, 2023',
    readTime: '10 min read',
    author: {
      name: 'Sarah Johnson',
      avatar:
        'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 4,
    title: 'Data Privacy Regulations: What Marketers Need to Know',
    excerpt:
      'Navigate the complex landscape of data privacy laws and learn how to maintain compliance while effectively reaching your audience.',
    category: 'Legal',
    date: 'April 3, 2023',
    readTime: '9 min read',
    author: {
      name: 'David Wilson',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 5,
    title: 'Creating Effective Landing Pages That Convert',
    excerpt:
      'Master the art of designing landing pages that drive conversions through strategic layout, messaging, and call-to-actions.',
    category: 'Conversion',
    date: 'March 28, 2023',
    readTime: '7 min read',
    author: {
      name: 'Jessica Lee',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
  {
    id: 6,
    title: 'Omnichannel Marketing: Crafting Seamless Customer Experiences',
    excerpt:
      "Learn how to create consistent, integrated customer experiences across all touchpoints in the buyer's journey.",
    category: 'Strategy',
    date: 'March 22, 2023',
    readTime: '11 min read',
    author: {
      name: 'Robert Zhang',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    },
  },
];

export default function BlogSectionMinimal() {
  const categories = [
    'All Categories',
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
  ];
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === 'All Categories'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl space-y-16">
        <div className="space-y-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Journal
          </h2>
          <p className="text-muted-foreground text-center">
            Thoughts, ideas, and insights on marketing and business strategy.
          </p>
        </div>

        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <FilterIcon className="text-muted-foreground h-4 w-4" />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-12">
          {filteredPosts.map((post) => (
            <article key={post.id} className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-muted-foreground text-sm">
                    {post.date}
                  </span>
                </div>

                <h3 className="hover:text-primary text-xl font-semibold tracking-tight transition-colors sm:text-2xl">
                  <a href="#">{post.title}</a>
                </h3>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base">
                {post.excerpt}
              </p>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                  <div className="text-muted-foreground flex items-center text-sm">
                    <Clock3Icon className="mr-1 h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary self-start hover:bg-transparent sm:self-center"
                  asChild
                >
                  <a href="#">
                    Continue Reading
                    <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <Separator className="mt-8" />
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No articles found in this category.
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Button asChild variant="outline" className="gap-2">
            <a href="#">
              Load More Articles
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
