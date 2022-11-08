import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

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
  width: 500px;
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
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(target).attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  return (
    <>
      <Head>
        <title>Steganography</title>
        <meta name="description" content="Steganography" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div>Steganography</div>
      <br></br>
      <div css={formStyles}>
        {/* <input
          css={inputStyles}
          type="file"
          name="img"
          id=""
          accept="image/png"
          onChange={(event) => {
            readURL(this);
          }}
        ></input> */}
        <img id="output" src="" width="100" height="100" />

        <input
          name="photo"
          type="file"
          accept="image/png"
          onchange="document.getElementById('output').src = window.URL.createObjectURL(this.files[0])"
        ></input>
        <div>Source image:</div>
        <img id="image1" src="" alt=""></img>
        <input css={inputStyles} id="text" type="text"></input>
        <button css={buttonStyles} onClick="hideText()">
          Hide message into image
        </button>
        <img id="image2" src="" alt=""></img>
        <input
          css={inputStyles}
          type="file"
          name="img1"
          id=""
          accept="image/*"
          onChange="decode(this)"
        ></input>
        <h2 id="decoded">Decoded text</h2>
      </div>
    </>
  );
}
