import { QuestionData } from '../../components/QuestionList/QuestionsData';
import { Action } from 'redux';

export interface GettingUnansweredQuestionsAction
  extends Action<'GettingUnansweredQuestions'> {}

export interface GotUnansweredQuestionsAction
  extends Action<'GotUnansweredQuestions'> {
  questions: QuestionData[];
}

export interface PostedQuestionAction extends Action<'PostedQuestion'> {
  result: QuestionData | undefined;
}

export interface SearchQuestionsAction extends Action<'SearchQuestions'> {
  result: QuestionData[] | null;
}

export interface GetQuestionAction extends Action<'GetQuestion'> {
  question: QuestionData | undefined;
}

export type QuestionsActions =
  | GettingUnansweredQuestionsAction
  | GotUnansweredQuestionsAction
  | PostedQuestionAction
  | SearchQuestionsAction
  | GetQuestionAction;
