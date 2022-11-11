import { css } from '@emotion/react';
import Image from 'next/image';

const footerStyles = css`
  padding: 15px 20px;
  border-top: 2px solid #ddd;
  background-color: #f2f5fc;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <a>
        <Image
          src={`/images/favicon2.ico`}
          alt="drone flying in outer space"
          width="20"
          height="20"
        />
        &nbsp;Space Drone Incident Reporting System
      </a>
    </footer>
  );
}
