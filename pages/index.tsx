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
          src={`/images/spaceDrone18.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone13.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone33.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone21.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone30.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone25.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone16.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone28.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone26.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone14.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone2.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone4.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone34.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone35.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
        <Image
          css={imageStyles}
          src={`/images/spaceDrone36.jpeg`}
          alt="drone flying in outer space"
          width="300"
          height="300"
        />
      </a>
    </>
  );
}
