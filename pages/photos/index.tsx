import { css } from '@emotion/react';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPhotos, Photo } from '../../database/photos';

const photoStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;
  h2 {
    margin-top: 0;
  }
  & + & {
    margin-top: 25px;
  }
`;

type Props = {
  photos: Photo[];
};

export default function Photos(props: Props) {
  return (
    <>
      <Head>
        <title>Photos</title>
        <meta name="description" content="Overview of the photos" />
        <link rel="icon" href="/images/favicon2.ico" />
      </Head>

      <h1>Photos</h1>

      {props.photos.map((photo) => {
        return (
          <div key={`photo-${photo.id}`} css={photoStyles}>
            <Link href={`/photos/${photo.id}`}>
              <a>
                {' '}
                <h2>{photo.title}</h2>
                <Image
                  src={`/${photo.id}-${photo.title.toLowerCase()}.png`}
                  alt=""
                  width="200"
                  height="200"
                />
              </a>
            </Link>
          </div>
        );
      })}
    </>
  );
}
// Anything inside of this function will
// ONLY be run on the server (in Node.js)
//
// This means you can access things like `fs`
//
// Note: this function can only be exported
// from files within pages/
export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const photos = await getPhotos();
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Photos` page component above
    props: {
      // First prop, containing all photos
      photos: photos,
      // Second prop, example
      //abc: 123,
    },
  };
}
