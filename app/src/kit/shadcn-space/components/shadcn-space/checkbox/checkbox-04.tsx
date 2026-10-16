import { useId } from 'react'

import { Checkbox } from '../../../../shadcn/ui/checkbox'
import { Label } from '../../../../shadcn/ui/label'

const CheckboxTodoListDemo = () => {
  const id = useId()

  return (
    <div className='flex items-center gap-2'>
      <Checkbox id={id} defaultChecked className='cursor-pointer' />
      <Label htmlFor={id} className='peer-data-checked:line-through'>
        One step closer to your goal
      </Label>
    </div>
  )
}

export default CheckboxTodoListDemo
