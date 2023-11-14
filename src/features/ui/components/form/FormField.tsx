import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Input } from '@nextui-org/react';

export interface FormFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, type = 'text', label, placeholder, error, ...props }, ref) => {
    return (
      <>
        <Input
          ref={ref}
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          labelPlacement='outside'
          variant='bordered'
          radius='sm'
          className="block w-full p-4 rounded-sm"
          classNames={{
            label: 'text-lg',
          }}
          {...props}
        ></Input>
        {error && <div className="text-md text-red-500 pt-2">{error}</div>}

      </>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
