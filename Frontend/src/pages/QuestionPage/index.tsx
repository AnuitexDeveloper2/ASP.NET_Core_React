import React, { useState, useEffect, Fragment } from 'react';
import { Page } from '../../components/PageTitle';
import { RouteComponentProps } from 'react-router-dom';
import {
  QuestionData,
  getQuestion,
  postAnswer,
} from '../../components/QuestionList/QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray3, gray6 } from '../../Styles';
import { AnswerList } from '../../components/AmswerList';
import { Field } from '../../components/Field/Field';
import { Form, Values } from '../../components/Form/Form';
import { required, minLength } from '../../shared/validator';

interface RouteParams {
  questionId: string;
}

export const QuestionPage: React.FC<RouteComponentProps<RouteParams>> = ({
  location,
}) => {
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') || '';
  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    if (location.search) {
      const questionId = Number(id);
      doGetQuestion(questionId);
    }
  }, [id, location.search]);

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { success: result ? true : false };
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
                font-size: 16px;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on
                ${question.created.toLocaleDateString()}
                ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <div
              css={css`
                margin-top: 20px;
              `}
            >
              <Form
                onSubmit={handleSubmit}
                failureMessage="There was a problem with your answer"
                successMessage="Your answer was successfully submitted"
                validationRules={{
                  content: [
                    { validator: required },
                    { validator: minLength, arg: 10 },
                  ],
                }}
                submitCaption="Submit Your Answer"
              >
                <Field name="content" label="Your Answer" type="TextArea" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
