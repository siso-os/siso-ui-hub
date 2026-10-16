import { Button } from '../../../ui/button';

export default function RotateButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="transition-transform duration-300 hover:rotate-3"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="transition-transform duration-300 hover:rotate-3"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="transition-transform duration-300 hover:rotate-3"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="transition-transform duration-300 hover:rotate-3"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="transition-transform duration-300 hover:rotate-3"
      >
        Ghost
      </Button>
    </div>
  );
}
