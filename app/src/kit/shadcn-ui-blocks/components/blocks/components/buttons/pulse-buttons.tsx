import { Button } from '../../../ui/button';

export default function PulseButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button variant="default" className="animate-pulse hover:animate-none">
        Default
      </Button>

      <Button variant="secondary" className="animate-pulse hover:animate-none">
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="animate-pulse hover:animate-none"
      >
        Destructive
      </Button>

      <Button variant="outline" className="animate-pulse hover:animate-none">
        Outline
      </Button>

      <Button variant="ghost" className="animate-pulse hover:animate-none">
        Ghost
      </Button>
    </div>
  );
}
