import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize, set } from 'lodash';
import { ThaiDatePicker } from 'thaidatepicker-react';
import { Input, Textarea, Button } from '@nextui-org/react';
import {
  type AddSettingHolidayInput,
  type UpdateSettingHolidayInput,
  type HolidayDateDetails,
} from '../../types';
import * as validators from '../../helpers/validators';
import { useState,useEffect } from 'react';

export type SettingHolidayProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddSettingHolidayInput>;
    }
  | {
      kind: 'edit';
      settingHoliday: HolidayDateDetails;
      onSubmit: SubmitHandler<UpdateSettingHolidayInput['data']>;
    };

const SettingHolidayDateForm = (props: SettingHolidayProps) => {
  const { kind, onSubmit } = props;
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<
    typeof onSubmit extends SubmitHandler<AddSettingHolidayInput>
      ? AddSettingHolidayInput
      : UpdateSettingHolidayInput['data']
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.addSettingHoliday : validators.updateSettingHoliday,
    ),
    defaultValues: kind === 'edit' ? props.settingHoliday : undefined,
  });

  const calculateDiffDays = (startDate:any, endDate:any) => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const holidays = [
      new Date("2023-10-02"), // public holiday
      new Date("2023-10-03"), // public holiday
      new Date("2023-10-01"), // custom holiday
    ];
    let diffDays = 0;
    for (let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // exclude weekends
        const isHoliday = holidays.some(holiday => holiday.toDateString() === date.toDateString());
        if (!isHoliday) {
          diffDays++;
        }
      }
    }

    return diffDays;
  };


  // const [totalLeaveDate , setTotalLeaveDate] = useState('');

  // // const currentStartLeaveDate = getValues("startLeaveDate");
  const currentEndLeaveDate = getValues("holidayDate");

  // useEffect(() => {
  //   setTotalLeaveDate(calculateDiffDays(currentStartLeaveDate, currentEndLeaveDate))
  //   setValue('totalLeaveDays', (calculateDiffDays(currentStartLeaveDate, currentEndLeaveDate)));
  // }, [currentStartLeaveDate, currentEndLeaveDate])

  // console.log("totalLeaveDays:", totalLeaveDate);
  

  // const startLeaveDate = new Date(getValues("startLeaveDate"));
  // const endLeaveDate = new Date(getValues("endLeaveDate"));
  // const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  // const holidays = [
  //   new Date("2023-10-02"), // public holiday
  //   new Date("2023-10-03"), // public holiday
  //   new Date("2023-10-01"), // custom holiday
  // ];
  // let diffDays = 0;
  // for (let date = startLeaveDate; date <= endLeaveDate; date.setDate(date.getDate() + 1)) {
  //   const dayOfWeek = date.getDay();
  //   if (dayOfWeek !== 0 && dayOfWeek !== 6) { // exclude weekends
  //     const isHoliday = holidays.some(holiday => holiday.toDateString() === date.toDateString());
  //     if (!isHoliday) {
  //       diffDays++;
  //     }
  //   }
  // }



  const handleSettingHolidayDatePickerChange = (christDate:any) => {
    console.log('christDate', christDate)
    setValue('holidayDate', christDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };


  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h1>{capitalize(kind)}</h1>
      <label>Leave Date</label>
      <div>
      <ThaiDatePicker
          id="holidayDate"
          yearBoundary={2}
          onChange={handleSettingHolidayDatePickerChange}
          value={currentEndLeaveDate}
        />
      </div>
      <div>
        <Input
          id="holidayName"
          // onChange={(e) => console.log(e.target.value)}
          {...register('holidayName')}
        />
      </div>
      <div>
        <Input
          id="holidayType"
          placeholder='Type Leave'
          {...register('holidayType')}
        />
      </div>
      <Button type="submit" color="primary" isDisabled={!isValid}>
        {capitalize(kind)}
      </Button>
    </form>
  );
};

export default SettingHolidayDateForm;
