import {type ComboboxData, Select  } from '@mantine/core'

export interface SelectItemProps {
  label:string;
  data: ComboboxData;
  error?: string;
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}


const SelectItem = ({label,placeholder,data,value,onChange,error}: SelectItemProps) => {

  return (
    <Select
    label={label}
    placeholder={placeholder}
    clearable
    data={data}
    checkIconPosition="right"
    value={value}
    onChange={onChange}
    error={error}
    >
    </Select>
  )
}

export default SelectItem