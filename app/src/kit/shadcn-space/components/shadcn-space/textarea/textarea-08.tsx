import { Label } from '../../../../shadcn/ui/label'
import { Textarea } from '../../../../shadcn/ui/textarea'

const TextareaWithHelperTextRightDemo = () => {
  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor="message">Message</Label>
      <Textarea placeholder='Drop your message here !' id="message" />
      <p className='text-muted-foreground text-end text-xs'>Your feedback means a lot to us.</p>
    </div>
  )
}

export default TextareaWithHelperTextRightDemo
