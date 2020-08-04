import React from 'react';
import user from '../../../src/assets/zondicons/user.svg';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const UserIcon: React.FC = () => (
  <img
    src={user}
    alt="User"
    css={css`
      width: 12px;
      opacity: 0.6;
    `}
  />
);
