import {
  Truck,
  PackageOpen,
  Clock,
  CreditCard,
  RefreshCw,
  Calendar,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export default function ShippingReturnsSplitColumns() {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Shipping Information Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Shipping Information
            </h2>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <Truck className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Delivery Options</h3>
                <p className="text-muted-foreground mt-1">
                  Standard shipping (3-5 business days), Express shipping (1-2
                  business days), and Same-day delivery available for select
                  areas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <Clock className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Processing Time</h3>
                <p className="text-muted-foreground mt-1">
                  Orders are processed within 24 hours of being placed.
                  You&apos;ll receive a confirmation email with tracking
                  information once your order ships.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <CreditCard className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Shipping Costs</h3>
                <p className="text-muted-foreground mt-1">
                  Free standard shipping on orders over $50. Express shipping
                  and international delivery available at additional cost
                  calculated at checkout.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <PackageOpen className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">International Shipping</h3>
                <p className="text-muted-foreground mt-1">
                  We ship to over 50 countries worldwide. International orders
                  may be subject to customs duties and taxes upon arrival.
                </p>
              </div>
            </div>
          </div>

          {/* Returns & Exchanges Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Returns & Exchanges
            </h2>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <RefreshCw className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Return Policy</h3>
                <p className="text-muted-foreground mt-1">
                  We offer a 30-day satisfaction guarantee. If you&apos;re not
                  completely satisfied with your purchase, you can return it for
                  a full refund or exchange.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <Calendar className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Return Process</h3>
                <p className="text-muted-foreground mt-1">
                  To initiate a return, log into your account and follow the
                  return instructions, or contact our customer service team.
                  Return shipping labels are provided free of charge.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <ShieldCheck className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Condition Requirements</h3>
                <p className="text-muted-foreground mt-1">
                  Items must be returned in original condition with tags
                  attached and in original packaging. Used or damaged items may
                  not be eligible for a full refund.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-muted mt-1 rounded-md p-2">
                <HelpCircle className="text-muted-foreground h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Exceptions</h3>
                <p className="text-muted-foreground mt-1">
                  Certain items like personalized products, intimate apparel,
                  and final sale items cannot be returned or exchanged. See our
                  full policy for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
