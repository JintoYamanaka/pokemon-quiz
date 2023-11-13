/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const headerStyle = css`
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Header = () => (
  <header css={headerStyle}>
    <h1>ポケモンクイズ</h1>
    {/* 他のヘッダーコンテンツをここに追加 */}
  </header>
);

export default Header;
