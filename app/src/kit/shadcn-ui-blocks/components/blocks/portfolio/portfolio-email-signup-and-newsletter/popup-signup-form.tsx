import { useState, useEffect } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../ui/dialog';

export default function PortfolioPopupSignupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Simulate scroll trigger after a delay (or you could use scroll position)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
      }
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Track scroll for another trigger method
  useEffect(() => {
    const handleScroll = () => {
      // Show when user has scrolled 60% of the page
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage > 60 && !hasInteracted && !isOpen) {
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, hasInteracted]);

  const closeDialog = () => {
    setIsOpen(false);
    setHasInteracted(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stay updated with my latest work</DialogTitle>
          <DialogDescription>
            Subscribe to receive updates, insights and exclusive content.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="popup-email">Email address</Label>
            <Input
              id="popup-email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          <DialogFooter className="flex items-center gap-3">
            <Button type="submit" className="flex-1">
              Subscribe
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              className="flex-1"
            >
              Maybe later
            </Button>
          </DialogFooter>

          <p className="text-muted-foreground text-center text-xs">
            Subscribe for free design tips and resources. I&apos;ll never share
            your email address.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
