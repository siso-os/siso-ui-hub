import { Button } from '../../../ui/button';

export default function PixelButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="border-2 shadow-[4px_4px_0px_0px_currentColor] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="border-2 shadow-[4px_4px_0px_0px_currentColor] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="border-2 shadow-[4px_4px_0px_0px_currentColor] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="border-2 shadow-[4px_4px_0px_0px_currentColor] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="border-2 shadow-[4px_4px_0px_0px_currentColor] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        Ghost
      </Button>
    </div>
  );
}
