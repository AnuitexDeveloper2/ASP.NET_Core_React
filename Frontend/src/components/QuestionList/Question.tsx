import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionData } from './QuestionsData';
import { gray3, gray2 } from '../../Styles';
import { Link } from 'react-router-dom';

interface Props {
  data: QuestionData;
  showContent?: boolean;
}

export const Question: React.FC<Props> = ({ data, showContent = true }) => {
  const dateCreated = new Date(data.created).toLocaleDateString();
  const timeCreated = new Date(data.created).toLocaleTimeString();
  return (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 19px;
        `}
      >
        <Link
          css={css`
            text-decoration: none;
            color: ${gray2};
          `}
          to={`questions?id=${data.questionId}`}
        >
          {data.title}
        </Link>
      </div>
      <div
        css={css`
          padding-bottom: 10px;
          font-size: 15px;
          color: ${gray2};
        `}
      >
        {showContent && (
          <div>
            {' '}
            {data.content.length > 50
              ? `${data.content.substring(0, 50)}...`
              : data.content}
          </div>
        )}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-style: italic;
          color: ${gray3};
        `}
      >
        {`Asked by ${data.userName} on
    ${dateCreated} ${timeCreated}`}
      </div>
    </div>
  );
};
