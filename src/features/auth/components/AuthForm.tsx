import { useForm, type SubmitHandler } from 'react-hook-form';
import { type LoginInput, type RegisterInput } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as validators from '../helpers/validators';
import { capitalize } from 'lodash';
// import Button from '~/features/ui/components/Button';
import FormField from '~/features/ui/components/form/FormField';
// import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardBody,
  Link,
  CardFooter,
  Input,
  Button,
  Tabs,
  Tab,
} from '@nextui-org/react';
import { useState } from 'react';

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
  const [selected, setSelected] = useState<'login' | 'sign-up'>('login');

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

  const kindName = kind === 'register' ? 'สมัครสมาชิก' : 'ยินดีต้อนรับ';
  const kindDesc =
    kind === 'register'
      ? 'สมัครสมาชิกเพื่อเริ่มใช้งาน'
      : 'เข้าสู่ระบบเพื่อดำเนินการต่อ';
  return (
    <div className='flex justify-center'>
      <Card className="w-[500px] max-w-full">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            radius="lg" 
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="เข้าสู่ระบบ" className="m-3 py-8 text-lg">
              <div className="flex justify-center mb-14">
                <div className="">
                  <p className="font-medum text-center text-4xl tracking-tight">
                    ยินดีต้อนรับ
                  </p>
                  <p className="text-lg">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-4">
                <FormField
                  id="email"
                  type="email"
                  label="อีเมล"
                  error={errors.email?.message}
                  {...register('email')}
                ></FormField>
                <FormField
                  id="password"
                  type="password"
                  label="รหัสผ่าน"
                  error={errors.password?.message}
                  {...register('password')}
                ></FormField>

                <div className="flex justify-end gap-2">
                  <Button type="submit" fullWidth className="bg-[#0150F0] text-lg py-7 text-white">
                    เข้าสู่ระบบ
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab
              key="sign-up"
              title="สมัครสมาชิก"
              className="m-3 py-8  text-lg"
            >
              <div className="flex justify-center mb-14">
                <div className="">
                  <p className="font-medum text-center text-4xl tracking-tight">
                  สมัครสมาชิก
                  </p>
                  <p className="text-lg">สมัครสมาชิกเพื่อเริ่มใช้งาน</p>
                </div>
              </div>
              <form  onSubmit={handleSubmit(onSubmit)} className="flex h-[300px] flex-col gap-4">
                <FormField
                  id="name"
                  label="ชื่อ-สกุล"
                  error={errors.name?.message}
                  {...register('name')}
                ></FormField>

                <FormField
                  id="email"
                  type="email"
                  label="อีเมล"
                  error={errors.email?.message}
                  {...register('email')}
                ></FormField>
                <FormField
                  id="password"
                  type="password"
                  label="รหัสผ่าน"
                  error={errors.password?.message}
                  {...register('password')}
                ></FormField>

                <div className="flex justify-end gap-2">
                  <Button
                    type="submit"
                    fullWidth
                    className="w-full bg-[#F68B1F] text-lg py-7 text-white"
                  >
                    สมัครสมาชิก
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthForm;
