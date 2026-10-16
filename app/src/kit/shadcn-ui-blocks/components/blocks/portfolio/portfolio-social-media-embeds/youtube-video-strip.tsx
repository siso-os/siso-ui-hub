import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { PlayCircle, ExternalLink, Clock } from 'lucide-react';
import { SiYoutube } from '@icons-pack/react-simple-icons';

// Sample YouTube videos data
const youtubeVideos = [
  {
    id: 'video1',
    title: 'How to Build a Modern Portfolio Website with Next.js',
    thumbnail:
      'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1170&auto=format&fit=crop',
    duration: '15:24',
    views: '12K',
    date: '2 weeks ago',
    url: '#',
  },
  {
    id: 'video2',
    title: 'Advanced CSS Animation Techniques for Web Developers',
    thumbnail:
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1170&auto=format&fit=crop',
    duration: '18:32',
    views: '8.5K',
    date: '1 month ago',
    url: '#',
  },
  {
    id: 'video3',
    title: 'JavaScript Performance Optimization Tips',
    thumbnail:
      'https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=1064&auto=format&fit=crop',
    duration: '22:15',
    views: '15.3K',
    date: '2 months ago',
    url: '#',
  },
  {
    id: 'video4',
    title: 'Responsive UI Design: From Concept to Implementation',
    thumbnail:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1074&auto=format&fit=crop',
    duration: '12:48',
    views: '9.7K',
    date: '3 months ago',
    url: '#',
  },
];

export default function YouTubeVideoStrip() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <SiYoutube className="h-5 w-5 text-red-600" />
            <Badge
              variant="outline"
              className="border-red-200 bg-red-50 px-3 py-1 text-xs font-medium tracking-wide text-red-700 uppercase dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
            >
              YouTube
            </Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Recent Videos
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Watch my latest tutorials, tech reviews, and coding sessions
          </p>
        </div>

        {/* Video Strip */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="group bg-card relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-30"></div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" />
                </div>

                {/* Duration badge */}
                <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                  <Clock className="h-3 w-3" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Video info */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="mb-1 line-clamp-2 font-semibold">
                    {video.title}
                  </h3>
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.date}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 justify-start gap-2 rounded-md px-2 py-1 text-xs font-normal text-red-700 hover:bg-red-50 hover:text-red-800 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:text-red-300"
                  asChild
                >
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <SiYoutube className="h-3.5 w-3.5" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="ml-auto h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="gap-2 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:text-red-300"
            asChild
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              <SiYoutube className="h-4 w-4" />
              <span>Subscribe to my channel</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
