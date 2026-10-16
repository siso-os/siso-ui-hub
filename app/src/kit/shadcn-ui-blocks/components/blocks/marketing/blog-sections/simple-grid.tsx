import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { CalendarIcon, Clock3Icon, ArrowRightIcon } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Boost Your Marketing ROI with Data-Driven Strategies',
    excerpt:
      'Learn how to leverage analytics to optimize your marketing campaigns and increase return on investment.',
    category: 'Analytics',
    date: 'March 28, 2023',
    readTime: '8 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'The Future of Content Marketing in 2023',
    excerpt:
      'Discover the emerging trends that will shape content marketing strategies in the coming year.',
    category: 'Content',
    date: 'March 15, 2023',
    readTime: '6 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1518976024611-28bf4b48222e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 3,
    title: 'Social Media Strategies That Drive Engagement',
    excerpt:
      'Effective tactics to increase audience engagement and build community through social platforms.',
    category: 'Social Media',
    date: 'March 10, 2023',
    readTime: '5 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 4,
    title: 'Email Marketing: Best Practices for Higher Conversion',
    excerpt:
      'Optimize your email campaigns with these proven strategies to improve open rates and conversions.',
    category: 'Email',
    date: 'March 5, 2023',
    readTime: '7 min read',
    imageUrl:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

export default function BlogSectionSimpleGrid() {
  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Marketing Insights
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Expert advice and analysis to help you improve your marketing
          strategies and stay ahead of the competition.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex h-full flex-col gap-0 pt-0">
            <CardHeader className="overflow-hidden p-0">
              <div className="relative aspect-video">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow py-4">
              <div className="space-y-3">
                <Badge variant="secondary" className="mb-2">
                  {post.category}
                </Badge>
                <h3 className="line-clamp-2 text-lg font-semibold">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <div className="text-muted-foreground flex items-center text-sm">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <span>{post.date}</span>
                <Clock3Icon className="mr-1 ml-3 h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
              <Button variant="link" className="mt-3 px-0" asChild>
                <a href="#">
                  Read More <ArrowRightIcon className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" className="w-full max-w-sm">
          <a href="#">View All Posts</a>
        </Button>
      </div>
    </section>
  );
}
