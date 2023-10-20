import { useRouter } from 'next/router';
import { type RegisterInput } from '../types';
import AuthForm from './AuthForm';
import { api } from '~/utils/api';
import { useAppStore } from '~/features/store';
import { set } from 'lodash';

const Register = () => {
  const router = useRouter();
  const setUiToast = useAppStore((state) => state.setUiToast);
  const { mutate: register } = api.auth.register.useMutation({
    onSuccess( data,status  ) {
      if (data) {
        setUiToast({ type: 'Success', message:"สมัครบัญชีเสร็จเรียบร้อยแล้ว" });
        setTimeout(() => {
          router.replace('/auth/sign-in');
        }, 1000);
      }
    },
    onError({ data  }) {
      // console.log('message status code', data?.httpStatus)
      if (data?.httpStatus === 500) {
        setUiToast({ type: 'Error', message:"อีเมลถูกใช้งานแล้ว" });
      }
    },
  });
  const submit = (credentials: RegisterInput) => {
    // console.log('credentials Register', credentials)
    register(credentials);
  };

  return <AuthForm kind="register" onSubmit={submit}></AuthForm>;
};

export default Register;
