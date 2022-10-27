import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const upMostElementStyles = css`
  display: flex;
  justify-content: center;
  padding: 6px 0px;
  color: #362e2e;
  background-color: #f7ebe1;
  font-size: 20px;
  font-family: 'Courier New', Courier, monospace;
`;

const logoStyles = css`
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 10px;
`;

const navStyles = css`
  background-color: #362e2e;
  border-radius: 6px;
  display: flex;
  > a {
    font-size: 20px;
    text-decoration: none;
    color: #f7ebe1;
    padding: 20px;
  }
  > div {
    margin-right: auto;
    display: flex;
    font-size: 20px;
    text-decoration: none;
    color: #f7ebe1;
  }
`;

export default function Header(props) {
  const totalItemsInCart = props.cookieState
    ? props.cookieState.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.counts;
      }, 0)
    : 0;

  return (
    <header>
      <div css={upMostElementStyles}>
        <a css={logoStyles}>
          <Image
            src={`/droneDrawing.png`}
            alt="schematic drawing of a drone"
            width="80"
            height="80"
          />
        </a>
        <h1>Space Drone Incident Reporting Database</h1>
        <br></br>
      </div>
      <nav css={navStyles}>
        <div css={navStyles}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/private-profile">Private-profile</Link>
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
