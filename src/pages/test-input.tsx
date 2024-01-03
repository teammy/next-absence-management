import DatePicker from "~/features/ui/components/form/DatePicker";
import { useEffect,useState } from "react"
import { convertDateToFormatNormal } from "~/features/shared/helpers/date";
import { type DateValue } from "@mantine/dates";
import SelectItem from "~/features/ui/components/form/SelectItem";
import InputField from "~/features/ui/components/form/InputField";
import {type TextInputProps } from "@mantine/core";
import { api } from "~/utils/api";
import { Select,ComboboxItem } from "@mantine/core";



export default function TestInput () {

  const [startDate,setStartDate] = useState<DateValue>(null);
  const [endDate,setEndDate] = useState<DateValue>(null);
  const [daysDifference, setDaysDifference] = useState(0);
  const [testInput, setTestInput] = useState("");

  const { data:listType } = api.typeleave.list.useQuery();




  const [selectTypeLeave, setSelectTypeLeave] = useState<string | null>('');



  const calculateDaysDifference = (startDate:any,endDate:any) => {
    if(!startDate || !endDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    return diffDays;
  }

  useEffect(() => {
    console.log(selectTypeLeave);
  }, [listType,selectTypeLeave]);

  return (
    <>
  <div>

    {/* <DatePicker 
    value={startDate}
    // date={value}
    onChange={setStartDate}
    label="เริ่มต้น"
    maxDate={endDate ?? undefined}
    >
    </DatePicker>
    <hr/>
    <DatePicker
    label="สิ้นสุด"
    value={endDate}
    onChange={setEndDate}
    minDate={startDate ?? undefined}
    /> */}
    {/* <p>รวมเวลาทั้งหมด {daysDifference}</p> */}

    <Select
      label="Your favorite library"
      placeholder="เลือกประเภทการลา"
      data={listType?.map((item) => ({
        value: item.id.toString(),
        label: item.leaveTypeDescription,
      }))}
      value={selectTypeLeave}
      onChange={setSelectTypeLeave}
      clearable
    />

    {/* <InputField
    label="ทดสอบ Input"
    value={testInput}
    onChange={(e) => setTestInput(e.currentTarget.value)}
    >
    
    </InputField> */}

  </div>
    </>
  )
}