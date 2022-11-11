import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const imageDisplayStyles = css`
  display: flex;
  justify-content: center;
  border-radius: 50%;
`;
const imageStyles = css`
  border-radius: 3%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon2.ico" />
      </Head>

      <div>About</div>
      <h2>
        The Space Drone Incident Reporting System collects, classifies, and
        analyses information on security incidents involving drones operating in
        the outer space. Reporting and access to information is restricted to
        registered users.
      </h2>
      <div css={imageDisplayStyles}>
        <a>
          <Image
            css={imageStyles}
            src={`/images/spaceDroneScreens.png`}
            alt="computer screens with drones flying in space"
            width="400"
            height="400"
          />
        </a>
      </div>
    </>
  );
}
