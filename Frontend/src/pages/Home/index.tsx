/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { PrimaryButton } from '../../Styles';
import { QuestionList } from '../../components/QuestionList/Index';
import { QuestionData } from '../../components/QuestionList/QuestionsData';
import { useEffect, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUnansweredQuestionsActionCreator } from '../../redux/actions/getQuestions';
import { AppState } from '../../redux/reducers/rootReducer';
import { useAuth } from '../../components/Auth/Auth';

interface Props extends RouteComponentProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: QuestionData[] | null;
  questionsLoading: boolean;
}

const HomePage: FC<Props> = ({
  history,
  getUnansweredQuestions,
  questions,
  questionsLoading,
}) => {
  useEffect(() => {
    getUnansweredQuestions();
  }, [getUnansweredQuestions]);

  const { isAuthenticated } = useAuth();
  const handleAskQuestionClick = () => {
    history.push('/ask');
  };
  return (
    <div
      css={css`
        margin: 50px auto 20px auto;
        padding: 30px 20px;
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
        {isAuthenticated && (
          <PrimaryButton onClick={handleAskQuestionClick}>
            {' '}
            Ask a question{' '}
          </PrimaryButton>
        )}
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
        <QuestionList data={questions || []} isGrid={true} />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    questions: state.questions.unanswered,
    Loading: state.questions.loading,
  };
};

const mapDispatchToProps = () => (
  dispatch: ThunkDispatch<any, any, AnyAction>,
) => {
  return {
    getUnansweredQuestions: () =>
      dispatch(getUnansweredQuestionsActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
