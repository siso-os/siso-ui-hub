import { Button } from '../../../ui/button';

export default function SqueezeButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="transition-transform duration-300 hover:scale-x-95 hover:scale-y-105"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="transition-transform duration-300 hover:scale-x-95 hover:scale-y-105"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="transition-transform duration-300 hover:scale-x-95 hover:scale-y-105"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="transition-transform duration-300 hover:scale-x-95 hover:scale-y-105"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="transition-transform duration-300 hover:scale-x-95 hover:scale-y-105"
      >
        Ghost
      </Button>
    </div>
  );
}
