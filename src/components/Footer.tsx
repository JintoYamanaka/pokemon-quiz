/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const footerStyle = css`
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: auto; // フッターを画面の下部に固定するため
`;

const Footer = () => (
  <footer css={footerStyle}>
    <p>&copy; {new Date().getFullYear()} ポケモンクイズ</p>
    {/* 他のフッターコンテンツをここに追加 */}
  </footer>
);

export default Footer;
