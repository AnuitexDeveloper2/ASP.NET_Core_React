import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  PostQuestionData,
  getQuestion,
} from '../../components/QuestionList/QuestionsData';
import { GetQuestionAction } from './types';

export const getQuestionActionCretaor: ActionCreator<ThunkAction<
  Promise<void>,
  PostQuestionData,
  null,
  GetQuestionAction
>> = (questionId: string) => {
  return async (dispatch: Dispatch) => {
    const question = await getQuestion(questionId);
    const getQuestionAction: GetQuestionAction = {
      type: 'GetQuestion',
      question: question || undefined,
    };
    dispatch(getQuestionAction);
  };
};
