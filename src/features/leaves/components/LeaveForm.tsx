import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import Datepicker from 'react-tailwindcss-datepicker';
import { ThaiDatePicker } from 'thaidatepicker-react';
import { type DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import { Input, Textarea, Button } from '@nextui-org/react';
import {
  type AddLeaveInput,
  type LeaveDetails,
  type UpdateLeaveInput,
} from '../types';
import * as validators from '../helpers/validators';
import { useState } from 'react';

export type LeaveFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddLeaveInput>;
    }
  | {
      kind: 'edit';
      leave: LeaveDetails;
      onSubmit: SubmitHandler<UpdateLeaveInput['data']>;
    };

const LeaveForm = (props: LeaveFormProps) => {
  const { kind, onSubmit } = props;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<
    typeof onSubmit extends SubmitHandler<AddLeaveInput>
      ? AddLeaveInput
      : UpdateLeaveInput['data']
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.add : validators.updateForm,
    ),
    defaultValues: kind === 'edit' ? props.leave : undefined,
  });
  console.log("isValid", isValid);
  const [selectedThaiDate, setSelectedThaiDate] = useState('');

  const currentStartLeaveDate = getValues("startLeaveDate");
  const currentEndLeaveDate = getValues("endLeaveDate");

  // const currentLeaveDate = getValues('leaveDate');
  // const currentLeaveDateRange = {
  //   startDate: currentLeaveDate,
  //   endDate: currentLeaveDate,
  // };

  const handleValueChange = (value: DateValueType) => {
    if (value?.startDate) {
      setValue('leaveDate', new Date(value.startDate).toISOString(), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const handleDatePickerStartChange = (christDate, buddhistDate) => {
    setValue('startLeaveDate', christDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // console.log('StartDate:',christDate);
    // setSelectedStartDate(christDate);
    setSelectedThaiDate(buddhistDate);
  };

  const handleDatePickerEndChange = (christDate, buddhistDate) => {
    setValue('endLeaveDate', christDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };


  const calculateDays = () => {
    if (!(currentStartLeaveDate instanceof Date) || !(currentEndLeaveDate instanceof Date)) {
      return 0;
    }

    const start = currentStartLeaveDate.getTime();
    const end = currentEndLeaveDate.getTime();
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h1>{capitalize(kind)}</h1>
      <label>Leave Date</label>
      {/* <Datepicker
        value={currentLeaveDateRange}
        onChange={handleValueChange}
        useRange={true}
        asSingle={true}
      /> */}
      <div>
        
      <ThaiDatePicker
          id="startLeaveDate"
          onChange={handleDatePickerStartChange}
          value={currentStartLeaveDate}
        />
      </div>
      <div>
      <ThaiDatePicker
          id="endLeaveDate"
          onChange={handleDatePickerEndChange}
          value={currentEndLeaveDate}
        />
      </div>
      <div>
        <Input
          id="totalLeaveDate"
          placeholder='Total Leave Date'
          {...register('totalLeaveDate')}
        />
      </div>
      <div>
        <Input
          id="typeLeave"
          placeholder='Type Leave'
          {...register('typeLeave')}
        />
      </div>
      <div>
        Number of days: {calculateDays()}
      </div>
      <label htmlFor="reason">Reason</label>
      <Textarea
        id="reason"
        variant="bordered"
        cols={3}
        {...register('reason')}
      ></Textarea>
      {errors.reason && <div>{errors.reason.message}</div>}
      <Button type="submit" color="primary" isDisabled={!isValid}>
        {capitalize(kind)}
      </Button>
    </form>
  );
};

export default LeaveForm;
