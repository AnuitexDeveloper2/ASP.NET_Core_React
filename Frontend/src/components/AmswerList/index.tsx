import React, { Dispatch, SetStateAction } from 'react';
import { AnswerData } from '../QuestionList/QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray5 } from '../../Styles';
import { Answer } from './Answer';
interface Props {
  data: AnswerData[] | null;
  answerEditModal: Dispatch<SetStateAction<boolean>>;
  setAnswerEditText: Dispatch<SetStateAction<string>>;
  setEditAnswerId: Dispatch<SetStateAction<number>>;
}

export const AnswerList: React.FC<Props> = ({
  data,
  answerEditModal,
  setAnswerEditText,
  setEditAnswerId,
}) => {
  if (data === null) {
    return <div></div>;
  }
  return (
    <ul
      css={css`
        list-style: none;
        margin: 10px 0 0 0;
        padding: 0;
      `}
    >
      {data.map((answer) => (
        <li
          css={css`
            border-top: 1px solid ${gray5};
          `}
          key={answer.answerId}
        >
          <Answer
            data={answer}
            answerEditModal={answerEditModal}
            answerEditText={setAnswerEditText}
            setEditAnswerId={setEditAnswerId}
          />
        </li>
      ))}
    </ul>
  );
};
