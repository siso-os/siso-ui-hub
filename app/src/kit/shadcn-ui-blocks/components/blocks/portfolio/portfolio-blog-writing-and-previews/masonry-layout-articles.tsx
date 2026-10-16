import { useEffect, useRef } from 'react';

import { cn } from '@/arc-shims/kit-utils';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';

export default function MasonryLayoutArticles() {
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
      height: 'medium' as const,
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
      height: 'tall' as const,
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
      height: 'short' as const,
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
      height: 'medium' as const,
    },
    {
      id: '5',
      title: 'Building a Design Portfolio That Stands Out',
      excerpt:
        'Tips and strategies for creating a portfolio that showcases your best work and attracts clients.',
      date: 'Feb 10, 2023',
      category: 'Career',
      imageUrl:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'design-portfolio-tips',
      height: 'tall' as const,
    },
    {
      id: '6',
      title: 'Responsive Design in the Age of Foldable Devices',
      excerpt:
        'How to adapt your responsive design strategies for the emerging market of foldable and dual-screen devices.',
      date: 'Jan 28, 2023',
      category: 'Design',
      imageUrl:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      slug: 'responsive-design-foldable-devices',
      height: 'short' as const,
    },
  ];

  const title = 'Writing Portfolio';
  const description =
    'A collection of articles, case studies, and thoughts on design and development';

  const masonryRef = useRef<HTMLDivElement>(null);

  // This effect initializes the masonry layout using CSS columns
  // The real masonry layout would be controlled by the height values from the posts
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (masonryRef.current) {
        // Could implement a more sophisticated layout algorithm here if needed
      }
    });

    if (masonryRef.current) {
      resizeObserver.observe(masonryRef.current);
    }

    return () => {
      if (masonryRef.current) {
        resizeObserver.unobserve(masonryRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <div className="mx-auto max-w-[800px] space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div
            ref={masonryRef}
            className="gap-4 space-y-4 sm:columns-2 xl:columns-3"
          >
            {posts.map((post) => {
              // Calculate card height based on post.height or randomize for demo
              const aspectRatio =
                post.height === 'tall'
                  ? 'aspect-[3/4]'
                  : post.height === 'medium'
                    ? 'aspect-[4/3]'
                    : 'aspect-square';

              return (
                <a
                  href="#"
                  key={post.id}
                  className="mb-4 inline-block w-full"
                  aria-label={`Read more about ${post.title}`}
                >
                  <Card className="transform break-inside-avoid overflow-hidden p-0 transition-transform hover:translate-y-[-5px]">
                    <div
                      className={cn(
                        'relative w-full overflow-hidden',
                        aspectRatio
                      )}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute right-0 bottom-0 left-0 z-20 p-4 text-white">
                        <div className="absolute inset-0 right-0 -z-10 rounded-b-xl bg-gradient-to-t from-black/90 via-black/60 to-black/30 backdrop-blur-md" />
                        <div className="mb-2 flex items-center gap-2 text-xs text-white/80">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                        </div>
                        <h3 className="mb-2 line-clamp-2 text-xl font-bold">
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-white/90">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>

          <div className="flex justify-center pt-4">
            <Button asChild variant="outline">
              <a href="#">View All Articles</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
