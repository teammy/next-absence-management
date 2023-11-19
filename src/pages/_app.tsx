import { type AppProps } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {NextUIProvider} from '@nextui-org/react';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import { type NextPage } from 'next';
import { type ReactElement, type ReactNode } from 'react';
import { Noto_Sans_Thai } from 'next/font/google'
import localFont from 'next/font/local'

const kvlFont = localFont({ src: '../../public/fonts/kvl-reg.woff2' })
const kvlFont_bold = localFont({ src: '../../public/fonts/kvl-bold.woff2' })
const ttFont = localFont({ src: '../../public/fonts/thongterm-reg.woff2' })
const ttFont_bold = localFont({ src: '../../public/fonts/thongterm-bold.woff2' })
const mlpFont = localFont({ src: '../../public/fonts/maledpan.woff2' })
const mlpFont_bold = localFont({ src: '../../public/fonts/maledpan-bold.woff2' })
const fciconic = localFont({ src: '../../public/fonts/fc-iconic-bold.woff2' })
import clsx from 'clsx';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (props: { children: ReactNode }) => ReactElement;
};

interface AppPropsWithLayout extends AppProps<{ session: Session | null }> {
  Component: NextPageWithLayout;
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const Layout = Component.getLayout ?? (({ children }) => <>{children}</>);

  return (
    <SessionProvider session={session}>
      <Layout >
        <NextUIProvider className={clsx(mlpFont.className,"text-lg")}>
        <Component {...pageProps} />
        </NextUIProvider>
        <ReactQueryDevtools initialIsOpen />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
