import { Label } from "../../../../shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../shadcn/ui/radio-group";
import { Gem, HeartHandshake, Rocket } from "lucide-react";

export const title = "RadioGroup with Cards";

const Example = () => (
  <RadioGroup defaultValue="card-1" className="grid gap-2 max-w-sm">
    {[
      {
        id: "card-1",
        title: "Launch Plan",
        desc: "Essential tools to get started.",
        price: "Free",
        icon: Rocket,
      },
      {
        id: "card-2",
        title: "Grow Plan",
        desc: "Advanced features for growing teams.",
        price: "$19.00",
        icon: HeartHandshake,
      },
      {
        id: "card-3",
        title: "Scale Plan",
        desc: "Enterprise power and priority support.",
        price: "$49.00",
        icon: Gem,
      },
    ].map((item) => {
      const Icon = item.icon;
      return (
        <Label
          key={item.id}
          htmlFor={item.id}
          className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 shadow-xs transition-all hover:bg-accent dark:hover:bg-accent/50 has-data-checked:bg-accent dark:has-data-checked:bg-accent/50"
        >
          <div className="p-2 rounded-lg border">
            <Icon />
          </div>
          <div className="w-full flex gap-2 items-start justify-between">
            <div className="grid gap-1.5">
              <p className="font-medium leading-none">{item.title}</p>
              <p className="text-xs text-muted-foreground font-normal">
                {item.desc}
              </p>
            </div>
            <span className="text-muted-foreground text-xs font-normal">
              {item.price}
            </span>
          </div>
          <RadioGroupItem value={item.id} id={item.id} />
        </Label>
      );
    })}
  </RadioGroup>
);

export default Example;
