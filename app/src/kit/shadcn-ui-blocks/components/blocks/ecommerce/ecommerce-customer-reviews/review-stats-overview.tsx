import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Progress } from "../../../ui/progress";
import { Badge } from "../../../ui/badge";
import { Star, TrendingUp, Users, ThumbsUp, Award } from "lucide-react";

export default function ReviewStatsOverview() {
  const stats = {
    averageRating: 4.8,
    totalReviews: 2547,
    recommendationRate: 97,
    ratingDistribution: [
      { stars: 5, count: 1893, percentage: 74 },
      { stars: 4, count: 509, percentage: 20 },
      { stars: 3, count: 102, percentage: 4 },
      { stars: 2, count: 25, percentage: 1 },
      { stars: 1, count: 18, percentage: 1 },
    ],
  };

  const highlights = [
    {
      icon: ThumbsUp,
      title: "Customer Satisfaction",
      value: "97%",
      description: "Would recommend to friends",
      trend: "+2.3%",
    },
    {
      icon: Users,
      title: "Total Reviews",
      value: "2,547",
      description: "Verified customer reviews",
      trend: "+324 this month",
    },
    {
      icon: Award,
      title: "Quality Rating",
      value: "4.8/5",
      description: "Average product rating",
      trend: "+0.2 this quarter",
    },
    {
      icon: TrendingUp,
      title: "Growth Rate",
      value: "15%",
      description: "Monthly review increase",
      trend: "Consistent growth",
    },
  ];

  const recentReviews = [
    {
      name: "Maria Garcia",
      rating: 5,
      review:
        "Outstanding quality and fast delivery. Exceeded my expectations!",
      product: "Wireless Earbuds Pro",
      time: "2 hours ago",
    },
    {
      name: "Kevin Johnson",
      rating: 5,
      review:
        "Perfect product, works exactly as described. Great value for money.",
      product: "Smart Home Hub",
      time: "5 hours ago",
    },
    {
      name: "Lisa Chen",
      rating: 4,
      review:
        "Really good product overall. Minor shipping delay but worth the wait.",
      product: "Bluetooth Speaker",
      time: "1 day ago",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Customer Review Analytics
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Comprehensive insights from our customer feedback and reviews
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight, index) => (
          <Card key={index} className="gap-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {highlight.title}
              </CardTitle>
              <highlight.icon className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highlight.value}</div>
              <p className="text-muted-foreground mb-2 text-xs">
                {highlight.description}
              </p>
              <Badge variant="secondary" className="text-xs">
                {highlight.trend}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Rating Distribution */}
        <Card className="gap-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-6 flex items-center justify-between">
                <div className="">
                  <div className="text-3xl font-bold">
                    {stats.averageRating}
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.floor(stats.averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {stats.totalReviews.toLocaleString()} reviews
                  </div>
                </div>
              </div>

              {stats.ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-4">
                  <div className="flex w-16 items-center gap-1">
                    <span className="text-sm">{rating.stars}</span>
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={rating.percentage} className="h-2 flex-1" />
                  <div className="text-muted-foreground w-12 text-right text-sm">
                    {rating.count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card className="gap-3">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentReviews.map((review, index) => (
                <div
                  key={index}
                  className="border-border border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold">{review.name}</h4>
                      <div className="mt-1 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {review.time}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2 text-sm">
                    {review.review}
                  </p>
                  <p className="text-xs font-medium">{review.product}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats */}
      <div className="mt-12 text-center">
        <Card className="inline-block">
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.recommendationRate}%
                </div>
                <div className="text-muted-foreground text-sm">
                  Customers recommend us
                </div>
              </div>
              <div className="bg-border h-12 w-px" />
              <div className="text-center">
                <div className="text-2xl font-bold">4.8/5</div>
                <div className="text-muted-foreground text-sm">
                  Overall satisfaction
                </div>
              </div>
              <div className="bg-border h-12 w-px" />
              <div className="text-center">
                <div className="text-2xl font-bold">99.2%</div>
                <div className="text-muted-foreground text-sm">
                  Verified purchases
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
