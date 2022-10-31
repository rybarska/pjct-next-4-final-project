import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const upMostElementStyles = css`
  display: flex;
  justify-content: center;
  padding: 6px 0px;
  color: black;
  background-color: #f2f5fc;
  font-size: 26px;
  font-family: 'Courier New', Courier, monospace;
`;

const logoStyles = css`
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 10px;
`;

const navStyles = css`
  background-color: black;
  border-radius: 6px;
  display: flex;
  > a {
    font-size: 27px;
    text-decoration: none;
    color: #d7d8fc;
    padding: 20px;
  }
  > div {
    margin-right: auto;
    display: flex;
    font-size: 27px;
    text-decoration: none;
    color: #f7ebe1;
  }
`;

export default function Header(props) {
  return (
    <header>
      <div css={upMostElementStyles}>
        <a css={logoStyles}>
          <Image
            src={`/images/logo.png`}
            alt="schematic drawing of a drone"
            width="100"
            height="100"
          />
        </a>
        <h1>Space Drone Incident Reporting System</h1>
        <br></br>
      </div>
      <nav css={navStyles}>
        <div css={navStyles}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/privateProfile">Private-profile</Link>
        </div>
        {props.user && props.user.username}
        {props.user ? (
          <a
            css={css`
              margin-left: 10px;
            `}
            href="/logout"
          >
            Logout
          </a>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
