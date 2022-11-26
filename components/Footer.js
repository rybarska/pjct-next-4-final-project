/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

const footerStyles = css`
  padding: 15px 20px;
  border-top: 2px solid #ddd;
  background-color: #f2f5fc;
  font-family: 'Syne Mono';
  font-size: 18px;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <a>
        <Image
          src="/images/logo.png"
          alt="drone flying in outer space"
          width="26"
          height="26"
        />
        &nbsp;SDIRS | Space Drone Incident Reporting System
      </a>
    </footer>
  );
}
