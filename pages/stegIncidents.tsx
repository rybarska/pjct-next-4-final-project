/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FormData from 'form-data';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { getUserBySessionToken, User } from '../database/users';

const formsStyles = css`
  display: flex;
  justify-content: space-between;
`;

const formStyles = css`
  display: block;
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  color: white;
  font-weight: bold;
  font-size: 22px;
  background: rgb(230,227,240);
background: linear-gradient(55deg, rgba(230,227,240,0.9910481770833334) 0%, rgba(78,71,93,1) 0%, rgba(2,1,5,1) 100%);
  box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
  box-sizing: border-box;
  width: 47%;
  border: solid #7c729a 2px;
`;

const inputStyles = css`
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 22px;
  color: #180d24;
  border-radius: 5px;
  background-color: rgba(241, 245, 255, 1);
  border: solid #7c729a 2px;
`;

const buttonStyles = css`
  background: #fa9d00;
  color: black;
  width: 300px;
  height: 50px;
  border-radius: 6px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
`;

type Props = {
  user?: User;
};

export default function Steganography(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <>
      <Head>
        <title>SDIRS-steg</title>
        <meta name="description" content="SDIRS-steg" />
        <link rel="icon" href="/images/favicon3.ico" />
      </Head>
      <div>Steganography</div>
      <div css={formsStyles}>
        <form
          css={formStyles}
          action="/api/steganography"
          method="post"
          encType="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h2>Report incidents</h2>

          <input
            css={inputStyles}
            type="file"
            name="myImage"
            accept="image/png"
            required
            onChange={(event) => {
              event.preventDefault();
            }}
          />
          <br></br>
          <br></br>
          <div>
            <button
              css={buttonStyles}
              className="btn btn-primary"
              type="submit"
            >
              Submit POST query
            </button>
          </div>
        </form>
        <form
          css={formStyles}
          action="/api/steganography"
          method="post"
          encType="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h2>Retrieve incidents</h2>

          <input
            css={inputStyles}
            type="file"
            name="myStegImage"
            accept="image/png"
            required
            onChange={(event) => {
              event.preventDefault();
            }}
          />
          <br></br>
          <br></br>
          <div>
            <button
              css={buttonStyles}
              className="btn btn-primary"
              type="submit"
            >
              Submit GET query
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
