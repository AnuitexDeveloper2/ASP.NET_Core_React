import {
  QuestionData,
  getUnansweredQuestions,
} from '../../components/QuestionList/QuestionsData';
import {
  GotUnansweredQuestionsAction,
  GettingUnansweredQuestionsAction,
} from './types';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const getUnansweredQuestionsActionCreator: ActionCreator<ThunkAction<
  Promise<void>,
  QuestionData[],
  null,
  GotUnansweredQuestionsAction
>> = () => {
  return async (dispatch: Dispatch) => {
    //  dispatch the GettingUnansweredQuestions action
    const gettingUnansweredQuestionsAction: GettingUnansweredQuestionsAction = {
      type: 'GettingUnansweredQuestions',
    };
    dispatch(gettingUnansweredQuestionsAction);
    //  get the questions from server
    const questions = await getUnansweredQuestions();
    //  dispatch the GotUnansweredQuestions action
    const gotUnansweredQuestionAction: GotUnansweredQuestionsAction = {
      questions,
      type: 'GotUnansweredQuestions',
    };
    dispatch(gotUnansweredQuestionAction);
  };
};
