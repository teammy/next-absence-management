import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Input } from '@nextui-org/react';

export interface FormFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, type = 'text', label, placeholder, error, ...props }, ref) => {
    return (

      <div className="mb-4">
        <Input
          ref={ref}
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          labelPlacement='outside'
          variant='bordered'
          radius='sm'
          classNames={{
            label: 'text-lg',
          }}
          {...props}
        ></Input>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      </div>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
