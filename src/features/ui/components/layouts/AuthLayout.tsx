import React from 'react'
import { type ReactNode } from 'react';
import Login from '~/features/auth/components/Login';
import Image from 'next/image';
import Toast from '../Toast';

export interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {

  return ( 
    <div className='flex flex-col md:flex-row h-screen'>
      <div className="md:w-1/2 flex items-center justify-center">
     <Image src="/assets/images/bg-auth.jpg" width={1700} height={1240} alt="" />
      </div>
      <div className="md:w-1/2 bg-gray-100 flex items-center justify-center"><main>{children}</main></div>
      <Toast></Toast>
      </div>
  )
}

export default AuthLayout