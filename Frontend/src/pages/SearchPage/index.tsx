import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from '../../components/PageTitle';
import { QuestionList } from '../../components/QuestionList/Index';
import { QuestionData } from '../../components/QuestionList/QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { searchQuestionsActionCreator } from '../../redux/actions/searchQuestions';

interface Props extends RouteComponentProps {
  searchQuestions: (criteria: string) => Promise<void>;
  questions: QuestionData[] | null;
}

const SearchPage: React.FC<Props> = ({
  location,
  searchQuestions,
  questions,
}) => {
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    searchQuestions(search);
  }, [search, searchQuestions]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          {' '}
          f or "{search}"
        </p>
      )}
      <QuestionList data={questions || []} isGrid={false} />
    </Page>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    questions: state.questions.unanswered,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    searchQuestions: (criteria: string) =>
      dispatch(searchQuestionsActionCreator(criteria)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
