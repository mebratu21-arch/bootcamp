import { legacy_createStore as createStore } from 'redux';
import todoReducer from './reducers';

// Using legacy_createStore as requested
const store = createStore(todoReducer);

export default store;
