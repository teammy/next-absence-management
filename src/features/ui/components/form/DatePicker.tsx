import { DatesProvider,DateInput,DateInputProps } from "@mantine/dates";
import {forwardRef } from "react";
import { convertDateToFormatNormal } from "~/features/shared/helpers/date";
import dayjs from 'dayjs'
import { CalendarDaysIcon } from 'lucide-react'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import "dayjs/locale/th";
dayjs.extend(buddhistEra)
dayjs.locale("th");


interface ThaiDatePickerProps extends Omit<DateInputProps, 'value' | 'onChange'> {
  label:string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

const MantineDatePicker = forwardRef<HTMLInputElement,ThaiDatePickerProps>(
  ({id,label,error,value,onChange,...props},ref) => {
  const IconCalendar = <CalendarDaysIcon className="w-5 h-5"></CalendarDaysIcon>;

  return (
    <DatesProvider
      settings={{
        locale: "th",
        firstDayOfWeek: 0,
        timezone:"Asia/Bangkok"
      }}
    >
      <DateInput
        id={id}
        ref={ref}
        label={label}
        yearsListFormat="BBBB"
        leftSection={IconCalendar}
        // onChange={it =>onChange(it)}
        // value={}
        clearable
        hideOutsideDates
        yearLabelFormat="BBBB"
        decadeLabelFormat="BBBB"
        monthLabelFormat="MMMM BBBB"
        valueFormat="D MMM BBBB"
        error={error}
        classNames={{
          calendarHeader:'Ekachon_Normal',
          monthThead: 'Ekachon_Normal',
          error:'Ekachon_Light',
          input:'Ekachon_Normal txt_blueDark',
          monthTbody:'Ekachon_Light',
          monthsList: 'Ekachon_Normal',
          label:'txt_gray'
        }}
        {...props}
      />
    </DatesProvider>
  );
  }
);

export default MantineDatePicker;
