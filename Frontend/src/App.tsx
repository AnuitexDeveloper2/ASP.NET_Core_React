import React from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/Home';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontSize, fontFamily, gray2 } from './Styles';

const App: React.FC = () => {
  return (
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
        text-align: center;
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
};

export default App;
