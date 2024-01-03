import {forwardRef } from "react"
import { TextInput,type TextInputProps } from "@mantine/core";


interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;

}

const InputField = forwardRef<HTMLInputElement,InputFieldProps>(
({id,label,error,type="input",placeholder,...props},ref) => {
  return (
    <TextInput
    id={id}
    ref={ref}
    label={label}
    type={type}
    error={error}
    placeholder={placeholder}
    classNames={{
      input:'Ekachon_Light'
    }}
    {...props}
    >
    </TextInput>
  )
}
);

InputField.displayName = "InputField";

export default InputField