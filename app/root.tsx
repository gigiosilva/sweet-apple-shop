import type { ReactNode } from 'react';
import { useEffect, useContext } from 'react';
import { withEmotionCache } from '@emotion/react';
import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';

import { ClientStyleContext, ServerStyleContext } from '~/lib/emotion/context';
import { theme } from '~/lib/theme';
import {
  Heading, VStack, Text, ChakraProvider, Box,
} from '@chakra-ui/react';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

export const meta: MetaFunction = () => ({ title: 'Sweet Apple Store' });

export default function App() {
  return (
    <Document>
      <NavBar />
      <Box
        maxW="7xl"
        minH="calc(100vh - 60)"
        mx={{
          base: '4%', sm: '4%', md: '10%', lg: '16%', xl: '20%',
        }}
        py={{ base: '6', md: '8', lg: '12' }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error('Boundary:', error);
  return (
    <Document>
      <VStack h="100vh" justify="center" p={20}>
        <Heading>404</Heading>
        <Text>{error.message}</Text>
        <hr />
      </VStack>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  let message;
  switch (caught.status) {
    case 401:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </Text>
      );
      break;
    case 404:
      message = (
        <Text>
          Oops! Looks like you tried to visit a page that does not exist.
        </Text>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document>
      <VStack h="100vh" justify="center" p={20}>
        <Heading>
          {caught.status}
          :
          {' '}
          {caught.statusText}
        </Heading>
        {message}
      </VStack>
    </Document>
  );
}

interface DocumentProps {
  children: ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverSyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const { tags } = emotionCache.sheet;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstaticom" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
          <Meta />
          <Links />
          {serverSyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
        </body>
      </html>
    );
  },
);
