import React,{ useState } from 'react'
import { ThaiDatePicker } from "thaidatepicker-react";
import dayjs from 'dayjs';
import 'dayjs/locale/th';
dayjs.locale('th');
console.log(dayjs('').format('DD MMM YYYY'));

type Props = {}

export default function DemoDayJs({}: Props) {

  const [selectedDate, setSelectedDate] = useState("2024-02-29");
  const [selectedThaiDate, setSelectedThaiDate] = useState("2567-02-29");

  const handleDatePickerChange = (christDate, buddhistDate) => {
    console.log(christDate);
    console.log(buddhistDate);
    setSelectedDate(christDate);
    setSelectedThaiDate(buddhistDate);
  };


  return (
    <div>
       <ThaiDatePicker
        value={selectedDate}
        onChange={handleDatePickerChange}
        placeholder="เลือกวันที่"
        inputProps={{
          displayFormat: "D MMM YYYY",
          className: "border w-full rounded-md border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        }}
      />
      <div>christDate: {selectedDate}</div>
      <div>thaiDate: {selectedThaiDate}</div>
    </div>
  )
}