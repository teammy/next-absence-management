import { ThaiDatePicker } from "thaidatepicker-react";
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");


import React,{ useState } from "react";
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";




const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

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
        inputProps={{
          displayFormat: "D MMM YYYY",
          className:
            "max-w-xs text-[#05060f] p-2 border border-[#cfcfcf] rounded",
        }}
        onChange={handleDatePickerChange}
      />
    </div>
    </>
  );
}
