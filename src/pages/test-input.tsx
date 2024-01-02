import DatePicker from "~/features/ui/components/DatePicker"
import { useEffect,useState } from "react"
import { convertDateToFormatNormal } from "~/features/shared/helpers/date";
import { type DateValue } from "@mantine/dates";

export default function TestInput () {

  const [startDate,setStartDate] = useState<DateValue>(null);
  const [endDate,setEndDate] = useState<DateValue>(null);
  const [daysDifference, setDaysDifference] = useState(0);

  const calculateDaysDifference = (startDate:any,endDate:any) => {
    if(!startDate || !endDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    return diffDays;
  }

  useEffect(() => {
    setDaysDifference(calculateDaysDifference(startDate,endDate));
    console.log('dateSelect',convertDateToFormatNormal(startDate))
  }, [startDate,endDate])

  return (
    <>
  <div>
    <h2>ทดสอบ Dateppicker</h2>

    <DatePicker 
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
    />
    <p>รวมเวลาทั้งหมด {daysDifference}</p>

  </div>
    </>
  )
}