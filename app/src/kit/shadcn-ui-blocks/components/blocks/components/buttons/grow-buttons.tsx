import { Button } from '../../../ui/button';

export default function GrowButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="transition-transform duration-300 hover:scale-110"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="transition-transform duration-300 hover:scale-110"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="transition-transform duration-300 hover:scale-110"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="transition-transform duration-300 hover:scale-110"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="transition-transform duration-300 hover:scale-110"
      >
        Ghost
      </Button>
    </div>
  );
}
