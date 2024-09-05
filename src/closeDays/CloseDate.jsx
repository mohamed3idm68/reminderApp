import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ClosedDatePicker = () => {
  const [closedDays, setClosedDays] = useState([new Date(2024, 7, 15), new Date(2024, 7, 20)]); // Example closed days

  const isDayDisabled = (date) => {
    return closedDays.some((closedDay) => {
      return date.toDateString() === closedDay.toDateString();
    });
  };

  const renderDatePicker = () => {
    return (
      <DatePicker
        selected={new Date()}
        onChange={(date) => console.log(date)}
        filterDate={isDayDisabled}
        placeholderText="Select a date"
        inline
      />
    );
  };

  return <div>{renderDatePicker()}</div>;
};

export default ClosedDatePicker;