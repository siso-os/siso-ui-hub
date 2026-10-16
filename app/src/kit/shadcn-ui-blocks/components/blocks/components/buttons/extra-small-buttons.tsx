import { Button } from '../../../ui/button';

export default function XSButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button variant="default" className="h-7 px-3 text-xs">
        Default
      </Button>

      <Button variant="secondary" className="h-7 px-3 text-xs">
        Secondary
      </Button>

      <Button variant="destructive" className="h-7 px-3 text-xs">
        Destructive
      </Button>

      <Button variant="outline" className="h-7 px-3 text-xs">
        Outline
      </Button>

      <Button variant="ghost" className="h-7 px-3 text-xs">
        Ghost
      </Button>
    </div>
  );
}
