import { Store, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, AppState } from './reducers/rootReducer';

export function configureStore(): Store<AppState> {
  const store = createStore(
    rootReducer,
    undefined,
    compose(
      applyMiddleware(thunk),
      (window as any).window.__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).window.__REDUX_DEVTOOLS_EXTENSION__()
      : null
    ),
  );
  return store;
}
