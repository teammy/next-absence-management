import {Select,SelectProps  } from '@mantine/core'

interface SelectItemProps extends SelectProps {
  label:string;
  error?: string;
  defaultValue?: string;
}


const SelectItem = ({label,error,defaultValue,...props}: SelectItemProps) => {

  return (
    <Select
    label={label}
    clearable
    checkIconPosition="right"
    error={error}
    {...props}
    defaultValue={defaultValue}
    classNames={{
      input:'Ekachon_Light',
      option:'Ekachon_Light'
    }}
    >
    </Select>
  )
}

export default SelectItem