import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const imageStyles = css`
  margin-right: 20px;
  margin-bottom: 15px;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <div>Home</div>
      <a>
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
      </a>
    </>
  );
}
