import { useState } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Star,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MoreHorizontal,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

export default function CompactReviewList() {
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const toggleExpand = (reviewId: number) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const reviews = [
    {
      id: 1,
      name: 'Jennifer Smith',
      initials: 'JS',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 5,
      title: 'Exceeded expectations!',
      preview:
        'The quality is outstanding and the customer service was exceptional...',
      fullReview:
        "The quality is outstanding and the customer service was exceptional. I ordered this product based on the reviews and I'm so glad I did. It arrived quickly, was packaged beautifully, and works exactly as described. The attention to detail is remarkable.",
      product: 'Premium Headphones',
      helpful: 42,
      date: '2 days ago',
      verified: true,
    },
    {
      id: 2,
      name: 'Mark Johnson',
      initials: 'MJ',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4,
      title: 'Great product, minor issues',
      preview:
        'Overall very satisfied with my purchase. The build quality is solid...',
      fullReview:
        "Overall very satisfied with my purchase. The build quality is solid and it performs well. My only complaint is that the battery life isn't quite as long as advertised, but it's still good enough for my daily use. Would recommend.",
      product: 'Wireless Mouse',
      helpful: 28,
      date: '5 days ago',
      verified: true,
    },
    {
      id: 3,
      name: 'Lisa Chen',
      initials: 'LC',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 5,
      title: 'Perfect for my needs',
      preview:
        'Exactly what I was looking for! Easy setup and works flawlessly...',
      fullReview:
        "Exactly what I was looking for! Easy setup and works flawlessly with all my devices. The design is sleek and modern, and it doesn't take up much space on my desk. Customer support was also very responsive when I had a question.",
      product: 'USB-C Hub',
      helpful: 15,
      date: '1 week ago',
      verified: true,
    },
    {
      id: 4,
      name: 'Robert Davis',
      initials: 'RD',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 5,
      title: 'Best purchase this year',
      preview:
        "I've been using this for a month now and it's been fantastic...",
      fullReview:
        "I've been using this for a month now and it's been fantastic. The quality is premium, the features are exactly what I needed, and the price point is very reasonable for what you get. Highly recommend to anyone looking for a reliable product.",
      product: 'Smart Watch',
      helpful: 89,
      date: '2 weeks ago',
      verified: true,
    },
    {
      id: 5,
      name: 'Emma Wilson',
      initials: 'EW',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 3,
      title: 'Good but not great',
      preview: "It does what it's supposed to do, but I expected a bit more...",
      fullReview:
        "It does what it's supposed to do, but I expected a bit more for the price. The materials feel a bit cheap and the finish isn't as nice as shown in the photos. That said, it's functional and serves its purpose. Just manage your expectations.",
      product: 'Phone Case',
      helpful: 12,
      date: '3 weeks ago',
      verified: false,
    },
    {
      id: 6,
      name: 'Michael Brown',
      initials: 'MB',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 5,
      title: 'Highly recommend!',
      preview:
        'This product has exceeded all my expectations. The quality is top-notch...',
      fullReview:
        "This product has exceeded all my expectations. The quality is top-notch, the design is beautiful, and it works perfectly. I've already recommended it to several friends. The company clearly puts a lot of thought into their products.",
      product: 'Desk Lamp',
      helpful: 34,
      date: '1 month ago',
      verified: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            All Customer Reviews
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Showing {reviews.length} of 1,247 reviews
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Star className="mr-1 size-3 fill-yellow-400 text-yellow-400" />
            4.8 Average
          </Badge>
          <Badge variant="outline">1,247 Total</Badge>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="hover:bg-muted/50 p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{review.name}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                      <span className="text-muted-foreground text-xs">
                        {review.date}
                      </span>
                    </div>

                    <h4 className="mb-1 font-medium">{review.title}</h4>

                    <p className="text-muted-foreground text-sm">
                      {expandedReviews.includes(review.id)
                        ? review.fullReview
                        : review.preview}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => toggleExpand(review.id)}
                        className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                      >
                        {expandedReviews.includes(review.id) ? (
                          <>
                            Show less
                            <ChevronUp className="size-3" />
                          </>
                        ) : (
                          <>
                            Read more
                            <ChevronDown className="size-3" />
                          </>
                        )}
                      </button>

                      <Badge variant="outline" className="text-xs">
                        {review.product}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2"
                      >
                        <ThumbsUp className="size-3" />
                        <span className="text-xs">
                          Helpful ({review.helpful})
                        </span>
                      </Button>

                      <Button variant="ghost" size="icon" className="size-7">
                        <MoreHorizontal className="size-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  );
}
