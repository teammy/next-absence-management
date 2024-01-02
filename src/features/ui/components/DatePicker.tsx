import { DatesProvider, DatePickerInput,type DateValue } from "@mantine/dates";
import {useRef } from "react";
import dayjs from 'dayjs'
import { CalendarDaysIcon } from 'lucide-react'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import "dayjs/locale/th";
dayjs.extend(buddhistEra)
dayjs.locale("th");


export interface DatePickerProps  {
  label:string;
  error?: string;
  minDate?:Date;
  maxDate?:Date;
  value:DateValue;
  onChange: (value: DateValue) => void; 
}

const DatePicker = ({label,error,minDate,maxDate,value,onChange}:DatePickerProps) => {

  const ref = useRef<HTMLButtonElement>(null);
  const IconCalendar = <CalendarDaysIcon className="w-5 h-5"></CalendarDaysIcon>;

  return (
    <DatesProvider
      settings={{
        locale: "th",
        firstDayOfWeek: 0,
        timezone:"Asia/Bangkok"
      }}
    >
      <DatePickerInput
        ref={ref}
        label={label}
        yearsListFormat="BBBB"
        leftSection={IconCalendar}
        clearable
        minDate={minDate}
        maxDate={maxDate}
        hideOutsideDates
        yearLabelFormat="BBBB"
        decadeLabelFormat="BBBB"
        monthLabelFormat="MMMM BBBB"
        valueFormat="D MMM BBBB"
        error={error}
        value={value}
        classNames={{
          calendarHeader:'Ekachon_Normal',
          monthThead: 'Ekachon_Normal',
          error:'Ekachon_Light',
          input:'Ekachon_Light',
          monthTbody:'Ekachon_Light',
          monthsList: 'Ekachon_Normal',
        }}
        onChange={onChange}
      />
    </DatesProvider>
  );
};

export default DatePicker;