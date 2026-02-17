import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate } from '../store/taskSlice';
import './DatePicker.css';

const DatePicker = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.tasks.selectedDate);
  const tasks = useSelector((state) => state.tasks.tasks);
  
  const today = new Date();
  const [year, month, day] = selectedDate.split('-').map(Number);
  const currentDate = new Date(year, month - 1, day);
  
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const handlePrevMonth = () => {
    const newDate = new Date(year, month - 2, 1);
    const formattedDate = newDate.toISOString().split('T')[0];
    dispatch(setSelectedDate(formattedDate));
  };
  
  const handleNextMonth = () => {
    const newDate = new Date(year, month, 1);
    const formattedDate = newDate.toISOString().split('T')[0];
    dispatch(setSelectedDate(formattedDate));
  };
  
  const handleDateClick = (day) => {
    const newDate = new Date(year, month - 1, day);
    const formattedDate = newDate.toISOString().split('T')[0];
    dispatch(setSelectedDate(formattedDate));
  };
  
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() + 1 &&
      year === today.getFullYear()
    );
  };
  
  const isSelected = (day) => {
    return day === currentDate.getDate();
  };
  
  const hasTasks = (day) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks[dateStr] && tasks[dateStr].length > 0;
  };
  
  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''} ${hasTasks(day) ? 'has-tasks' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasTasks(day) && <span className="task-indicator"></span>}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="date-picker">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="month-year">{monthNames[month - 1]} {year}</h2>
        <button onClick={handleNextMonth} className="nav-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="calendar-weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>
      
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default DatePicker;
