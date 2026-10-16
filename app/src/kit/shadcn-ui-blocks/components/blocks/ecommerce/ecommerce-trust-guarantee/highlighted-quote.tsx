import { Quote } from "lucide-react";

interface TrustGuaranteeHighlightedQuoteProps {
  quote: string;
  author?: string;
  role?: string;
}

export default function TrustGuaranteeHighlightedQuote({
  quote = "We stand behind every order — or your money back.",
  author,
  role,
}: TrustGuaranteeHighlightedQuoteProps) {
  return (
    <section className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-4xl text-center">
        <div className="relative">
          {/* Quote Icon */}
          <Quote className="text-muted-foreground/40 mx-auto mb-6 h-8 w-8" />

          {/* Main Quote */}
          <blockquote className="text-foreground text-2xl leading-relaxed font-medium sm:text-3xl lg:text-4xl">
            &quot;{quote}&quot;
          </blockquote>

          {/* Author Attribution */}
          {(author || role) && (
            <footer className="mt-8">
              <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                {author && (
                  <cite className="text-foreground font-medium not-italic">
                    {author}
                  </cite>
                )}
                {author && role && (
                  <span className="text-muted-foreground">•</span>
                )}
                {role && <span>{role}</span>}
              </div>
            </footer>
          )}
        </div>
      </div>
    </section>
  );
}
