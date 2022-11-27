/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const textBoxStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  width: 1500px;
  text-align: center;
`;

const boxStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  width: 1500px;
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
          This is a demo of my UpLeveled bootcamp final project, showcasing work
          in progress. The goal is to build a reporting system that will employ
          an image steganography technique to secure queries submitted to the
          database (SDIRS, obviously fictitious).
        </h2>
        <br></br>
        <h2 css={h2Styles}>
          In a real-world scenario, the database and the steganography tool
          would be separated into two different apps.
        </h2>
        <br></br>
        <h2 css={h2Styles}>
          Steganography is the technique of hiding secret data within a
          non-secret carrier. In my app, I use a png image as carrier, and an
          rtf text file as data. The encoded result is a png image that looks
          identical to the original image, but contains hidden data. The
          steganography image can then be decoded to extract the data in a text
          file.
        </h2>
        <div css={boxStyles}>
          <div css={imageDisplayStyles}>
            <a>
              <Image
                css={imageStyles}
                src={`/images/stegGraphics.jpeg`}
                alt="computer screens with drones flying in space"
                width="1250"
                height="800"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
