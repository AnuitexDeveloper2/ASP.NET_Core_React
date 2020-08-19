import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
interface Props {
  editContent: string;
  deleteContent: string;
  openEditModal: () => void;
  remove: () => void;
}

export const EditDeleteButtons: React.FC<Props> = ({
  editContent,
  deleteContent,
  openEditModal,
  remove,
}) => {
  return (
    <div>
      <button
        onClick={openEditModal}
        css={css`
          background-color: rgb(240, 193, 149);
          border-color: rgb(240, 146, 59);
          border-radius: 5px;
          border-style: solid;
          color: white;
          color: white;
          cursor: pointer;
          :hover {
            background-color: rgb(240, 146, 59);
          }
        `}
      >
        {editContent}
      </button>{' '}
      <button
        onClick={remove}
        css={css`
          background-color: rgb(231, 178, 178);
          border-color: red;
          border-radius: 5px;
          border-style: solid;
          color: white;
          color: white;
          cursor: pointer;
          :hover {
            background-color: rgb(240, 92, 92);
          }
        `}
      >
        {deleteContent}
      </button>
    </div>
  );
};
