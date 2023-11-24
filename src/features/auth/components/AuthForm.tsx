import { useForm, type SubmitHandler } from 'react-hook-form';
import { type LoginInput, type RegisterInput } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as validators from '../helpers/validators';
import { capitalize } from 'lodash';
import Button from '~/features/ui/components/Button';
import FormField from '~/features/ui/components/form/FormField';
import Link from 'next/link';
import { Input } from '@nextui-org/react';

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full px-4 sm:w-2/3 lg:px-0"
    >
      {isRegisterForm && (
        <>
            <div className="pb-5">
              <FormField
                id="person_firstname"
                label="ชื่อ *"
                placeholder="กรอกชื่อจริง ไม่ต้องใส่คำนำหน้า"
                error={errors.person_firstname?.message}
                className="block w-full rounded-sm pt-4 text-lg text-[#002d63]"
                {...register('person_firstname')}
              ></FormField>
            </div>
            <div className="pb-5">
              <FormField
                id="person_lastname"
                label="นามสกุล *"
                placeholder="กรอกนามสกุล"
                className="block w-full rounded-sm pt-4 text-lg text-[#002d63]"
                error={errors.person_lastname?.message}
                {...register('person_lastname')}
              ></FormField>
            </div>
          <div className="pb-5">
          <FormField
            id="person_id"
            label="เลขบัตรประชาชน *"
            maxLength={13}
            placeholder="กรอกเลขบัตรประชาชน"
            className="block w-full rounded-sm pt-4 text-lg text-[#002d63]"
            error={errors.person_id?.message}
            {...register('person_id')}
          ></FormField>
          </div>
          <div className="pb-5">
          <FormField
            id="person_tel"
            label="เบอร์โทรศัพท์มือถือ *"
            maxLength={10}
            placeholder="กรอกเบอร์โทรศัพท์มือถือ"
            className="block w-full rounded-sm pt-4 text-lg text-[#002d63]"
            error={errors.person_tel?.message}
            {...register('person_tel')}
          ></FormField>
          </div>
          <div className="pb-5">
          <FormField
            id="person_email"
            label="อีเมล *"
            placeholder="กรอกอีเมล"
            className="block w-full rounded-sm pt-4 text-lg text-[#002d63]"
            error={errors.person_email?.message}
            {...register('person_email')}
          ></FormField>
          </div>
        </>
      )}

      <div className="pb-5 pt-4">
        <FormField
          id="username"
          type="text"
          label="ชื่อผู้ใช้งาน (Username) *"
          placeholder="กรอกชื่อผู้ใช้งาน (Username)"
          className="block w-full rounded-sm  text-lg text-[#002d63]"
          error={errors.person_username?.message}
          {...register('person_username')}
        ></FormField>
      </div>
      <div className="pb-5">
        <FormField
          id="password"
          type="password"
          label="รหัสผ่าน *"
          placeholder="กรอกรหัสผ่าน"
          className="block w-full rounded-sm pt-4 text-lg text-[#002d63]"
          error={errors.person_password?.message}
          {...register('person_password')}
        ></FormField>
      </div>
           
      <div className=" block w-full items-center justify-between pb-2 pt-4">
        <Button
          type="submit"
          color="primary"
          className="focus:shadow-outline-purple mt-4 block w-full rounded-lg border border-transparent bg-[#0050f0] py-2 text-center text-base font-medium leading-5 text-white transition-colors duration-150 hover:bg-[#f68b1f] focus:outline-none active:bg-purple-600"
        >
          {isRegisterForm ? 'สมัครบัญชี' : 'เข้าสู่ระบบ'}
        </Button>
      </div>
      <div className="text-right mt-2">
        <Link href={isRegisterForm ? '/auth/sign-in' : '/auth/sign-up'} className="text-[#F46F09] font-medium">
          {isRegisterForm
            ? 'ต้องการเข้าสู่ระบบ?'
            : 'ต้องการสมัครบัญชีเข้าใช้งาน?'}
        </Link>
        </div>
    </form>
  );
};

export default AuthForm;
