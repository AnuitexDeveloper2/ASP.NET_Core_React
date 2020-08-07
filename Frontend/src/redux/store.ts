import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, AppState } from './reducers/rootReducer';

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
