import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { QuestionData } from './QuestionsData';
import { accent2, gray5 } from '../../Styles';
import { Question } from './Question';

interface Props {
  data: QuestionData[];
  showContent?: boolean;
  renderItem?: (item: QuestionData) => JSX.Element;
  isGrid: boolean;
}

export const QuestionList: React.FC<Props> = ({ data, renderItem, isGrid }) => {
  console.log('Rendering QuestionList', data, renderItem);
  return (
    <ul
      css={
        isGrid
          ? css`
              list-style: none;
              margin: 10px 0 0 0;
              padding: 0px 20px;
              background-color: #fff;
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 4px;
              border-top: 3px solid ${accent2};
              box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);

              @media screen and (min-width: 768px) {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
              }

              @media screen and (min-width: 1200px) {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
              }
            `
          : css`
              list-style: none;
              margin: 10px 0 0 0;
              padding: 0px 20px;
              background-color: #fff;
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 4px;
              border-top: 3px solid ${accent2};
              box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
            `
      }
    >
      {data.map((question) => (
        <li
          key={question.questionId}
          css={css`
            border: 1px solid ${gray5};
            :first-of-type {
              border-top: none;
            }
          `}
        >
          {renderItem ? renderItem(question) : <Question data={question} />}
        </li>
      ))}
    </ul>
  );
};
