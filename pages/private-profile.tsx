import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getUserBySessionToken, User } from '../database/users';

const imageDisplayStyles = css`
  display: flex;
  justify-content: center;
  border-radius: 50%;
`;
const imageStyles = css`
  border-radius: 3%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const formStyles = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
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
  width: 500px;
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
      box-shadow: box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-webkit-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
-moz-box-shadow: 15px 17px 22px -14px rgba(0,0,0,0.63);
`;

const deleteButtonStyles = css`
  background: #D0001B;
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

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
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
        <title>Personal Information</title>
        <meta name="description" content="Biography of the person" />
        <link rel="icon" href="/images/favicon2.ico" />
      </Head>
      <h1>Personal Information</h1>
      <h2>username: {props.user.username}</h2>
      <hr />
      <div>
        <form
          css={formStyles}
          action="/api/steganography"
          method="post"
          enctype="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label>
            <br></br>
            email
            <br></br>
            <input
              css={inputStyles}
              /* value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value.toLowerCase());
              }} */
            />
          </label>
          <br></br>
          <label>
            <br></br>
            phone number
            <br></br>
            <input
              css={inputStyles}
              /* value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }} */
            />
          </label>
          <br></br>
          <br></br>
          photo
          <br></br>
          <label for="carrierImage">
            <input
              css={inputStyles}
              type="file"
              name="myImage"
              accept="image/png"
              /* required
              onChange={(event) => {
                event.preventDefault();
                setCarrierImage(event.currentTarget.files[0]);
                uploadCarrierImageToClient(event);
              }} */
            />
          </label>
          <br></br>
          <br></br>
          <br></br>
          <button css={buttonStyles}>Add info</button>
        </form>
      </div>
      <div>
        <form
          css={formStyles}
          action="/api/steganography"
          method="post"
          enctype="multipart/form-data"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <button css={deleteButtonStyles}>Delete User</button>
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
