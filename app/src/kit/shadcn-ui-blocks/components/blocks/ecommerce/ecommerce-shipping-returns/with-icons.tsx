import { Truck, RotateCcw } from "lucide-react";

export default function ShippingReturnsWithIcons() {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Shipping Section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <Truck className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-3 text-lg font-semibold">
              Fast & Free Shipping
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enjoy complimentary shipping on all orders over $75. Most orders
              ship within 1-2 business days with tracking provided for your
              peace of mind.
            </p>
          </div>

          {/* Returns Section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <RotateCcw className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-foreground mb-3 text-lg font-semibold">
              Easy 30-Day Returns
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Not completely satisfied? Return any item within 30 days for a
              full refund. No questions asked, just hassle-free returns with
              prepaid shipping labels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
