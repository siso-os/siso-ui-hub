import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Star, Quote, Users, Award, Shield, Truck } from 'lucide-react';

export default function SocialProofReviews() {
  const trustMetrics = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Happy Customers',
      color: 'text-blue-600',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Average Rating',
      color: 'text-yellow-500',
    },
    {
      icon: Award,
      value: '99%',
      label: 'Satisfaction Rate',
      color: 'text-green-600',
    },
    {
      icon: Shield,
      value: 'SSL',
      label: 'Secure Shopping',
      color: 'text-purple-600',
    },
  ];

  const featuredReviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      review: 'Incredible quality and fast shipping!',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      verified: true,
    },
    {
      name: 'Mike R.',
      rating: 5,
      review: "Best purchase I've made this year.",
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      verified: true,
    },
    {
      name: 'Emma K.',
      rating: 5,
      review: 'Exceeded all my expectations!',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      verified: true,
    },
  ];

  const customerPhotos = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
  ];

  const highlights = [
    'Free shipping on orders over $50',
    '30-day money-back guarantee',
    '24/7 customer support',
    'Eco-friendly packaging',
  ];

  const recentActivity = [
    'Emma from New York purchased 2 minutes ago',
    'James from California purchased 5 minutes ago',
    'Sofia from Texas purchased 8 minutes ago',
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Trust Metrics */}
      <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {trustMetrics.map((metric, index) => (
          <Card key={index} className="text-center">
            <CardContent>
              <metric.icon className={`mx-auto mb-3 size-8 ${metric.color}`} />
              <div className="mb-1 text-2xl font-bold">{metric.value}</div>
              <div className="text-muted-foreground text-sm">
                {metric.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        {/* Left Column - Reviews */}
        <div>
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              What Our Customers Say
            </h2>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="font-semibold">4.9 out of 5</span>
              <span className="text-muted-foreground">(2,547 reviews)</span>
            </div>
          </div>

          {/* Featured Reviews */}
          <div className="space-y-6">
            {featuredReviews.map((review, index) => (
              <Card key={index} className="relative">
                <CardContent>
                  <Quote className="text-muted-foreground mb-4 size-6" />
                  <p className="mb-4 text-lg leading-relaxed">
                    &quot;{review.review}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={review.avatar}
                        alt={review.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{review.name}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="size-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column - Social Proof */}
        <div className="space-y-8">
          {/* Customer Photos */}
          <Card>
            <CardContent>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Users className="size-5" />
                Happy Customers
              </h3>
              <div className="mb-4 grid grid-cols-3 gap-2">
                {customerPhotos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={photo}
                      alt={`Customer ${index + 1}`}
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-muted-foreground text-sm">
                  Join 50,000+ satisfied customers
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <Card>
            <CardContent>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Shield className="size-5" />
                Why Choose Us
              </h3>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-green-500" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Truck className="size-5" />
                Recent Orders
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="size-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-muted-foreground text-sm">
                      {activity}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rating Breakdown */}
          <Card>
            <CardContent>
              <h3 className="mb-4 font-semibold">Rating Breakdown</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="w-4 text-sm">{rating}</span>
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                    <div className="bg-muted h-2 flex-1 rounded-full">
                      <div
                        className="h-2 rounded-full bg-yellow-400"
                        style={{
                          width:
                            rating === 5 ? '85%' : rating === 4 ? '12%' : '3%',
                        }}
                      />
                    </div>
                    <span className="text-muted-foreground w-8 text-sm">
                      {rating === 5 ? '85%' : rating === 4 ? '12%' : '3%'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
