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
  width: 36%;
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
  width: 147px;
  height: 40px;
  border-radius: 6px;
  font-size: 22px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div>Register</div>
      <br></br>

      <div css={formStyles}>
        <h2>Registration</h2>
        {errors.map((error) => {
          return (
            <p
              css={css`
                background-color: red;
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
            css={inputStyles}
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
