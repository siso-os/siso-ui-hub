import { Button } from '../../../ui/button';

export default function ShadowButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-6">
      <Button
        variant="default"
        className="shadow-none transition-shadow duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      >
        Default
      </Button>

      <Button
        variant="secondary"
        className="shadow-none transition-shadow duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      >
        Secondary
      </Button>

      <Button
        variant="destructive"
        className="shadow-none transition-shadow duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      >
        Destructive
      </Button>

      <Button
        variant="outline"
        className="shadow-none transition-shadow duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      >
        Outline
      </Button>

      <Button
        variant="ghost"
        className="shadow-none transition-shadow duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      >
        Ghost
      </Button>
    </div>
  );
}
