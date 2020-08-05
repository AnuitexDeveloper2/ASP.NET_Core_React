/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton } from '../../Styles';
import { QuestionList } from '../../components/QuestionList/Index';
import {
  getUnansweredQuestions,
  QuestionData,
} from '../../components/QuestionList/QuestionsData';
import { Page } from '../../components/PageTitle';
import { useEffect, useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle/PageTitle';

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };
    doGetUnansweredQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };

  return (
    <Page>
      <div
        css={css`
          margin: 50px auto 20px auto;
          padding: 30px 20px;
          max-width: 600px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              font-size: 15px;
              font-weight: bold;
              margin: 10px 0px 5px;
              text-align: center;
              text-transform: uppercase;
            `}
          >
            <div
              css={css`
                font-size: 15px;
                font-weight: bold;
                margin: 10px 0px 5px;
                text-align: center;
                text-transform: uppercase;
              `}
            >
              <PageTitle> Unanswered Questions </PageTitle>
            </div>
          </div>
          <PrimaryButton onClick={handleAskQuestionClick}>
            {' '}
            Ask a question{' '}
          </PrimaryButton>
        </div>
        {questionsLoading ? (
          <div
            css={css`
              font-size: 16px;
              font-style: italic;
            `}
          >
            Loading...
          </div>
        ) : (
          <QuestionList data={questions || []} />
        )}
      </div>
    </Page>
  );
};
