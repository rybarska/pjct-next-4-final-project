import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getPhotoById, Photo } from '../../database/photos';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

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

/* const addToCartStyles = css`
  background-color: #e4c0fc;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  font-weight: bold;
  > a + a {
    margin-left: 13px;
  }
`; */

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
          <link rel="icon" href="/images/favicon.ico" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/photos">photos page</Link>
      </div>
    );
  }

  return (
    <div css={photoStyles}>
      <Head>
        <title>{props.photo.title}</title>
        <meta name="description" content={`${props.photo.title}`} />
      </Head>
      <h1>{props.photo.title}</h1>
      <Image
        src={`/${props.photo.id}-${props.photo.title.toLowerCase()}.png`}
        alt=""
        width="400"
        height="400"
      />
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
