import { css } from '@emotion/react';
import { load } from 'cheerio';
import * as http from 'http';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPhotoById, Photo } from '../../database/photos';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

/* const photoStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;
  background-color: pink;
  min-width: 0;
  min-height: 0;
  background: rgb(230,227,240);
background: linear-gradient(55deg, rgba(230,227,240,0.9910481770833334) 0%, rgba(78,71,93,1) 0%, rgba(2,1,5,1) 100%);
  box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
  box-sizing: border-box;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`; */

const photoStyles = css`
  display: block;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  width: 800px;
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
  padding: 50px;
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
text-align: center;
`;

type Props =
  | {
      photo: Photo;
    }
  | {
      error: string;
    };

export default function SinglePhoto(props: Props) {
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Photo not found</title>
          <meta name="description" content="Photo not found" />
          <link rel="icon" href="/images/favicon2.ico" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/photos">photos page</Link>
      </div>
    );
  }

  /* async function downloadImage( url, path) => {
      const linkResponse = await fetch(
        `/photos/{photo.id}`,
      );
      const body = await linkResponse.text();
      const imageResponse = await fetch( url);
      const arraybuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arraybuffer);
      fs.writeFile(path, buffer, () => {});
      const $ = load(body);
    }; */

  async function downloadImage() {
    const file = fs.createWriteStream('file.png');
    const request = http.get(
      'http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.png',
      function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on('finish', () => {
          file.close();
          console.log('Download Completed');
        });
      },
    );
  }

  return (
    <div css={photoStyles}>
      <Head>
        <title>{props.photo.title}</title>
        <meta name="description" content={`${props.photo.title}`} />
      </Head>

      <Image
        src={`/images/${props.photo.title}${props.photo.id}.png`}
        alt=""
        width="500"
        height="500"
      />
      <br></br>
      <br></br>
      <br></br>
      <button
        css={buttonStyles}
        onClick={async () => {
          await downloadImage();
        }}
      >
        Download
      </button>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // Retrieve the photo ID from the URL
  const photoId = parseIntFromContextQuery(context.query.photoId);

  if (typeof photoId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'photo not found',
      },
    };
  }

  const foundPhoto = await getPhotoById(photoId);

  if (typeof foundPhoto === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Photo not found',
      },
    };
  }

  return {
    props: {
      photo: foundPhoto,
    },
  };
}
