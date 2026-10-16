import { Input } from "../../../../shadcn/ui/input"
import { Label } from "../../../../shadcn/ui/label"

const InputWithLabelDemo = () => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Label</Label>
            <Input type="email" id="email" placeholder="example@shadcndashboard.com" />
        </div>
    )
}

export default InputWithLabelDemo
