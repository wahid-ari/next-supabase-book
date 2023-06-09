import type { NextComponentType } from 'next';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GlobalProvider } from '@context/GlobalContext';
import { AxiosProvider } from '@context/AxiosContext';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SessionProvider, useSession } from 'next-auth/react';
import LoadingDots from '@components/systems/LoadingDots';

// Show progress on All Pages
// import Router from 'next/router';

// Router.events.on('routeChangeStart', () => NProgress.start());
// Router.events.on('routeChangeComplete', () => NProgress.done());
// Router.events.on('routeChangeError', () => NProgress.done());

const inter = Inter({ subsets: ['latin'] });

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  const router = useRouter();

  function handleStart(url: string) {
    let splitUrl = url.split('/');
    let isDetail =
      (splitUrl[1] == 'books' || splitUrl[1] == 'authors' || splitUrl[1] == 'genres' || splitUrl[1] == 'tags') &&
      splitUrl.length > 2;
    // Show progress only in Detail Pages
    if (splitUrl.includes('detail') || splitUrl.includes('edit') || isDetail) {
      NProgress.start();
    }
  }
  const handleStop = () => NProgress.done();

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ThemeProvider attribute='class' storageKey='theme' enableSystem={false} defaultTheme='light'>
      <GlobalProvider>
        <SessionProvider session={session}>
          <AxiosProvider>
            <main className={inter.className}>
              <Toaster
                gutter={4}
                toastOptions={{
                  style: {
                    maxWidth: 380,
                    padding: '2px 4px',
                  },
                }}
              />
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </main>
          </AxiosProvider>
        </SessionProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  if (status === 'loading')
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <LoadingDots medium />
      </div>
    );

  return children;
}

export default MyApp;
