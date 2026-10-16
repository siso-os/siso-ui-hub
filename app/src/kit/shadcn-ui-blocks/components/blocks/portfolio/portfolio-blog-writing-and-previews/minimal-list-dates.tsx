import { cn } from '@/arc-shims/kit-utils';
import { Button } from '../../../ui/button';
import { ChevronRight } from 'lucide-react';

export default function MinimalListDates() {
  // Sample blog posts data
  const posts = [
    {
      id: '1',
      title: 'Creating Accessible Web Applications with React and ARIA',
      date: 'Apr 15, 2023',
      category: 'Development',
      slug: 'creating-accessible-web-applications',
    },
    {
      id: '2',
      title: 'The Future of Design Systems in 2023',
      date: 'Mar 28, 2023',
      category: 'Design',
      slug: 'future-of-design-systems',
    },
    {
      id: '3',
      title: 'Optimizing Performance in Next.js Applications',
      date: 'Mar 12, 2023',
      category: 'Performance',
      slug: 'optimizing-nextjs-performance',
    },
    {
      id: '4',
      title: 'Crafting Effective User Onboarding Experiences',
      date: 'Feb 24, 2023',
      category: 'UX Design',
      slug: 'effective-user-onboarding',
    },
    {
      id: '5',
      title: 'Building a Design Portfolio That Stands Out',
      date: 'Feb 10, 2023',
      category: 'Career',
      slug: 'design-portfolio-tips',
    },
    {
      id: '6',
      title: 'Responsive Design in the Age of Foldable Devices',
      date: 'Jan 28, 2023',
      category: 'Design',
      slug: 'responsive-design-foldable-devices',
    },
  ];

  const title = 'Writing & Articles';
  const description = 'A collection of my thoughts, insights, and experiences';
  const showCategories = true;

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground max-w-[700px]">{description}</p>
          </div>

          <div className="border-t">
            {posts.map((post, index) => (
              <a href={'#'} key={post.id}>
                <article
                  key={post.id}
                  className={cn(
                    'group flex flex-col justify-between py-4 sm:flex-row sm:items-center',
                    index !== posts.length - 1 && 'border-b'
                  )}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-lg font-medium">
                      <div className="group-hover:text-primary truncate transition-colors group-hover:underline">
                        {post.title}
                      </div>
                    </h3>
                    {showCategories && (
                      <p className="text-muted-foreground text-sm">
                        {post.category}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-4 sm:mt-0">
                    <time
                      dateTime={post.date}
                      className="text-muted-foreground text-sm whitespace-nowrap"
                    >
                      {post.date}
                    </time>
                    <ChevronRight className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </article>
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <Button asChild variant="outline">
              <a href="#">View All Articles</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
