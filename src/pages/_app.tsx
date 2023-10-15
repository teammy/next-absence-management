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

const notosansthai = Noto_Sans_Thai({
  weight: '400',
  subsets: ['thai'],
})

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
        <NextUIProvider className={notosansthai.className}>
        <Component {...pageProps} />
        </NextUIProvider>
        <ReactQueryDevtools initialIsOpen />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
