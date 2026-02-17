import { createStore } from 'redux';
import { reducer } from './reduce';

export const store = createStore(reducer);
    