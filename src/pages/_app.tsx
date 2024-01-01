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
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const ttFont = localFont({ src: '../../public/fonts/thongterm-reg.woff2' })
const ttFont_bold = localFont({ src: '../../public/fonts/thongterm-bold.woff2' })
const Ekachon = localFont({ src: '../../public/fonts/Ekachon-Regular.ttf' })
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
        <NextUIProvider className={clsx(Ekachon.className,"text-lg")}>
        <MantineProvider theme={theme}>
        <Component {...pageProps} />
        </MantineProvider>
        </NextUIProvider>
        <ReactQueryDevtools initialIsOpen />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
