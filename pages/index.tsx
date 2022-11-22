import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const boxStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  color: black;
  font-weight: bold;
  font-size: 22px;
  box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
  box-sizing: border-box;
  width: 1350px;
  border: solid #7c729a 1px;
`;

const imageStyles = css`
  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon2.ico" />
      </Head>

      <div>Home</div>
      <a css={boxStyles}>
        <Image
          css={imageStyles}
          src={`/images/spaceDrone1.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone2.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone3.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone4.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone5.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone6.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone7.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone8.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone9.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone10.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone11.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone12.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone13.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone14.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone15.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone16.png`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
      </a>
    </>
  );
}
