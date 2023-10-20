import { useRouter } from 'next/router';
import { type LoginInput } from '../types';
import AuthForm from './AuthForm';
import { useAppStore } from '~/features/store';
import { signIn } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  const setUiToast = useAppStore((state) => state.setUiToast);

  const submit = async (credentials: LoginInput) => {
    console.log('credentials', credentials)
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    console.log('result status', result?.status)

    if (result?.ok) return router.replace('/leaves');
    // if (result?.error) {
    //   console.log('result?.error', result?.error)
    //   setUiToast({ type: 'Error', message: 'Invalid Credentials' });
    // }

    if (result?.status === 401) {
      setUiToast({ type: 'Error', message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    }
  };

  return <AuthForm kind="login" onSubmit={submit}></AuthForm>;
};

export default Login;
