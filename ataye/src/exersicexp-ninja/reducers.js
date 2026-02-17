import { combineReducers } from 'redux';
import { 
  REGISTER_USER, 
  LOGIN_USER, 
  LOGOUT_USER,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  EDIT_TODO
} from './actions';

// Auth Reducer
const authInitialState = {
  isAuthenticated: false,
  currentUser: null,
  users: {}, // Mock user database: { username: { password, ... } }
  error: null
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      const { username, password } = action.payload;
      
      // Check if user already exists
      if (state.users[username]) {
        return {
          ...state,
          error: 'Username already exists'
        };
      }
      
      // Register new user
      return {
        ...state,
        users: {
          ...state.users,
          [username]: { password }
        },
        error: null
      };
    }

    case LOGIN_USER: {
      const { username, password } = action.payload;
      const user = state.users[username];
      
      // Validate credentials
      if (!user || user.password !== password) {
        return {
          ...state,
          error: 'Invalid username or password'
        };
      }
      
      // Login successful
      return {
        ...state,
        isAuthenticated: true,
        currentUser: username,
        error: null
      };
    }

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        error: null
      };

    default:
      return state;
  }
};

// Todos Reducer
const todosInitialState = {};

const todosReducer = (state = todosInitialState, action) => {
  // Get current user from action meta or return state if no user
  const currentUser = action.meta?.currentUser;
  if (!currentUser && action.type !== REGISTER_USER) return state;

  switch (action.type) {
    case REGISTER_USER: {
      const { username } = action.payload;
      return {
        ...state,
        [username]: []
      };
    }

    case ADD_TODO: {
      const userTodos = state[currentUser] || [];
      return {
        ...state,
        [currentUser]: [
          ...userTodos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false
          }
        ]
      };
    }

    case TOGGLE_TODO: {
      return {
        ...state,
        [currentUser]: state[currentUser].map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    }

    case DELETE_TODO: {
      return {
        ...state,
        [currentUser]: state[currentUser].filter(
          todo => todo.id !== action.payload.id
        )
      };
    }

    case EDIT_TODO: {
      return {
        ...state,
        [currentUser]: state[currentUser].map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };
    }

    default:
      return state;
  }
};

// Combined Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer
});

export default rootReducer;
