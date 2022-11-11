import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const formStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 15px;
  text-align: center;
  padding: 20px;
  color: black;
  font-weight: bold;
  font-size: 22px;
  background: rgb(189, 192, 207);
  background: linear-gradient(
    0deg,
    rgba(189, 192, 207, 1) 0%,
    rgba(241, 245, 255, 1) 100%
  );
  box-sizing: border-box;
  width: 70%;
  border: solid #7c729a 6px;
`;

const inputStyles = css`
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  font-size: 22px;
  color: #180d24;
`;

const buttonStyles = css`
  background-color: #2f073d;
  color: white;
  width: 270px;
  height: 40px;
  border-radius: 6px;
  font-size: 22px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export default function Steganography() {
  const [carrierImage, setCarrierImage] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  const uploadCarrierImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setCarrierImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadDataFileToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const d = event.target.files[0];

      setDataFile(d);
      setCreateObjectURL(URL.createObjectURL(d));
    }
  };

  async function encodeHandler() {
    const registerResponse = await fetch('/api/steganography', {
      method: 'POST',
      /* headers: {
        'content-type': 'application/json',
      }, */
      body: JSON.stringify({
        carrierImage,
        dataFile,
      }),
    });
    /* const encodeResponseBody =
      (await encodeResponse.json()) as EncodeResponseBody; */

    /* if ('errors' in encodeResponseBody) {
      setErrors(encodeResponseBody.errors);
      return console.log(encodeResponseBody.errors);
    } */
  }
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append('file', carrierImage, dataFile);
    const response = await fetch('/api/steganography', {
      method: 'POST',
      body,
    });
  };

  return (
    <>
      <Head>
        <title>Steganography</title>
        <meta name="description" content="Steganography" />
        <link rel="icon" href="/images/favicon2.ico" />
      </Head>
      <div>Steganography</div>
      <form
        css={formStyles}
        action="/api/steganography"
        method="post"
        enctype="multipart/form-data"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <fieldset>
          <h4>Select text file to hide</h4>
          <label for="dataFile">
            <input
              css={inputStyles}
              type="file"
              name="myText"
              accept="text"
              onChange={(uploadDataFileToClient, setDataFile)}
              required
            />
          </label>
        </fieldset>
        <fieldset>
          <h4>Select carrier image</h4>
          <label for="carrierImage">
            <input
              css={inputStyles}
              type="file"
              name="myImage"
              accept="image/png"
              onChange={(uploadCarrierImageToClient, setCarrierImage)}
              required
            />
          </label>
          <img src={createObjectURL} />
        </fieldset>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={uploadToServer}
          >
            Send to server
          </button>
        </div>
      </form>
      {/* <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button> */}

      {/* <div>
          <h4>Select text file</h4>
          <div id="output" src={createObjectURL}></div>
          <input type="file" name="myText" onChange={uploadToClient} />
        </div> /*}


      {/* <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button> */}
    </>
  );
}
