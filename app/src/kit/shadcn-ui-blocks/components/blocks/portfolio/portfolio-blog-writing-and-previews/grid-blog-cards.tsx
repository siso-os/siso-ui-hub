import { cn } from '@/arc-shims/kit-utils';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Button } from '../../../ui/button';

export default function GridBlogCards() {
  // Sample blog posts data
  const posts = [
    {
      id: '1',
      title: 'Creating Accessible Web Applications with React and ARIA',
      excerpt:
        'Learn how to build web applications that are accessible to everyone using React best practices and ARIA attributes.',
      date: 'Apr 15, 2023',
      category: 'Development',
      imageUrl:
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'creating-accessible-web-applications',
    },
    {
      id: '2',
      title: 'The Future of Design Systems in 2023',
      excerpt:
        'Explore the trends and innovations shaping design systems and component libraries this year.',
      date: 'Mar 28, 2023',
      category: 'Design',
      imageUrl:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'future-of-design-systems',
    },
    {
      id: '3',
      title: 'Optimizing Performance in Next.js Applications',
      excerpt:
        'Practical strategies to improve loading times and overall performance in your Next.js web applications.',
      date: 'Mar 12, 2023',
      category: 'Performance',
      imageUrl:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'optimizing-nextjs-performance',
    },
    {
      id: '4',
      title: 'Crafting Effective User Onboarding Experiences',
      excerpt:
        'How to design user onboarding that reduces friction and increases conversion rates for your product.',
      date: 'Feb 24, 2023',
      category: 'UX Design',
      imageUrl:
        'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'effective-user-onboarding',
    },
    {
      id: '5',
      title: 'Building a Design Portfolio That Stands Out',
      excerpt:
        'Tips and strategies for creating a compelling design portfolio that captures attention and showcases your unique skills.',
      date: 'Feb 10, 2023',
      category: 'Career',
      imageUrl:
        'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'design-portfolio-tips',
    },
    {
      id: '6',
      title: 'Responsive Design in the Age of Foldable Devices',
      excerpt:
        'Exploring the challenges and solutions for designing responsive interfaces that work seamlessly across traditional and foldable screens.',
      date: 'Jan 28, 2023',
      category: 'Design',
      imageUrl:
        'https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'responsive-design-foldable-devices',
    },
  ];

  const title = 'Latest Articles';
  const description = 'Thoughts, ideas, and insights from my journey';
  const columns: number = 3;

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground max-w-[700px]">{description}</p>
          </div>

          <div
            className={cn(
              'grid w-full gap-6 pt-4',
              columns === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : columns === 3
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            )}
          >
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden pt-0">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="object-cover transition-transform hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader className="grow grid-rows-none">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                  <CardTitle className="line-clamp-2 leading-normal">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 grow">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="ghost">
                    <a href="#">
                      Read more
                      <span className="sr-only">
                        Read more about {post.title}
                      </span>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
