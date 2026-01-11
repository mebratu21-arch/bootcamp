import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers';

// Middleware to inject currentUser into action meta
const addUserMiddleware = store => next => action => {
  const state = store.getState();
  const currentUser = state.auth.currentUser;
  
  // Add currentUser to action meta for todo operations
  if (currentUser && ['ADD_TODO', 'TOGGLE_TODO', 'DELETE_TODO', 'EDIT_TODO'].includes(action.type)) {
    action.meta = { currentUser };
  }
  
  return next(action);
};

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Manually apply middleware by wrapping dispatch
const originalDispatch = store.dispatch;
store.dispatch = addUserMiddleware(store)(originalDispatch);

export default store;
