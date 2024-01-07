import {Select,SelectProps  } from '@mantine/core'

interface SelectItemProps extends Omit<SelectProps, 'value' | 'onChange'> {
  label:string;
  error?: string;
  value: string;
  onChange: (value: number) => void;
}


const SelectItemField = ({value,onChange,label,error,...props}: SelectItemProps) => {

  return (
    <Select
    label={label}
    clearable
    checkIconPosition="right"
    value={value.toString()}
    onChange={it => onChange(Number(it) || 0)}
    error={error}
    {...props}
    classNames={{
      label:'txt_gray',
      input:'Ekachon_Normal txt_blueDark',
      option:'Ekachon_Normal txt_blueDark'
    }}
    >
    </Select>
  )
}

export default SelectItemField