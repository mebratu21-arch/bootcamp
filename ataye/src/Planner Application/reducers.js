import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK, SET_SELECTED_DATE } from './actions';

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const initialState = {
  selectedDate: getTodayDate(),
  tasks: {}
};

const plannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_DATE: {
      return {
        ...state,
        selectedDate: action.payload.date
      };
    }

    case ADD_TASK: {
      const { date, text, id } = action.payload;
      const existingTasks = state.tasks[date] || [];
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: [
            ...existingTasks,
            { id, text, completed: false }
          ]
        }
      };
    }

    case EDIT_TASK: {
      const { date, id, text } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: state.tasks[date].map(task =>
            task.id === id ? { ...task, text } : task
          )
        }
      };
    }

    case DELETE_TASK: {
      const { date, id } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: state.tasks[date].filter(task => task.id !== id)
        }
      };
    }

    case TOGGLE_TASK: {
      const { date, id } = action.payload;
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [date]: state.tasks[date].map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        }
      };
    }

    default:
      return state;
  }
};

export default plannerReducer;
