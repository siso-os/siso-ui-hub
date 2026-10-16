import { Button } from '../../../ui/button';

export default function CutCornersButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="rounded-none transition-all duration-300 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="rounded-none transition-all duration-300 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="rounded-none transition-all duration-300 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="rounded-none transition-all duration-300 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="rounded-none transition-all duration-300 [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
      >
        Ghost
      </Button>
    </div>
  );
}
