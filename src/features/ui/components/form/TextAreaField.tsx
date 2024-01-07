import { forwardRef } from "react"
import { Textarea,type TextareaProps } from "@mantine/core"

export interface TextAreaFieldProps extends TextareaProps {
  label: string;
  error?: string;
}


const TextAreaField = forwardRef<HTMLTextAreaElement,TextAreaFieldProps>(
({id,label,error,placeholder,...props},ref) => {
  return (
    <Textarea
    id={id}
    ref={ref}
    label={label}
    error={error}
    placeholder={placeholder}
    classNames={{
      input:'txt_blueDark Ekachon_Normal',
      label:'txt_gray'
    }}
    {...props}
    >

    </Textarea>
  )
}
);

TextAreaField.displayName = "TextAreaField";

export default TextAreaField