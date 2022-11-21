import { css } from '@emotion/react';
import { ProgressBar } from '@open-tech-world/cli-progress-bar';
import { load } from 'cheerio';
import FormData from 'form-data';
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
  const [dataFile, setDataFile] = useState(null);
  console.log('dataFile', dataFile);
  const [carrierImage, setCarrierImage] = useState(null);
  console.log('carrierImage', carrierImage);
  const [stegImage, setStegImage] = useState(null);

  const [createObjectURL, setCreateObjectURL] = useState(null);
  // const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  const uploadDataFileToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const d = event.target.files[0];

      setDataFile(d);
      setCreateObjectURL(URL.createObjectURL(d));
    }
  };
  const uploadCarrierImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setCarrierImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadStegImageToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const s = event.target.files[0];
      setCarrierImage(s);
      setCreateObjectURL(URL.createObjectURL(s));
    }
  };

  const uploadToServer = async () => {
    const formData = new FormData();
    formData.append('myText', dataFile);
    formData.append('myImage', carrierImage);
    const response = await fetch('/api/steganography', {
      method: 'POST',
      body: formData,
    });
  };

  const Decode = async () => {
    const formData = new FormData();
    formData.append('myStegImage', stegImage);
    const response = await fetch('/api/steganography', {
      method: 'POST',
      body: formData,
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
          console.log(event);
          event.preventDefault();
          console.log(dataFile);
          uploadToServer(event);
        }}
      >
        <h4>Select text file to hide</h4>
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

        <h4>Select carrier image</h4>
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
        <img src={createObjectURL} />
        <br></br>
        <br></br>
        <div>
          <button css={buttonStyles} className="btn btn-primary" type="submit">
            Encode text file into image
          </button>
        </div>
      </form>
      <form
        css={formStyles}
        action="/api/steganography"
        method="post"
        enctype="multipart/form-data"
        onSubmit={(event) => {
          console.log(event);
          event.preventDefault();
          Decode(event);
        }}
      >
        <h4>Select image to decode</h4>
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
              uploadStegImageToClient(event);
            }}
          />
        </label>
        <img src={createObjectURL} />
        <br></br>
        <br></br>
        <div>
          <button css={buttonStyles} className="btn btn-primary" type="submit">
            Decode
          </button>
        </div>
      </form>
    </>
  );
}
