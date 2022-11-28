/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

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

const passwordInputStyles = css`
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
  box-shadow: 15px 17px 22px -14px rgba(0, 0, 0, 0.63);
  -webkit-box-shadow: 15px 17px 22px -14px rgba(0, 0, 0, 0.63);
  -moz-box-shadow: 15px 17px 22px -14px rgba(0, 0, 0, 0.63);
`;

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }

    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/private-profile`);
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register new users" />
        <link rel="icon" href="/images/favicon3.ico" />
      </Head>
      <div>Register</div>
      <br></br>

      <div css={formStyles}>
        <h2>Registration</h2>
        {errors.map((error) => {
          return (
            <p
              css={css`
                background-color: #c80101;
                color: white;
                padding: 5px;
              `}
              key={error.message}
            >
              ERROR: {error.message}
            </p>
          );
        })}

        <label>
          username&nbsp;
          <br></br>
          <input
            css={inputStyles}
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value.toLowerCase());
            }}
          />
        </label>
        <br></br>
        <br />
        <label>
          password &nbsp;
          <br></br>
          <input
            css={passwordInputStyles}
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </label>
        <br></br>
        <br></br>
        <button
          css={buttonStyles}
          onClick={async () => {
            await registerHandler();
          }}
        >
          Register
        </button>
        <br></br>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
