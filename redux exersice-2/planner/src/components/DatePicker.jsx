import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../features/planner/plannerSlice';

const DatePicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);

  const handleChange = (e) => {
    dispatch(setSelectedDate(e.target.value));
  };

  return (
    <div className="date-picker">
      <label htmlFor="planner-date">Select Date: </label>
      <input
        type="date"
        id="planner-date"
        value={selectedDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DatePicker;
