export default function ShippingReturnsFullText() {
  return (
    <section className="w-full px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shipping & Returns
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We want you to love your purchase. Here&apos;s everything you need
              to know about our shipping and return policies.
            </p>
          </div>

          {/* Shipping Policy */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-tight">
              Shipping Information
            </h3>

            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                We offer fast and reliable shipping to ensure your order reaches
                you quickly and safely. All orders are processed within 1-2
                business days, and you&apos;ll receive a tracking number via
                email once your order ships.
              </p>

              <p>
                <strong className="text-foreground">
                  Free Standard Shipping:
                </strong>{" "}
                Available on all orders over $75. Standard shipping typically
                takes 3-7 business days depending on your location.
              </p>

              <p>
                <strong className="text-foreground">Express Shipping:</strong>{" "}
                Need your order faster? Choose express shipping at checkout for
                delivery within 1-3 business days. Express shipping rates start
                at $12.99.
              </p>

              <p>
                <strong className="text-foreground">
                  International Shipping:
                </strong>{" "}
                We ship worldwide! International orders typically arrive within
                7-14 business days. Please note that customs fees and import
                duties may apply and are the responsibility of the customer.
              </p>

              <p>
                Orders placed after 2 PM EST will be processed the following
                business day. We don&apos;t ship on weekends or holidays, but
                we&apos;ll get your order out as soon as possible.
              </p>
            </div>
          </div>

          {/* Returns Policy */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-tight">
              Returns & Exchanges
            </h3>

            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Your satisfaction is our priority. If you&apos;re not completely
                happy with your purchase, we offer a hassle-free 30-day return
                policy. Items must be returned in their original condition with
                all tags attached.
              </p>

              <p>
                <strong className="text-foreground">How to Return:</strong>{" "}
                Simply contact our customer service team at returns@example.com
                or use our online return portal. We&apos;ll provide you with a
                prepaid return label and detailed instructions.
              </p>

              <p>
                <strong className="text-foreground">Refund Processing:</strong>{" "}
                Once we receive your return, we&apos;ll inspect the item and
                process your refund within 3-5 business days. Refunds will be
                issued to your original payment method.
              </p>

              <p>
                <strong className="text-foreground">Exchanges:</strong> Want a
                different size or color? We&apos;re happy to help! Contact us
                within 30 days of purchase, and we&apos;ll arrange an exchange.
                If there&apos;s a price difference, we&apos;ll either refund the
                difference or send you a secure payment link.
              </p>

              <p>
                Please note that personalized or custom items cannot be returned
                unless there&apos;s a defect or error on our part. Sale items
                are final sale and cannot be returned or exchanged.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 border-t pt-8">
            <h3 className="text-2xl font-semibold tracking-tight">
              Questions?
            </h3>

            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Our customer service team is here to help! If you have any
                questions about shipping, returns, or your order, don&apos;t
                hesitate to reach out.
              </p>

              <div className="space-y-2">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  support@example.com
                </p>
                <p>
                  <strong className="text-foreground">Phone:</strong>{" "}
                  1-800-123-4567
                </p>
                <p>
                  <strong className="text-foreground">Hours:</strong> Monday -
                  Friday, 9 AM - 6 PM EST
                </p>
              </div>

              <p>
                We typically respond to emails within 24 hours and are committed
                to making your shopping experience as smooth as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
