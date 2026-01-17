import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, ADD_CATEGORY, REMOVE_CATEGORY } from './actions';

const initialState = {
  "Work": [],
  "Personal": []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { category, text, id } = action.payload; // Removed unused 'completed'
      if (!state[category]) return state; // Safety check
      return {
        ...state,
        [category]: [
          ...state[category],
          { id, text, completed: false }
        ]
      };
    }
      
    case REMOVE_TODO:
      return {
        ...state,
        [action.payload.category]: state[action.payload.category].filter(
          todo => todo.id !== action.payload.id
        )
      };

    case TOGGLE_TODO:
      return {
        ...state,
        [action.payload.category]: state[action.payload.category].map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case ADD_CATEGORY:
      if (state[action.payload.category]) return state; // Prevent duplicates
      return {
        ...state,
        [action.payload.category]: []
      };

    case REMOVE_CATEGORY: {
      const newState = { ...state };
      delete newState[action.payload.category];
      return newState;
    }

    default:
      return state;
  }
};

export default todoReducer;
