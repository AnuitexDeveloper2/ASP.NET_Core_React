import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SearchQuestionsAction, PostedQuestionAction } from './types';
import {
  searchQuestions,
  PostQuestionData,
} from '../../components/QuestionList/QuestionsData';

export const searchQuestionsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  PostQuestionData,
  null,
  PostedQuestionAction
>> = (criteria: string) => {
  return async (dispatch: Dispatch) => {
    const result = await searchQuestions(criteria);
    const searchQuestionsAction: SearchQuestionsAction = {
      type: 'SearchQuestions',
      result,
    };
    dispatch(searchQuestionsAction);
  };
};
