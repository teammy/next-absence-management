import { DatesProvider,DateInput } from "@mantine/dates";
import type { DatePickerInputProps,DateValue,DatesRangeValue,DatePickerValue,DateInputProps  } from "@mantine/dates";
import {useRef,forwardRef } from "react";
import dayjs from 'dayjs'
import { CalendarDaysIcon } from 'lucide-react'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import "dayjs/locale/th";
dayjs.extend(buddhistEra)
dayjs.locale("th");


interface ThaiDatePickerProps extends DateInputProps  {
  label:string;
  error?: string;
  // minDate?:Date;
  // maxDate?:Date;
}

const MantineDatePicker = forwardRef<HTMLInputElement,ThaiDatePickerProps>(
  ({id,label,error,...props},ref) => {
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
          input:'Ekachon_Light',
          monthTbody:'Ekachon_Light',
          monthsList: 'Ekachon_Normal',
        }}
        {...props}
      />
    </DatesProvider>
  );
  }
);

export default MantineDatePicker;

// import { useForm,useController  } from "react-hook-form";


// type Props = {}

// function DatePickerInput(props: DateInputProps) {
//   const { label,name,...rest } = props;
//   const IconCalendar = <CalendarDaysIcon className="w-5 h-5"></CalendarDaysIcon>;
//   const {
//     field,
//     formState: { errors:fieldError },
//   } = useController({name});

//   const error = fieldError ? (
//     <ErrorMessage>{fieldError.message}</ErrorMessage>
//   ) : undefined;

//   return 
//   <DatesProvider
//         settings={{
//           locale: "th",
//           firstDayOfWeek: 0,
//           timezone:"Asia/Bangkok"
//         }}
//       >
//         <DateInput
//           id={name}
//           label={label}
//           yearsListFormat="BBBB"
//           leftSection={IconCalendar}
//           clearable
//           hideOutsideDates
//           yearLabelFormat="BBBB"
//           decadeLabelFormat="BBBB"
//           monthLabelFormat="MMMM BBBB"
//           valueFormat="D MMM BBBB"
//           error={error}
//           classNames={{
//             calendarHeader:'Ekachon_Normal',
//             monthThead: 'Ekachon_Normal',
//             error:'Ekachon_Light',
//             input:'Ekachon_Light',
//             monthTbody:'Ekachon_Light',
//             monthsList: 'Ekachon_Normal',
//           }}
//           {...rest}
//         />
//       </DatesProvider>
// }

// export default DatePickerInput;