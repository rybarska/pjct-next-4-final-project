import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Head>
        <title>Private profile</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div>Private profile</div>
      <p>Register/Login to access private profile.</p>
    </>
  );
}
