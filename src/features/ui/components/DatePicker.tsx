import { DatesProvider, DatePickerInput, type DatePickerValue } from "@mantine/dates";
import {useRef,type ComponentPropsWithoutRef } from "react";
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import "dayjs/locale/th";
dayjs.extend(buddhistEra)
dayjs.locale("th");

export interface DatePickerProps  {
  label:string;
  error?: string;
  minDate?:Date;
  maxDate?:Date;
  value:Date | null;
  onChange: (value: Date | null) => void; 
}

const DatePicker = ({label,error,minDate,maxDate,value,onChange,...props}:DatePickerProps) => {

  const ref = useRef<HTMLButtonElement>(null);
  const IconCalendar = <CalendarDays className="w-5 h-5"></CalendarDays>;

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
        onChange={onChange}
        {...props}
      />
    </DatesProvider>
  );
};

export default DatePicker;