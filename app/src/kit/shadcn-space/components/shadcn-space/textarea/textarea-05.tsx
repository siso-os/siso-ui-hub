import { useId } from 'react'

import { Label } from '../../../../shadcn/ui/label'
import { Textarea } from '../../../../shadcn/ui/textarea'

const TextareaAutoGrowDemo = () => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Feedback</Label>
      <Textarea
        id={id}
        placeholder='Share your feedback here'
        className='field-sizing-content max-h-30 min-h-0 resize-none py-1.75'
      />
    </div>
  )
}

export default TextareaAutoGrowDemo
