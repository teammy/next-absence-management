
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import { ThaiDatePicker } from "thaidatepicker-react";
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize, set } from 'lodash';
import { api } from '~/utils/api';
import { useSession } from "next-auth/react";


import { Input, Textarea, Button,Select, SelectSection, SelectItem } from '@nextui-org/react';
import {
  type AddLeaveInput,
  type LeaveDetails,
  type UpdateLeaveInput,
} from '../types';
import * as validators from '../helpers/validators';
import { useState,useEffect } from 'react';



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
  const { data: session } = useSession();
  const { kind, onSubmit } = props;
  const officeId = session?.user.office_id ? session?.user.office_id : -1;
  const { data: listPerAssigns } = api.employee.listEmployeePerDepartment.useQuery(officeId);

  
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


  const [totalLeaveDate , setTotalLeaveDate] = useState('');
  const [selectedThaiDate, setSelectedThaiDate] = useState();

  const currentStartLeaveDate = getValues("startLeaveDate");
  const currentEndLeaveDate = getValues("endLeaveDate");

  useEffect(() => {
    setTotalLeaveDate(calculateDiffDays(currentStartLeaveDate, currentEndLeaveDate))
    setValue('totalLeaveDays', (calculateDiffDays(currentStartLeaveDate, currentEndLeaveDate)));
  }, [currentStartLeaveDate, currentEndLeaveDate])

  console.log("totalLeaveDays:", totalLeaveDate);
  console.log("getdataDate:", getValues('totalLeaveDays'));
  

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



  const handleDatePickerStartChange = (christDate:any,buddhistDate: any) => {
    setValue('startLeaveDate', christDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setSelectedThaiDate(buddhistDate);
    console.log("christDate:", buddhistDate);
  };

  const handleDatePickerEndChange = (christDate:any,buddhistDate: any) => {
    setValue('endLeaveDate', christDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setSelectedThaiDate(buddhistDate);
  };

  if (!listPerAssigns) return <div>ไม่มีผู้ปฏิบัติงานแทน</div>;


  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <h1>{capitalize(kind)}</h1>
     <div className="flex space-x-7 flex-col md:flex-row">

     <div className="flex-1 md:w-1/2">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-6 gap-7">
        <div>
        <label className="">
          ลาตั้งแต่วันที่ *
        </label>
      <ThaiDatePicker
          id="startLeaveDate"
          onChange={handleDatePickerStartChange}
          value={currentStartLeaveDate}
          placeholder="เลือกวันที่เริ่มต้นลา"
          yearBoundary={1} 
          inputProps={{
            displayFormat: "D MMM YYYY",
            className: "border w-full rounded-md border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }}
        />
        </div>
        <div>
        <label>
        ถึงวันที่ *
        </label>
      <ThaiDatePicker
          id="endLeaveDate"
          yearBoundary={1}
          placeholder="เลือกวันที่สิ้นสุดลา"
          onChange={handleDatePickerEndChange}
          value={currentEndLeaveDate}
          minDate={new Date(currentStartLeaveDate)}
          inputProps={{
            displayFormat: "D MMM YYYY",
            className: "border  rounded-md border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          }}
        />
        </div>
        </div>
      <div>
        <Input
          variant='bordered'
          id="totalLeaveDays"
          label="จำนวนวันลา"
          labelPlacement='outside'
          placeholder=" "
          radius="sm"
          isReadOnly
          classNames={{
            label: 'text-lg',
          }}
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">วัน</span>
            </div>
          }
          value={totalLeaveDate}
          {...register('totalLeaveDays')}
        />
      </div>
      </div>
        <div className="flex-1 md:w-1/2">
        <Textarea
      label="เหตุผลการลา *"
      labelPlacement="outside"
      variant="bordered"
      placeholder=" "
      radius="sm"
      classNames={{
        label: 'text-lg',
      }}
      {...register('reason')}
      className="max-w-xs mb-5"
    />
    {errors.reason && <div>{errors.reason.message}</div>}
     <Textarea
      label="สถานที่ติดต่อระหว่างการลา *"
      labelPlacement="outside"
      variant="bordered"
      placeholder=" "
      cols={3}
      radius="sm"
      className="max-w-xs mb-6"
      classNames={{
        label: 'text-lg',
      }}
      {...register('leaveLocation')}
    />
    <Input 
      variant="bordered"
      label="เบอร์โทรศัพท์ *"
      labelPlacement="outside"
      placeholder=" "
      radius="sm"
      classNames={{
        label: 'text-lg',
      }}
      {...register('leaveContact')}
    />
    <div>
        <Select
        label="มอบหมายงานให้ *"
        labelPlacement="outside"
        placeholder="เลือกผู้ปฏิบัติงานแทน"
        variant="bordered"
        items={listPerAssigns}
        className="mb-6"
        classNames={{
          label: 'text-lg',
        }}
        radius="sm"
        {...register('assignUser')}
        >
          {(listPerAssign) => 

          <SelectItem key={listPerAssign.user_id} textValue={listPerAssign.person_firstname}>
            {listPerAssign.person_firstname} {listPerAssign.person_lastname}
          </SelectItem>
          }

        </Select>
        </div>
        <div>
        <Select
        label="หัวหน้างาน *"
        labelPlacement="outside"
        placeholder=" "
        variant="bordered"
        className="mb-6"
        classNames={{
          label: 'text-lg',
        }}
        radius="sm"
        >
          <SelectItem key={2}>
            ลากิจ
          </SelectItem>
        </Select>
        </div>
        <div>
        <Select
        label="หัวหน้าฝ่าย/กลุ่มภารกิจ *"
        labelPlacement="outside"
        placeholder=" "
        variant="bordered"
        className="mb-5"
        classNames={{
          label: 'text-lg',
        }}
        radius="sm"
        >
          <SelectItem key={2}>
            ลากิจ
          </SelectItem>
        </Select>
        </div>
        </div>
     
     </div>
      
      <div>
        <Input
          id="typeLeave"
          placeholder='Type Leave'
          {...register('typeLeave')}
        />
      </div>
      
      <Button type="submit" color="primary" isDisabled={!isValid}>
        {capitalize(kind)}
      </Button>
    </form>
  );
};

export default LeaveForm;
