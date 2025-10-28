// Load Tailwind first so its base and utility layers are available for
// custom global overrides in `global.css`.
import '@/css/tailwind.css';
import '@/css/prism.css';
import '@/css/global.css';
import 'katex/dist/katex.css';

import '@fontsource/fira-code';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Analytics from '@/components/analytics';
import { ClientReload } from '@/components/ClientReload';
import LayoutWrapper from '@/components/LayoutWrapper';
import siteMetadata from '@/data/siteMetadata';

import GeistProviderWithTheme from '@/components/GeistProviderWithTheme';

const isDevelopment = process.env.NODE_ENV === 'development';
const isSocket = process.env.SOCKET;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <GeistProviderWithTheme>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </GeistProviderWithTheme>
    </ThemeProvider>
  );
}
// GeistProviderWithTheme is a client-only component exported from
// `components/GeistProviderWithTheme.tsx` to keep hooks like `useTheme`
// inside client components and avoid SSR/CSR hydration mismatches.
