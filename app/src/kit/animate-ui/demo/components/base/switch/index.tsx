import { Label } from '../../../../../shadcn/ui/label';
import { Switch } from '../../../../components/base/switch';

export function BaseSwitchDemo() {
  return (
    <Label className="flex items-center gap-x-3">
      <Switch />
      Airplane Mode
    </Label>
  );
}
