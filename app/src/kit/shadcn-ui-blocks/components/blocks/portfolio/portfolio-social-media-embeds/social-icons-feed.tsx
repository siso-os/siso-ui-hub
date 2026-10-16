import { useState } from 'react';

import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { ExternalLink, Heart, MessageCircle, Share2, Star } from 'lucide-react';
import {
  SiGithub,
  SiInstagram,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { Linkedin, Twitter } from '../../../ui/brand-icons';

// Social media data with recent posts
const socialMediaData = [
  {
    id: 'twitter',
    name: 'Twitter',
    handle: '@alexmdev',
    icon: <Twitter className="h-5 w-5" />,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-950/30',
    borderColor: 'border-sky-200 dark:border-sky-700/30',
    url: '#',
    recentPost: {
      content:
        'Just launched a new project using Next.js and Tailwind CSS! Check out the live demo and let me know your thoughts. #webdev #frontend #nextjs',
      date: '2h ago',
      engagement: {
        likes: 32,
        comments: 8,
        shares: 12,
      },
      image: null,
    },
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@alexmdev',
    icon: <SiInstagram className="h-5 w-5" />,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
    borderColor: 'border-pink-200 dark:border-pink-700/30',
    url: '#',
    recentPost: {
      content:
        'My developer setup for 2023. Productivity is all about the right tools and environment. #developerlife #workfromhome #techsetup',
      date: '2d ago',
      engagement: {
        likes: 146,
        comments: 24,
        shares: null,
      },
      image:
        'https://images.unsplash.com/photo-1616763355603-9755a640a287?q=80&w=1470&auto=format&fit=crop',
    },
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Alex Morgan',
    icon: <Linkedin className="h-5 w-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-700/30',
    url: '#',
    recentPost: {
      content:
        "I'm excited to share that I've just joined TechVision Labs as a Senior Frontend Developer! Looking forward to working with an amazing team and building innovative web solutions. #newjob #frontenddevelopment #career",
      date: '1w ago',
      engagement: {
        likes: 215,
        comments: 43,
        shares: 5,
      },
      image: null,
    },
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: 'alexmdev',
    icon: <SiGithub className="h-5 w-5" />,
    color: 'text-slate-700 dark:text-slate-300',
    bgColor: 'bg-slate-50 dark:bg-slate-800/30',
    borderColor: 'border-slate-200 dark:border-slate-700/30',
    url: '#',
    recentPost: {
      content:
        'react-responsive-dashboard: A lightweight and customizable dashboard component for React applications',
      date: '3d ago',
      engagement: {
        likes: null,
        comments: null,
        shares: null,
        stars: 78,
      },
      image: null,
      isRepo: true,
    },
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'Alex Morgan Dev',
    icon: <SiYoutube className="h-5 w-5" />,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-700/30',
    url: '#',
    recentPost: {
      content:
        'Building a Full-Stack Application with Next.js, Prisma, and PostgreSQL',
      date: '2w ago',
      engagement: {
        likes: 324,
        comments: 47,
        shares: null,
        views: '8.2K',
      },
      image:
        'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1170&auto=format&fit=crop',
    },
  },
];

export default function SocialIconsFeed() {
  const [activeTab, setActiveTab] = useState('twitter');

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-10 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            Connect
          </Badge>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Social Media
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Follow me on social media for the latest updates on my projects and
            tech insights
          </p>
        </div>

        <div className="bg-card mx-auto max-w-3xl rounded-xl border p-6 shadow-sm">
          {/* Social Media Icons */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid h-fit w-full grid-cols-3 gap-2 bg-transparent md:grid-cols-5 md:gap-4">
              {socialMediaData.map((social) => (
                <TabsTrigger
                  key={social.id}
                  value={social.id}
                  className={`flex flex-col items-center justify-center gap-2 p-4 transition-all data-[state=active]:border-${social.id === 'github' ? 'slate' : social.id === 'linkedin' ? 'blue' : social.id === 'youtube' ? 'red' : social.id === 'instagram' ? 'pink' : 'sky'}-300 data-[state=active]:${social.bgColor}`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${social.bgColor} ${social.color}`}
                  >
                    {social.icon}
                  </div>
                  <span className="text-xs font-medium">{social.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Feed Preview Content */}
            {socialMediaData.map((social) => (
              <TabsContent
                key={social.id}
                value={social.id}
                className={`rounded-lg border ${social.borderColor} p-0`}
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${social.bgColor} ${social.color}`}
                      >
                        {social.icon}
                      </div>
                      <div>
                        <div className="font-medium">{social.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {social.handle}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`gap-1.5 ${social.borderColor} hover:${social.bgColor} w-fit`}
                      asChild
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Follow
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>

                  {/* Post content */}
                  <div className="mb-4">
                    <p className="text-sm">{social.recentPost.content}</p>
                  </div>

                  {/* Post image if any */}
                  {social.recentPost.image && (
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <div className="relative aspect-video">
                        <img
                          src={social.recentPost.image}
                          alt={`${social.name} post`}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Engagement & Date */}
                  <div className="text-muted-foreground flex items-center justify-between border-t pt-3 text-xs">
                    <div className="flex items-center gap-3">
                      {social.recentPost.engagement.likes !== null && (
                        <div className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5" />
                          <span>{social.recentPost.engagement.likes}</span>
                        </div>
                      )}
                      {social.recentPost.engagement.comments && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>{social.recentPost.engagement.comments}</span>
                        </div>
                      )}
                      {social.recentPost.engagement.shares && (
                        <div className="flex items-center gap-1">
                          <Share2 className="h-3.5 w-3.5" />
                          <span>{social.recentPost.engagement.shares}</span>
                        </div>
                      )}
                      {social.recentPost.engagement.stars && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          <span>{social.recentPost.engagement.stars}</span>
                        </div>
                      )}
                      {social.id === 'youtube' &&
                        social.recentPost.engagement.views && (
                          <div className="flex items-center gap-1">
                            <span>
                              {social.recentPost.engagement.views} views
                            </span>
                          </div>
                        )}
                    </div>
                    <span>{social.recentPost.date}</span>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Footer with all social links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {socialMediaData.map((social) => (
              <Button
                key={social.id}
                variant="outline"
                size="sm"
                className={`gap-2 border-${social.id === 'github' ? 'slate' : social.id === 'linkedin' ? 'blue' : social.id === 'youtube' ? 'red' : social.id === 'instagram' ? 'pink' : 'sky'}-200 hover:${social.bgColor}`}
                asChild
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <span className={social.color}>{social.icon}</span>
                  <span>{social.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
