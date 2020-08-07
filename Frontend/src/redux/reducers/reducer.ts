import { QuestionData } from '../../components/QuestionList/QuestionsData';
import { Reducer } from 'redux';
import { QuestionsActions } from '../actions/types';

export interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[] | null;
  readonly postedResult?: QuestionData;
}

const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: null,
};

const neverReached = (never: never) => {};

export const questionsReducer: Reducer<QuestionsState, QuestionsActions> = (
  state = initialQuestionState,
  action,
) => {
  switch (action.type) {
    case 'GettingUnansweredQuestions': {
      return {
        ...state,
        unanswered: null,
        loading: true,
      };
    }
    case 'GotUnansweredQuestions': {
      return {
        ...state,
        unanswered: action.questions,
        loading: false,
      };
    }
    case 'PostedQuestion': {
      return {
        ...state,
        unanswered: action.result
          ? (state.unanswered || []).concat(action.result)
          : state.unanswered,
        postedResult: action.result,
      };
    }
    case 'SearchQuestions': {
      return {
        ...state,
        unanswered: action.result,
      };
    }
    case 'GetQuestion': {
      return {
        ...state,
        postedResult: action.question,
      };
    }
    default:
      neverReached(action);
  }
  return state;
};
