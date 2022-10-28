import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const imageStyles = css`
  display: flex;
  justify-content: center;
  margin: auto;
  background-color: black;
`;

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div>About</div>
      <h2>
        The Space Drone Incident Reporting System collects, classifies, and
        analyses information on security incidents involving drones operating in
        the outer space. Reporting and access to information is restricted to
        registered users.
      </h2>
      <a>
        <Image
          css={imageStyles}
          src={`/images/spaceDroneInAbout.jpeg`}
          alt="drone flying in outer space"
          width="400"
          height="400"
        />
      </a>
    </>
  );
}
