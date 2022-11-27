// @ts-nocheck
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FormData from 'form-data';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
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
  background: rgb(230, 227, 240);
  background: linear-gradient(
    55deg,
    rgba(230, 227, 240, 0.9910481770833334) 0%,
    rgba(78, 71, 93, 1) 0%,
    rgba(2, 1, 5, 1) 100%
  );
  box-shadow: 15px 17px 22px -14px rgba(0, 0, 0, 0.63);
  -webkit-box-shadow: 15px 17px 22px -14px rgba(0, 0, 0, 0.63);
  -moz-box-shadow: 15px 17px 22px -14px rgba(0, 0, 0, 0.63);
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
  width: 200px;
  height: 50px;
  border-radius: 6px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const downloadButtonStyles = css`
  background: rgb(242, 196, 250);
  color: black;
  width: 350px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 6px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

type Props = {
  user?: User;
};

export default function Steganography(props: Props) {
  const [dataFile, setDataFile] = useState<File | null>(null);
  console.log('dataFile', dataFile);
  const [carrierImage, setCarrierImage] = useState<File | null>(null);
  console.log('carrierImage', carrierImage);
  const [stegImage, setStegImage] = useState<File | null>(null);

  const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);
  // const [errors, setErrors] = useState<{ message: string }[]>([]);

  const uploadDataFileToClient = (event: any) => {
    const d = event.target.files[0];

    setDataFile(d);
    setCreateObjectURL(URL.createObjectURL(d));
  };
  const uploadCarrierImageToClient = (event: any) => {
    const i = event.target.files[0];
    setCarrierImage(i);
    setCreateObjectURL(URL.createObjectURL(i));
  };
  const uploadStegImageToClient = (event: any) => {
    const s = event.target.files[0];
    setCarrierImage(s);
    setCreateObjectURL(URL.createObjectURL(s));
  };

  const Encode = async (event: any) => {
    const formData = new FormData();
    formData.append('myText', dataFile);
    formData.append('myImage', carrierImage);
    const response = await fetch('/api/steganography', {
      method: 'POST',
      body: formData,
    });
  };

  const Decode = async (event: any) => {
    const formData = new FormData();
    formData.append('myStegImage', stegImage);
    const response = await fetch('/api/decode', {
      method: 'POST',
      body: formData,
    });
  };

  const downloadEncodedImage = async (event: any) => {
    await fetch(`/uploads/stegResult.png`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.download = 'image.png';
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadDecodedText = async (event: any) => {
    await fetch(`/uploads/decodedText.rtf`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.download = 'text.rtf';
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <title>Steganography</title>
        <meta name="description" content="Steganography" />
        <link rel="icon" href="/images/favicon2.ico" />
      </Head>
      <div>Steganography</div>
      <div css={formsStyles}>
        <div css={formStyles}>
          <section>
            <form
              action="/api/steganography"
              method="post"
              encType="multipart/form-data"
              onSubmit={async (event) => {
                event.preventDefault();
                Encode(event);
                window.location.href = '/steganography';
              }}
            >
              <h2>Select text file to hide</h2>
              <label for="dataFile">
                <input
                  css={inputStyles}
                  type="file"
                  name="myText"
                  accept="text"
                  required
                  onChange={(event) => {
                    event.preventDefault();
                    setDataFile(event.currentTarget.files[0]);
                    //uploadDataFileToClient;
                  }}
                />
              </label>
              <br></br>
              <br></br>

              <h2>Select carrier image</h2>
              <label for="carrierImage">
                <input
                  css={inputStyles}
                  type="file"
                  name="myImage"
                  accept="image/png"
                  required
                  onChange={(event) => {
                    event.preventDefault();
                    setCarrierImage(event.currentTarget.files[0]);
                    uploadCarrierImageToClient(event);
                  }}
                />
              </label>
              <img src={createObjectURL} alt="" />
              <br></br>
              <br></br>
              <div>
                <button
                  css={buttonStyles}
                  className="btn btn-primary"
                  type="submit"
                >
                  Encode
                </button>
              </div>

              {/* <a>
            <Image
              // css={imageStyles}
              src={`/uploads/stegResult.png`}
              alt="steganography image with encoded text file"
              width="400"
              height="400"
            />
            </a> */}
            </form>
          </section>
          <br></br>
          <section>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                downloadEncodedImage(event);
                window.location.href = '/steganography';
              }}
            >
              <button
                css={downloadButtonStyles}
                className="btn btn-primary"
                type="submit"
              >
                Download steg image
              </button>
            </form>
          </section>
        </div>
        <div css={formStyles}>
          <section>
            <form
              action="/api/steganography"
              method="post"
              encType="multipart/form-data"
              onSubmit={async (event) => {
                event.preventDefault();
                Decode(event);
                window.location.href = '/steganography';
              }}
            >
              <h2>Select image to decode</h2>
              <label for="stegImage">
                <input
                  css={inputStyles}
                  type="file"
                  name="myStegImage"
                  accept="image/png"
                  required
                  onChange={(event) => {
                    event.preventDefault();
                    setStegImage(event.currentTarget.files[0]);
                    // uploadStegImageToClient(event);
                  }}
                />
              </label>
              {/* <img src={./public/images/stegResult.png} alt=""/> */}
              <br></br>
              <br></br>
              <div>
                <button
                  css={buttonStyles}
                  className="btn btn-primary"
                  type="submit"
                >
                  Decode
                </button>
              </div>
            </form>
          </section>
          <br></br>
          <section>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                downloadDecodedText(event);
                window.location.href = '/steganography';
              }}
            >
              <button
                css={downloadButtonStyles}
                className="btn btn-primary"
                type="submit"
              >
                Download decoded text
              </button>
            </form>
          </section>
        </div>
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
