import {Select,type SelectProps  } from '@mantine/core'

interface SelectItemProps extends SelectProps {
  label:string;
  error?: string;
}


const SelectItem = ({label,error,...props}: SelectItemProps) => {

  return (
    <Select
    label={label}
    clearable
    checkIconPosition="right"
    error={error}
    {...props}
    classNames={{
      input:'Ekachon_Light',
      option:'Ekachon_Light'
    }}
    >
    </Select>
  )
}

export default SelectItem