import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from '../../components/PageTitle';
import { QuestionList } from '../../components/QuestionList/Index';
import { searchQuestions, QuestionData } from '../../components/QuestionList/QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const SearchPage: React.FC<RouteComponentProps> = ({ location }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  debugger
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(foundResults);
    };
    doSearch(search);
  }, [search]);

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
      <QuestionList data={questions} />
    </Page>
  );
};
