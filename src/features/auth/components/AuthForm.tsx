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
        <>
        <div className="flex flex-row">
          <div className="flex flex-col mr-6"><FormField
        id="person_firstname"
        label="ชื่อ *"
        placeholder="กรอกชื่อจริง ไม่ต้องใส่คำนำหน้า"
        error={errors.person_firstname?.message}
        {...register('person_firstname')}
      ></FormField></div>
          <div className="flex flex-col"><FormField
        id="person_lastname"
        label="นามสกุล *"
        placeholder="กรอกนามสกุล"

        error={errors.person_lastname?.message}
        {...register('person_lastname')}
      ></FormField></div>
        </div>
        <FormField
        id="person_id"
        label="เลขบัตรประชาชน *"
        maxLength={13}
        placeholder="กรอกเลขบัตรประชาชน"
        error={errors.person_id?.message}
        {...register('person_id')}
      ></FormField>
       <FormField
        id="person_tel"
        label="เบอร์โทรศัพท์มือถือ *"
        maxLength={10}
        placeholder="กรอกเบอร์โทรศัพท์มือถือ"
        error={errors.person_tel?.message}
        {...register('person_tel')}
      ></FormField>
      <FormField
        id="person_email"
        label="อีเมล *"
        placeholder="กรอกอีเมล"
        error={errors.person_email?.message}
        {...register('person_email')}
      ></FormField>
        </>

      
      )}
      <FormField
        id="username"
        type="text"
        label="ชื่อผู้ใช้งาน (Username) *"
        placeholder="กรอกชื่อผู้ใช้งาน (Username)"
        className="text-[#002d63]"
        error={errors.person_username?.message}
        {...register('person_username')}
      ></FormField>
      <FormField
        id="password"
        type="password"
        label="รหัสผ่าน *"
        placeholder="กรอกรหัสผ่าน"
        error={errors.person_password?.message}
        {...register('person_password')}
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