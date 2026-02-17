import React from 'react';
import { connect } from 'react-redux';
import { setSelectedDate } from '../actions';

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="date-picker-container">
      <label htmlFor="date-picker">Select Date: </label>
      <input 
        id="date-picker"
        type="date" 
        value={selectedDate} 
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.selectedDate
});

const mapDispatchToProps = { setSelectedDate };

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
