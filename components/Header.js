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
const sectionStyles = css`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.9910481770833334) 0%,
    rgba(57, 54, 85, 0.8793402777777778) 58%,
    rgba(4, 0, 6, 1) 94%
  );
`;

const navStyles = css`
  border-radius: 6px;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  > a {
    font-size: 27px;
    text-decoration: none;
    color: rgba(241, 245, 255, 1);
    padding: 20px;
  }
  > div {
    margin-right: auto;
    display: flex;
    font-size: 27px;
    text-decoration: none;
  }
`;

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header>
      <div css={upMostElementStyles}>
        <a css={logoStyles}>
          <Image
            src={`/images/logo.png`}
            alt="logo with image of a drone in space"
            width="100"
            height="100"
          />
        </a>
        <h2>SDIRS | Space Drone Incident Reporting System</h2>
        <br></br>
      </div>
      <section css={sectionStyles}>
        <nav css={navStyles}>
          <div css={navStyles}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/privateProfile">Private-profile</Link>
          </div>
          {props.user && props.user.username}
          {props.user ? (
            <Anchor
              css={css`
                margin-left: 10px;
              `}
              href="/logout"
            >
              Logout
            </Anchor>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </section>
    </header>
  );
}
