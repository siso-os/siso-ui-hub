import { Label } from '../../../../../shadcn/ui/label';
import { Switch } from '../../../../components/headless/switch';

export function HeadlessSwitchDemo() {
  return (
    <Label className="flex items-center gap-x-3">
      <Switch />
      Airplane Mode
    </Label>
  );
}
