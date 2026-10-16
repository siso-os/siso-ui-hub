import { Button } from '../../../ui/button';

export default function XLButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button variant="default" className="h-12 px-8 text-lg">
        Default
      </Button>

      <Button variant="secondary" className="h-12 px-8 text-lg">
        Secondary
      </Button>

      <Button variant="destructive" className="h-12 px-8 text-lg">
        Destructive
      </Button>

      <Button variant="outline" className="h-12 px-8 text-lg">
        Outline
      </Button>

      <Button variant="ghost" className="h-12 px-8 text-lg">
        Ghost
      </Button>
    </div>
  );
}
