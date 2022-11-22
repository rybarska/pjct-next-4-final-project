import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const boxStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  background: rgb(0, 0, 0);
  background: rgb(230, 227, 240);
  background: rgb(230, 227, 240);
  background: linear-gradient(
    0deg,
    rgba(230, 227, 240, 0.9910481770833334) 0%,
    rgba(78, 71, 93, 1) 0%,
    rgba(2, 1, 5, 1) 100%
  );
  color: white;
  font-family: '-apple-system, BlinkMacSystemFont, ' Segoe UI
    ', Roboto, Oxygen,
    Ubuntu, Cantarell, ' Open Sans ', ' Helvetica Neue
    ', sans-serif';
  padding: 20px;
  h2 {
    margin-top: 0;
  }
  & + & {
    margin-top: 25px;
  }
`;

const h2Styles = css`
  font-family: Arial, Helvetica, sans-serif;
`;

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
      <section css={boxStyles}>
        <h2 css={h2Styles}>
          The Space Drone Incident Reporting System collects, classifies, and
          analyses information on security incidents involving drones operating
          in the outer space. Reporting and access to information is restricted
          to registered users.
        </h2>
        <div css={imageDisplayStyles}>
          <a>
            <Image
              css={imageStyles}
              src={`/images/computerLabBW.png`}
              alt="computer screens with drones flying in space"
              width="400"
              height="400"
            />
          </a>
        </div>
      </section>
    </>
  );
}
