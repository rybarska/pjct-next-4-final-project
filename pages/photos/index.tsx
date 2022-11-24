import { css } from '@emotion/react';
import { load } from 'cheerio';
import * as fs from 'fs';
import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPhotos, Photo } from '../../database/photos';

const wrapperStyles = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding: 10px;
  background-color: pink;
  min-width: 0;
  min-height: 0;
  background: rgb(230,227,240);
background: linear-gradient(55deg, rgba(230,227,240,0.9910481770833334) 0%, rgba(78,71,93,1) 0%, rgba(2,1,5,1) 100%);
  box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
  box-sizing: border-box;
  border-radius: 15px;
`;

const photoDivStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;
  height: 300px;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  min-width: 0;
  min-height: 0;
`;

const imageStyles = css`
  :hover {
    transform: scale(1.3);
  }
`;

const buttonStyles = css`
  background: #fa9d00;
  color: black;
  width: 200px;
  height: 50px;
  border-radius: 6px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
`;

const h1Styles = css`
  text-align: center;
`;

type Props = {
  photos: Photo[];
};

export default function Photos(props: Props) {
  return (
    <div>
      <Head>
        <title>Photos</title>
        <meta name="description" content="Overview of the images" />
        <link rel="icon" href="/images/favicon2.ico" />
      </Head>

      <h1 css={h1Styles}>Photos</h1>

      <div css={wrapperStyles}>
        {props.photos.map((photo) => {
          return (
            <div key={`photo-${photo.id}`} css={photoDivStyles}>
              <Link href={`/photos/${photo.id}`}>
                <Image
                  css={imageStyles}
                  src={`/images/${photo.title}${photo.id}.png`}
                  alt=""
                  width="260"
                  height="260"
                />
              </Link>
              <br></br>
              {/* <button css={buttonStyles}>Download</button> */}
            </div>
          );
        })}
      </div>
    </div>
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
    },
  };
}
