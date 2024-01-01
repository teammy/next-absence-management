import DatePicker from "~/features/ui/components/DatePicker"
import { useEffect,useState } from "react"
import { convertDateToFormatNormal } from "~/features/shared/helpers/date";

export default function TestInput () {

  const [value,setValue] = useState<Date | null>(null);

  useEffect(() => {
    console.log('dateSelect',convertDateToFormatNormal(value))
  }, [value])

  return (
    <>
  <div>
    <h2>ทดสอบ Dateppicker</h2>
    <DatePicker 
    value={value}
    // date={value}
    onChange={setValue}
    label="ทดสอบ"
    >

    </DatePicker>
  </div>
    </>
  )
}