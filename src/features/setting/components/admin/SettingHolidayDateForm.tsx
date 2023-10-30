import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize, set } from 'lodash';
import { ThaiDatePicker } from 'thaidatepicker-react';
import { Input, Button ,Select , SelectItem,SelectSection } from '@nextui-org/react';
import {
  type AddSettingHolidayInput,
  type UpdateSettingHolidayInput,
  type HolidayDateDetails,
} from '../../types';
import * as validators from '../../helpers/validators';
import { useState,useEffect } from 'react';
import dayjs from 'dayjs';
import "dayjs/locale/th"
dayjs.locale('th')

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
          inputProps={{
            displayFormat: 'D MMM YYYY',
            className: "border w-full rounded-md border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }}
        />
      </div>
      <div>
        <Input
          id="holidayName"

          errorMessage={errors.holidayName?.message}
          {...register('holidayName')}
        />
      </div>
      <div>
        <Select 
        label="ประเภทวันหยุด" 
        {...register('holidayType')}
        errorMessage={errors.holidayType?.message}
        >
          <SelectItem value="วันหยุดราชการ" key="วันหยุดราชการ">วันหยุดราชการ</SelectItem>
          <SelectItem value="วันหยุดชดเชย" key="วันหยุดชดเชย">วันหยุดชดเชย</SelectItem>
        </Select>
        {/* <Input
          id="holidayType"
          placeholder='Type Leave'
          {...register('holidayType')}
        /> */}
      </div>
      <Button type="submit" color="primary" isDisabled={!isValid}>
        {capitalize(kind)}
      </Button>
    </form>
  );
};

export default SettingHolidayDateForm;
