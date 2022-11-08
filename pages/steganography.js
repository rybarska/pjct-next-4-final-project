import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

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
  width: 98%;
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
  const [image, setImage] = useState(null);
  const [textFile, settextFile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append('file', image);
    const response = await fetch('/api/file', {
      method: 'POST',
      body,
    });
  };
  return (
    <>
      <Head>
        <title>Steganography</title>
        <meta name="description" content="Steganography" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div>Steganography</div>
      <form
        css={formStyles}
        action="/send-data-here"
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <h4>Select Image</h4>
          <img id="output" src={createObjectURL} />
          <input type="file" name="myImage" onChange={uploadToClient} />
        </div>
      </form>
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
