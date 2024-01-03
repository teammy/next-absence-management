// import dayjs from 'dayjs';
// import { th } from 'date-fns/locale';
// import 'dayjs/locale/th';
// dayjs.locale('th');
import DatePicker from '~/features/ui/components/form/DatePicker';
import { type DateValue } from '@mantine/dates/lib/types';
import { convertDateToFormatNormal } from '~/features/shared/helpers/date';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import FileUploadLeave from './FileUploadLeave';
import InputField from '~/features/ui/components/form/InputField';
import TextAreaField from '~/features/ui/components/form/TextAreaField';
import { Button, Input,Select,SelectItem } from '@nextui-org/react';

import {
  type AddLeaveInput,
  type LeaveDetails,
  type UpdateLeaveInput,
} from '../types';
import * as validators from '../helpers/validators';
import {
  useState,
  useEffect,
} from 'react';


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

  const [selectTypeLeave, setSelectTypeLeave] = useState<string>('');
  const { data: session } = useSession();
  const [selectAssignUser, setSelectAssignUser] = useState<string>('');
  const [totalLeaveDate, setTotalLeaveDate] = useState<number>();
  const [startDate, setStartDate] = useState<DateValue>(null);
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [uploadedFilenames, setUploadedFilenames] = useState<string[]>([]);

  const { kind, onSubmit } = props;
  const userId = session?.user.user_id ? session?.user.user_id : 0;
  const wardId = session?.user.ward_id ? session?.user.ward_id : 0;
  const positionId = session?.user.position_id ? session?.user.position_id : 0;

  type EmployeeAssings = {
    user_id: string;
    person_firstname: string;
    person_lastname: string;
  };

  const { data: listPerAssigns } = api.employee.listEmployeeAssign.useQuery<
    EmployeeAssings[]
  >({ wardId, userId, positionId });

  const { data: listTypeLeave } = api.typeleave.list.useQuery();

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



  const calculateDiffDays = (startDate: any, endDate: any) => {
    if(!startDate || !endDate) return 0;
    let diffDays = 0;
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const holidays = [
      new Date('2023-10-02'), // public holiday
      new Date('2023-10-03'), // public holiday
      new Date('2023-10-01'), // custom holiday
    ];
    for (
      let date = new Date(startDate);
      date <= new Date(endDate);
      date.setDate(date.getDate() + 1)
    ) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // exclude weekends
        const isHoliday = holidays.some(
          (holiday) => holiday.toDateString() === date.toDateString(),
        );
        if (!isHoliday) {
          diffDays++;
        }
      }
    }

    return diffDays;
  };

  const handleValueAssignUserChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectAssignUser(e.target.value);
  };


  useEffect(() => {
    setValue('totalLeaveDays', calculateDiffDays(startDate, endDate));
    setTotalLeaveDate(getValues('totalLeaveDays'));

    setValue('typeLeave',selectTypeLeave,{
      shouldValidate:true,
      shouldDirty:true,
      shouldTouch:true,
    })

    console.log("getValue:",getValues('typeLeave'))
    console.log("value From useState:",selectTypeLeave)


    setValue('assignUser', selectAssignUser, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setValue('uploadFiles', uploadedFilenames, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  
  }, [selectTypeLeave, selectAssignUser, startDate, endDate,uploadedFilenames]);

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

  const handleSelectTypeLeaveChange = (value:string) => {
    setSelectTypeLeave(value);
    if(value) {
      setValue('typeLeave',value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  };


  const handleDatePickerStartChange = (value:DateValue) => {
    setStartDate(value);
    if(value) {
      setValue('startLeaveDate',convertDateToFormatNormal(value.toString()),{
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  };

  const handleDatePickerEndChange = (value:DateValue) => {
    setEndDate(value);
    if(value) {
      setValue('endLeaveDate',convertDateToFormatNormal(value.toString()),{
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  };

  if (!listPerAssigns) return <div>ไม่มีผู้ปฏิบัติงานแทน</div>;

  const logCurrentValues = () => {
    console.log('Current form values:', getValues());
  };

  const handleFileUpload = (filenames: string[]) => {
    setUploadedFilenames(filenames);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* <h1>{capitalize(kind)}</h1> */}
      <div className="flex flex-col md:flex-row md:space-x-7">
        <div className="flex-1 md:w-1/2">
          <div id="detailMain" className="mb-10">
            <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียด</h1>
            <div id="select-typeLeave" className="pt-2">
              {/* <SelectItem
                label="ประเภทการลา"
                data={listTypeLeave?.map((item) => ({
                  value: item.id.toString(),
                  label: item.leaveTypeDescription,
                }))}
                placeholder="เลือกประเภทการลา"
                value={selectTypeLeave}
                onChange={setSelectTypeLeave}
                error={errors.typeLeave && errors.typeLeave.message}
              >
              </SelectItem> */}
              <Select
                id="typeLeave"

                variant="bordered"
                label="ประเภทการลา"
                labelPlacement="outside"
                radius="sm"
                onChange={handleSelectTypeLeaveChange}
                placeholder="เลือกประเภทการลา"
                isInvalid={!!errors.typeLeave}
                errorMessage={errors.typeLeave && errors.typeLeave.message}
              >
                {listTypeLeave?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.leaveTypeDescription}
                  </SelectItem>
                )) ?? []}
                
            
              </Select>
            </div>
            <div
              className="my-4 flex justify-between text-base"
              id="remainingLeaveDays"
            >
              <p className="Ekachon_Light grayBlack">ยอดวันลาสะสม</p>
              <p className="blueDark Ekachon_Bold">0 วัน</p>
            </div>
            <div
              className="my-4 flex justify-between text-base"
              id="remainingLeaveDays"
            >
              <p className="Ekachon_Light text-[#6F6F6F]">วันลาคงเหลือรวม</p>
              <p className="blueDark Ekachon_Bold">0 วัน</p>
            </div>
          </div>
          <div id="dateRange">
            <div className="my-5">
              <h1 className="blueDark Ekachon_Bold mb-5">ช่วงเวลา</h1>
              <DatePicker
                label="วันที่เริ่มต้น"
                value={startDate}
                onChange={handleDatePickerStartChange}
                maxDate={endDate ?? undefined}
                error={errors.startLeaveDate && errors.startLeaveDate.message}
              />
              {/* <ThaiDatePicker
              id="startLeaveDate"
              onChange={handleDatePickerStartChange}
              value={currentStartLeaveDate}
              placeholder="เลือกวันที่เริ่มต้นลา"
              yearBoundary={1}
              inputProps={{
                displayFormat: 'D MMM YYYY',
                className:
                  'border w-full rounded-md border-gray-300 text-base px-3 py-2 mt-1',
              }}
            /> */}
            </div>
            <div>
              <DatePicker

                // minDate={startDate}
                // value={currentEndLeaveDate}
                // placeholder="เลือกวันที่สิ้นสุดลา"
                label='วันที่สิ้นสุด'
                value={endDate}
                onChange={handleDatePickerEndChange}
                minDate={startDate ?? undefined}
                error={errors.endLeaveDate && errors.endLeaveDate.message}
                // onValueChange={handleDatePickerEndChange}
              />
              {/* <ThaiDatePicker
              id="endLeaveDate"
              yearBoundary={1}
              placeholder="เลือกวันที่สิ้นสุดลา"
              onChange={handleDatePickerEndChange}
              value={currentEndLeaveDate}
              minDate={new Date(currentStartLeaveDate)}
              inputProps={{
                displayFormat: 'D MMM YYYY',
                className:
                  'border w-full rounded-md text-base border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
              }}
            /> */}
            </div>

            <div
              className="my-6 flex justify-between text-base"
              id="remainingLeaveDays"
            >
              <p className="Ekachon_Light text-[#6F6F6F]">ระยะเวลา</p>
              <p className="blueDark Ekachon_Bold">
                {totalLeaveDate} วัน
              </p>
              <Input
                id="totalLeaveDays"
                placeholder=" "
                disabled={true}
                className="hidden"
                value={totalLeaveDate?.toString()}
                {...register('totalLeaveDays')}
              />
            </div>
          </div>{' '}
          {/*  dateRange */}
        </div>
        <div className="mt-5 flex-1 md:w-1/2 lg:mt-0">
          <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียดเพิ่มเติม</h1>
          <div className="" id="selectAssignUser">
          
            {/* <Select
              className="mb-6"
              label="ผู้ปฏิบัติงานแทน"
              items={listPerAssigns}
              variant="bordered"
              radius="sm"
              labelPlacement="outside"
              onChange={handleValueAssignUserChange}
              placeholder="เลือกผู้ปฏิบัติงานแทน"
            >
              {(listPerAssign) => (
                <SelectItem key={listPerAssign.user_id}>
                  {`${listPerAssign.person_firstname} ${listPerAssign.person_lastname}`}
                </SelectItem>
              )}
                          </Select> */}
               {/* {listPerAssigns.map((animal) => (
          <SelectItem key={animal.user_id} value={animal.user_id}>
            {animal.user_id}
          </SelectItem>
        ))} */}

          </div>
          <div id="reasonLeave" className="mb-5">
            {/* <label htmlFor="reason" className="text-sm text-slate-500">
              เหตุผลการลา *
            </label> */}
            <TextAreaField
            label="เหตุผลการลา"
            id="reason"
            {...register('reason')}
            error={errors.reason && errors.reason.message}
            >
            </TextAreaField>
            {/* <Textarea
              label="เหตุผลการลา"
              id="reason"
              placeholder=" "
              labelPlacement='outside'
              {...register('reason')}
              variant="bordered"
              radius="sm"
              isInvalid={!!errors.reason}
              errorMessage={errors.reason && errors.reason.message}
            /> */}
            {/* {errors.reason && <div>{errors.reason.message}</div>} */}
          </div>
          <div id="contactLocation" className="mb-5">
            {/* <label htmlFor="address_contact" className="text-sm text-slate-500">
              สถานที่ติดต่อระหว่างการลา *
            </label> */}

            <TextAreaField
            label="สถานที่ติดต่อระหว่างการลา"
            error={errors.leaveLocation && errors.leaveLocation.message}
            id="address_contact"
            {...register('leaveLocation')}
            cols={3}
            >
            </TextAreaField>
            {/* <Textarea
              label="สถานที่ติดต่อระหว่างการลา"
              placeholder=" "
              labelPlacement='outside'
              id="address_contact"
              cols={3}
              variant="bordered"
              radius="sm"
              {...register('leaveLocation')}
              isInvalid={!!errors.leaveLocation}
              errorMessage={errors.leaveLocation && errors.leaveLocation.message}
            /> */}
          </div>

          <div className="mb-6">
            {/* <label className="grayBlack text-base">เบอร์ติดต่อ *</label> */}
            <InputField
            label="เบอร์ติดต่อ"
            type="number"
            maxLength={10}
              id="leaveContactNumber"
              placeholder=" "
              error={errors.leaveContactNumber && errors.leaveContactNumber.message}
              {...register('leaveContactNumber')}
            />
          </div>

          {/* {selectTypeLeave[0] === '2' && (
            <div className="mb-5">
              <h2 className="blueDark Ekachon_Bold mb-2">
                เอกสารแนบ (ไม่บังคับ)
              </h2>
              <div className="grayBlack Ekachon_Light mb-5 text-base">
                รองรับไฟล์ JPG,JPEG,PNG,PDF,HEIC,HEIF ไม่เกิน 10 ไฟล์
                แต่ละไฟล์มีขนาดไม่เกิน 3 MB รวมกันไม่เกิน 30 MB
              </div>
              <FileUploadLeave onFileUpload={handleFileUpload} />
            </div>
          )} */}
        </div>
      </div>

      <div>
        {/* <Input
          id="typeLeave"
          placeholder='Type Leave'
          {...register('typeLeave')}
        /> */}
      </div>

      <Button type="button" onClick={logCurrentValues}>
      Log Current Values
      </Button>

      <Button
        type="submit"
        radius="sm"
        color="primary"
        className="btn-orange mt-5"
        isDisabled={!isValid}
      >
        {capitalize(kind)}
      </Button>
    </form>
  );
};

export default LeaveForm;
