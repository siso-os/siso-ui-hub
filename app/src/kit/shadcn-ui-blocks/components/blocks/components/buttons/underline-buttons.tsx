import { Button } from '../../../ui/button';

export default function UnderlineButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="relative after:absolute after:right-2 after:bottom-2 after:left-2 after:h-[2px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="relative after:absolute after:right-2 after:bottom-2 after:left-2 after:h-[2px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="relative after:absolute after:right-2 after:bottom-2 after:left-2 after:h-[2px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="relative after:absolute after:right-2 after:bottom-2 after:left-2 after:h-[2px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="relative after:absolute after:right-2 after:bottom-2 after:left-2 after:h-[2px] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
      >
        Ghost
      </Button>
    </div>
  );
}
