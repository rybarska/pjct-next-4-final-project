/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';
import Head from 'next/head';
import Image from 'next/image';

Sentry.init({
  dsn: 'https://5c38610a970e4804a999a672e43051bd@o4504306751897600.ingest.sentry.io/4504306756091904',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const textBoxStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  width: 700px;
  text-align: center;
`;

const boxStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  width: 700px;
  text-align: center;
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
`;

const h2Styles = css`
  font-family: Arial, Helvetica, sans-serif;
`;

const imageDisplayStyles = css`
  display: flex;
  justify-content: center;
`;
const imageStyles = css`
  border-radius: 3%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon3.ico" />
      </Head>

      <div>Home</div>
      <section css={textBoxStyles}>
        <h2 css={h2Styles}>
          The Space Drone Incident Reporting System collects, classifies, and
          analyses information on security incidents involving drones operating
          in the outer space. Reporting and access to information is restricted
          to registered users.
        </h2>
        <div css={boxStyles}>
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
        </div>
      </section>
    </>
  );
}
