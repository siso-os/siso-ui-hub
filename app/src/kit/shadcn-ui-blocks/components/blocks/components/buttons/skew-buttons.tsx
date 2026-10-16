import { Button } from '../../../ui/button';

export default function SkewButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="transition-transform duration-300 hover:skew-x-6"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="transition-transform duration-300 hover:skew-x-6"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="transition-transform duration-300 hover:skew-x-6"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="transition-transform duration-300 hover:skew-x-6"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="transition-transform duration-300 hover:skew-x-6"
      >
        Ghost
      </Button>
    </div>
  );
}
