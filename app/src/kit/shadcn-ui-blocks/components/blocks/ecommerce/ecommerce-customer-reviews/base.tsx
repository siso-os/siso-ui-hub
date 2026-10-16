import { Star } from "lucide-react";

export default function Base() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          What Our Customers Say
        </h2>

        <div className="bg-muted/50 rounded-lg p-8 md:p-12">
          <div className="mb-6 flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="size-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <blockquote className="mb-6 text-xl leading-relaxed font-medium md:text-2xl">
            &quot;Exceptional product quality and customer service. The delivery
            was fast and the items exceeded my expectations. I&apos;ll
            definitely be shopping here again!&quot;
          </blockquote>

          <footer className="text-muted-foreground">
            <div className="text-foreground font-semibold">Sarah Johnson</div>
            <div>Verified Customer • Purchased 2 weeks ago</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
