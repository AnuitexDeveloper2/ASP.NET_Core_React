import React, { ChangeEvent, useState } from 'react';
import { UserIcon } from '../images/user';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray1, fontFamily, fontSize, gray5, gray2 } from '../../Styles';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Form } from '../Form/Form';

const Header: React.FC<RouteComponentProps> = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);
  const criteria = searchParams.get('criteria') || '';
  const [search, setSearch] = useState(criteria);
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        background-color: #fff;
        border-bottom: 1px solid ${gray5};
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
      `}
    >
      <Link
        to="./"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        Q & A
      </Link>
      <form action="">
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={handleSearchInputChange}
          css={css`
            box-sizing: border-box;
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 8px 10px;
            border: 1px solid ${gray5};
            border-radius: 3px;
            color: ${gray2};
            background-color: white;
            width: 200px;
            height: 30px;
            :focus {
              outline-color: ${gray5};
            }
          `}
        />
      </form>
      <Link
        to="./signin"
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          padding: 5px 10px;
          background-color: transparent;
          color: ${gray2};
          text-decoration: none;
          cursor: pointer;
          span {
            margin-left: 10px;
          }
          :focus {
            outline-color: ${gray5};
          }
        `}
      >
        <span>
          <UserIcon />
        </span>
        <span>Sign In</span>
      </Link>
    </div>
  );
};
export const HeaderWithRouter = withRouter(Header);
