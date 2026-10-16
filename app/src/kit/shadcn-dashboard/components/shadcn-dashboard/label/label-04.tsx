import { useId } from 'react'
import { Label } from '../../../../shadcn/ui/label'
import { Textarea } from '../../../../shadcn/ui/textarea'

const LabelWithTextarea = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Feedback</Label>
      <Textarea placeholder='Type your feedback here' id={id} />
    </div>
  )
}

export default LabelWithTextarea
