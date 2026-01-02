// taskReducer.js
export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false
        }
      ];

    case "TOGGLE_TASK":
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case "REMOVE_TASK":
      return state.filter(task => task.id !== action.payload);

    default:
      return state;
  }
}
