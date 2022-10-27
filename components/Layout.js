import { css } from '@emotion/react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  padding: 10px 20px;
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header user={props.user} />
      </div>

      <main css={mainStyles}>{props.children}</main>

      <Footer />
    </>
  );
}
