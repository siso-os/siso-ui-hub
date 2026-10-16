import { Button } from '../../../ui/button';

export default function MorphingButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="rounded-lg transition-all duration-300 hover:rounded-[24px]"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="rounded-lg transition-all duration-300 hover:rounded-[24px]"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="rounded-lg transition-all duration-300 hover:rounded-[24px]"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="rounded-lg transition-all duration-300 hover:rounded-[24px]"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="rounded-lg transition-all duration-300 hover:rounded-[24px]"
      >
        Ghost
      </Button>
    </div>
  );
}
