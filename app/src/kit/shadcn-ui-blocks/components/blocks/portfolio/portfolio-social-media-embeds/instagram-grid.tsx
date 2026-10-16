import { useState } from 'react';

import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { SiInstagram } from '@icons-pack/react-simple-icons';
import { cn } from '@/arc-shims/kit-utils';

// Sample Instagram posts data
const instagramPosts = [
  {
    id: 'post1',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop',
    likes: 324,
    comments: 18,
    caption:
      'Building responsive interfaces with React and Tailwind CSS. #webdevelopment #frontend #coding',
    url: '#',
  },
  {
    id: 'post2',
    imageUrl:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1031&auto=format&fit=crop',
    likes: 256,
    comments: 12,
    caption:
      'Late night coding session. The best ideas come after midnight. #programming #developer #techjobs',
    url: '#',
  },
  {
    id: 'post3',
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop',
    likes: 512,
    comments: 32,
    caption:
      'Just shipped a new feature to production! #softwaredevelopment #deployment #agile',
    url: '#',
  },
  {
    id: 'post4',
    imageUrl:
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1170&auto=format&fit=crop',
    likes: 187,
    comments: 14,
    caption:
      'Learning advanced TypeScript concepts today - generics and utility types. #typescript #webdev',
    url: '#',
  },
  {
    id: 'post5',
    imageUrl:
      'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=1173&auto=format&fit=crop',
    likes: 423,
    comments: 27,
    caption:
      'My workspace setup for 2023 - productivity maximized! #workfromhome #desksetup #developerlife',
    url: '#',
  },
  {
    id: 'post6',
    imageUrl:
      'https://images.unsplash.com/photo-1552308995-2baac1ad5490?q=80&w=1170&auto=format&fit=crop',
    likes: 301,
    comments: 19,
    caption:
      'Team whiteboarding session - planning our next big project! #teamwork #productdevelopment #agile',
    url: '#',
  },
  {
    id: 'post7',
    imageUrl:
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1170&auto=format&fit=crop',
    likes: 285,
    comments: 21,
    caption:
      'Debugging on a Sunday because I love what I do. #debugging #softwareengineer #passionproject',
    url: '#',
  },
  {
    id: 'post8',
    imageUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1170&auto=format&fit=crop',
    likes: 342,
    comments: 16,
    caption:
      'Coffee + Code = Perfect Morning. #coffeetime #programming #morningroutine',
    url: '#',
  },
  {
    id: 'post9',
    imageUrl:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1170&auto=format&fit=crop',
    likes: 476,
    comments: 31,
    caption:
      'Just completed my latest portfolio project. Check out the link in bio! #webportfolio #freelancer #hireme',
    url: '#',
  },
];

export default function InstagramGrid() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <SiInstagram className="h-5 w-5 text-pink-500" />
            <Badge
              variant="outline"
              className="border-pink-200 bg-pink-50 px-3 py-1 text-xs font-medium tracking-wide text-pink-600 uppercase dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-400"
            >
              Instagram
            </Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Recent Updates
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Check out my latest posts and snippets from my coding journey and
            project developments
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Image */}
              <img
                src={post.imageUrl}
                alt={`Instagram post: ${post.caption.substring(0, 30)}...`}
                className={cn(
                  'object-cover transition-transform duration-300',
                  hoveredPost === post.id ? 'scale-105 blur-[1px]' : ''
                )}
              />

              {/* Overlay gradient always visible but more intense on hover */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity',
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-60'
                )}
              ></div>

              {/* Post info - always visible */}
              <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-pink-500" fill="#ec4899" />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">{post.comments}</span>
                  </div>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm">
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>

              {/* Caption - only visible on hover */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-6 text-center text-white backdrop-blur-md backdrop-filter transition-opacity',
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
                )}
              >
                <p className="line-clamp-4 text-sm font-medium">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer with link to Instagram */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="gap-2 border-pink-200 hover:bg-pink-50 hover:text-pink-600 dark:border-pink-500/20 dark:hover:bg-pink-500/10 dark:hover:text-pink-400"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <SiInstagram className="h-4 w-4" />
              <span>Follow me on Instagram</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
