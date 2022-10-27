/** @jsxImportSource @emotion/react */

import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

//import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps, props }) {
  const [cookieState, setCookieState] = useState();

  console.log('say cookie state', cookieState);

  // this is to update state on first render when state is empty
  /* useEffect(() => {
    const currentCookieValue = getParsedCookie('cookies');
    setCookieState(currentCookieValue);
    console.log('say currentCookieValue', currentCookieValue);
    console.log("say getParsedCookie('cookies')", getParsedCookie('cookies'));
  }, []); */

  // to update the cookie every time state changes
  // this should run every time cookieState is updated
  useEffect(() => {
    function setAllCookies() {
      // do this only if cookie state is defined
      if (typeof cookieState !== 'undefined') {
        const newCookieValue = cookieState;
        setStringifiedCookie('cookies', newCookieValue);
      }
    }
    setAllCookies();
  }, [cookieState]);

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

      <Layout cookieState={cookieState} setCookieState={setCookieState}>
        <Component
          {...pageProps}
          cookieState={cookieState}
          setCookieState={setCookieState}
        />
      </Layout>
    </>
  );
}

export default MyApp;
