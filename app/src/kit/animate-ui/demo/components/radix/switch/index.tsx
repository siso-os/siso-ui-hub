import { Label } from '../../../../../shadcn/ui/label';
import { Switch } from '../../../../components/radix/switch';

export function RadixSwitchDemo() {
  return (
    <Label className="flex items-center gap-x-3">
      <Switch />
      Airplane Mode
    </Label>
  );
}
