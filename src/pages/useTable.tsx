import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import { ThaiDatePicker } from "thaidatepicker-react";


import React,{ useState } from "react";
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";



export default function UseTable() {
  const [selectedThaiDate, setSelectedThaiDate] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDatePickerChange = (christDate: any, buddhistDate: any) => {
    setSelectedDate(christDate);
    setSelectedThaiDate(buddhistDate);
  };

  
  return (
    <>
    
    <div>
    <ThaiDatePicker
        value={selectedDate}
        placeholder="เลือกวัน"
        // inputProps={{
        //   displayFormat: "D MMM YYYY",
        //   className:
        //     "max-w-xs text-[#05060f] p-2 border border-[#cfcfcf] rounded",
        // }}
        onChange={handleDatePickerChange}
      />
    </div>
    </>
  );
}
