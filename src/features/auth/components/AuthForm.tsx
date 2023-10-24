import { useForm, type SubmitHandler } from 'react-hook-form';
import { type LoginInput, type RegisterInput } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as validators from '../helpers/validators';
import { capitalize } from 'lodash';
import Button from '~/features/ui/components/Button';
import FormField from '~/features/ui/components/form/FormField';
import Link from 'next/link';

export type AuthFormProps =
  | {
      kind: 'register';
      onSubmit: SubmitHandler<RegisterInput>;
    }
  | {
      kind: 'login';
      onSubmit: SubmitHandler<LoginInput>;
    };

const AuthForm = ({ kind, onSubmit }: AuthFormProps) => {
  const isRegisterForm = kind === 'register';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    typeof onSubmit extends SubmitHandler<RegisterInput>
      ? RegisterInput
      : LoginInput
  >({
    resolver: zodResolver(
      kind === 'register' ? validators.register : validators.login,
    ),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg">
      {isRegisterForm && (
        <FormField
          id="name"
          label="ชื่อ-สกุล"
          placeholder=" "
          error={errors.name?.message}
          {...register('name')}
        ></FormField>
      )}
      <FormField
        id="email"
        type="email"
        label="อีเมล"
        placeholder=" "
        className="text-[#002d63]"
        error={errors.email?.message}
        {...register('email')}
      ></FormField>
      <FormField
        id="password"
        type="password"
        label="รหัสผ่าน"
        placeholder=" "
        error={errors.password?.message}
        {...register('password')}
      ></FormField>
     
      <div className="flex items-center justify-between">
        <Button type="submit" color="primary" 
        className="block w-full px-4 py-2 mt-4 text-base font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#0050f0] border border-transparent rounded-lg active:bg-purple-600 hover:bg-[#f68b1f] focus:outline-none focus:shadow-outline-purple">
           {isRegisterForm
            ? 'สมัครบัญชี'
            : 'เข้าสู่ระบบ'}
        </Button>
        
      </div>
      <p className="mt-5 text-right ">
        <Link href={isRegisterForm ? '/auth/sign-in' : '/auth/sign-up'}>
          {isRegisterForm
            ? 'ต้องการเข้าสู่ระบบ?'
            : 'ต้องการสมัครบัญชีเข้าใช้งาน?'}
        </Link>
        </p>
    </form>
  );
};

export default AuthForm;