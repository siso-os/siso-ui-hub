import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function ShippingReturnsAccordion() {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Shipping & Returns
          </h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to know about delivery and returns
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="shipping-details"
            className="rounded-lg border px-6 py-2"
          >
            <AccordionTrigger className="py-6 text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <svg
                    className="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Shipping Details</h3>
                  <p className="text-muted-foreground text-sm">
                    Available shipping methods and costs
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 text-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">Standard Shipping</h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Free on orders over $75</li>
                      <li>• $5.99 for orders under $75</li>
                      <li>• 5-7 business days</li>
                      <li>• Tracking included</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Express Shipping</h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• $12.99 flat rate</li>
                      <li>• 2-3 business days</li>
                      <li>• Priority handling</li>
                      <li>• Signature required</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Note:</strong> Shipping times may vary during peak
                    seasons and holidays. International shipping available to
                    select countries with additional fees and customs duties.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="estimated-delivery"
            className="rounded-lg border px-6 py-2"
          >
            <AccordionTrigger className="py-6 text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <svg
                    className="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Estimated Delivery</h3>
                  <p className="text-muted-foreground text-sm">
                    When to expect your order
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 text-sm">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <span className="font-bold">1</span>
                    </div>
                    <h4 className="mb-2 font-medium">Processing</h4>
                    <p className="text-muted-foreground">
                      1-2 business days for order verification and preparation
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <span className="font-bold">2</span>
                    </div>
                    <h4 className="mb-2 font-medium">In Transit</h4>
                    <p className="text-muted-foreground">
                      3-5 days standard, 1-2 days express shipping
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <span className="font-bold">3</span>
                    </div>
                    <h4 className="mb-2 font-medium">Delivered</h4>
                    <p className="text-muted-foreground">
                      Tracking confirmation and delivery notification
                    </p>
                  </div>
                </div>
                <div className="border-primary bg-primary/5 rounded-lg border-l-4 p-4">
                  <h4 className="mb-2 font-medium">Order Tracking</h4>
                  <p className="text-muted-foreground">
                    You&apos;ll receive a tracking number via email once your
                    order ships. Track your package in real-time through our
                    customer portal or directly with the carrier.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="return-policy"
            className="rounded-lg border px-6 py-2 last:border-b"
          >
            <AccordionTrigger className="py-6 text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <svg
                    className="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Return Policy</h3>
                  <p className="text-muted-foreground text-sm">
                    Easy returns and exchanges
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-6">
              <div className="space-y-6 text-sm">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-medium text-green-600">
                      ✓ What&apos;s Returnable
                    </h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Items in original condition</li>
                      <li>• Unused products with tags</li>
                      <li>• Original packaging included</li>
                      <li>• Within 30 days of delivery</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-medium text-red-600">
                      ✗ Non-Returnable Items
                    </h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Personalized or custom items</li>
                      <li>• Perishable goods</li>
                      <li>• Digital downloads</li>
                      <li>• Items marked as final sale</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Return Process</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="mb-2 font-medium">1. Request Return</div>
                      <p className="text-muted-foreground text-xs">
                        Contact us or use our online return portal
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="mb-2 font-medium">2. Ship Back</div>
                      <p className="text-muted-foreground text-xs">
                        Use our prepaid return label
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="mb-2 font-medium">3. Get Refund</div>
                      <p className="text-muted-foreground text-xs">
                        Processed within 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-900">
                    Free Returns
                  </h4>
                  <p className="text-sm text-blue-800">
                    We provide free return shipping labels for all domestic
                    returns. International returns may incur shipping fees
                    deducted from your refund.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
