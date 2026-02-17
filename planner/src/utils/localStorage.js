// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('dailyPlannerState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('dailyPlannerState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};
