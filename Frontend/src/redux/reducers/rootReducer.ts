import { combineReducers } from 'redux';
import { QuestionsState, questionsReducer } from './reducer';

export interface AppState {
  readonly questions: QuestionsState;
}

export const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});
