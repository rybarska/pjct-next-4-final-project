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
      id: {props.user.id} username: {props.user.username}
      <hr />
      THIS IS NOT FUNCTIONAL BUT AN EXAMPLE
      <br />
      <button>Delete User</button>
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
