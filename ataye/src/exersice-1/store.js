import { legacy_createStore as createStore } from 'redux';
import todoReducer from './reducers';

// Using legacy_createStore as requested for "basic" redux exercise
const store = createStore(todoReducer);

export default store;
