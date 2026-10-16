import { Button } from '../../../ui/button';

export default function BorderAnimationButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="relative after:absolute after:inset-0 after:scale-110 after:border-2 after:border-current after:opacity-0 after:transition-all after:duration-300 hover:after:scale-100 hover:after:opacity-100"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="relative after:absolute after:inset-0 after:scale-110 after:border-2 after:border-current after:opacity-0 after:transition-all after:duration-300 hover:after:scale-100 hover:after:opacity-100"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="relative after:absolute after:inset-0 after:scale-110 after:border-2 after:border-current after:opacity-0 after:transition-all after:duration-300 hover:after:scale-100 hover:after:opacity-100"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="relative after:absolute after:inset-0 after:scale-110 after:border-2 after:border-current after:opacity-0 after:transition-all after:duration-300 hover:after:scale-100 hover:after:opacity-100"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="relative after:absolute after:inset-0 after:scale-110 after:border-2 after:border-current after:opacity-0 after:transition-all after:duration-300 hover:after:scale-100 hover:after:opacity-100"
      >
        Ghost
      </Button>
    </div>
  );
}
