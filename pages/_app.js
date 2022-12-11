/** @jsxImportSource @emotion/react */

import { css, Global } from '@emotion/react';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

Sentry.init({
  dsn: 'https://5c38610a970e4804a999a672e43051bd@o4504306751897600.ingest.sentry.io/4504306756091904',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps, props }) {
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');
    const profileResponseBody = await profileResponse.json();

    if ('errors' in profileResponseBody) {
      setUser(undefined);
    } else {
      setUser(profileResponseBody.user);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);
  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
            margin: 0;
          }
        `}
      />

      <Layout user={user}>
        {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

export default MyApp;
