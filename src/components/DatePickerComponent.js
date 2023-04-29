// import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const DatePickerComponent = ({ selectedDate, setSelectedDate, focused }) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(selectedDate);

  return (
    <>
      <DatePicker
        label={"Select Date"}
        value={selectedDate}
        onChange={handleDateChange}
        format="MM/dd/yyyy"
        eq53
        disableFuture={true}
        maxDate={new Date()}
        inputFormat="MM/dd/yyyy"
        timeZone="Asia/Manila"
        autoFocus={focused}
      />
    </>
  );
};

export default DatePickerComponent;
