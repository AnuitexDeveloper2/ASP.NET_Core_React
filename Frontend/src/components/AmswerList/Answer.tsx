import React, { SetStateAction, Dispatch } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AnswerData, deleteAnswer } from '../QuestionList/QuestionsData';
import { gray3 } from '../../Styles';
import { EditDeleteButtons } from '../EditDeleteButton/EditDeleteButtons';
import { useAuth } from '../Auth/Auth';

interface Props {
  data: AnswerData;
  answerEditModal: Dispatch<SetStateAction<boolean>>;
  answerEditText: Dispatch<SetStateAction<string>>;
  setEditAnswerId: Dispatch<SetStateAction<number>>;
}

export const Answer: React.FC<Props> = ({
  data,
  answerEditModal,
  answerEditText,
  setEditAnswerId,
}) => {
  let isOwner = false;
  const { user } = useAuth();
  if (user?.sub === data.userId) {
    isOwner = true;
  }
  const removeAnswer = async () => {
    deleteAnswer(data.answerId);
  };

  const openEditModal = () => {
    setEditAnswerId(data.answerId);
    answerEditText(data.content);
    answerEditModal(true);
  };
  return (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 13px;
        `}
      >
        {data.content}
      </div>
      <div
        css={css`
          font-size: 12px;
          font-style: italic;
          color: ${gray3};
        `}
      >
        {`Answered by ${data.userName} on
    ${data.created.toLocaleDateString()}
    ${data.created.toLocaleTimeString()}`}
      </div>
      {isOwner && (
        <EditDeleteButtons
          editContent="Edit Answer"
          deleteContent="Delete Answer"
          remove={removeAnswer}
          openEditModal={openEditModal}
        />
      )}
    </div>
  );
};
