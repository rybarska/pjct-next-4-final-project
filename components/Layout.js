import { css } from '@emotion/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  padding: 10px 20px;
  background: #f2f5fc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div>
        <Header user={props.user} />
      </div>

      <main css={mainStyles}>{props.children}</main>

      <Footer />
    </>
  );
}
