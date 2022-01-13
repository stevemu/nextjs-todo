import { useEffect, useRef } from 'react';
import type { AppProps /*, NextWebVitalsMetric, AppContext */ } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    });
    queryClientRef.current = queryClient;
  }

  return (
    <>
      <Head>
        <title>todo</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default App;
