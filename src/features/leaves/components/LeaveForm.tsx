import dayjs from 'dayjs';
import { th } from 'date-fns/locale';
import 'dayjs/locale/th';
dayjs.locale('th');
import { ThaiDatePicker } from 'thaidatepicker-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize, get, set } from 'lodash';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import {
  ArrowUpTrayIcon,
  SpeakerXMarkIcon,
  BriefcaseIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import FileUploadLeave from './FileUploadLeave';
import { DatePicker, DatePickerValue } from '@tremor/react';

import { Button, Select, SelectItem, Textarea, Input } from '@nextui-org/react';
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

export const typeLeaves = [
  { label: 'ลากิจ', value: '1' },
  { label: 'ลาป่วย', value: '2' },
  { label: 'ลาพักร้อน', value: '3' },
];

const LeaveForm = (props: LeaveFormProps) => {
  const [selectTypeLeave, setSelectTypeLeave] = useState<string>('1');
  const { data: session } = useSession();
  const [selectAssignUser, setSelectAssignUser] = useState<string>('');
  const [totalLeaveDate, setTotalLeaveDate] = useState<number>();
  const [startDate, setStartDate] = useState<DatePickerValue>();
  const [endDate, setEndDate] = useState<DatePickerValue>();
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

  // console.log("typeLeave",getValues('typeLeave'))
  console.log('isValid', isValid);
  console.log('errors', errors);




  const calculateDiffDays = (startDate: any, endDate: any) => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const holidays = [
      new Date('2023-10-02'), // public holiday
      new Date('2023-10-03'), // public holiday
      new Date('2023-10-01'), // custom holiday
    ];
    let diffDays = 0;
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

  const handleSelectTypeLeaveChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectTypeLeave(e.target.value);
  };

  useEffect(() => {
    setValue('totalLeaveDays', calculateDiffDays(startDate, endDate));
    setTotalLeaveDate(getValues('totalLeaveDays'));

    setValue('assignUser', selectAssignUser, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('typeLeave', selectTypeLeave);
    // setValue('assignUser',Number(selectAssignUser));
    console.log('selectAssignUser', getValues('assignUser'));

    // setValue('uploadFiles', uploadedFilenames, {
    //   shouldValidate: true,
    //   shouldDirty: true,
    //   shouldTouch: true,
    // });

    console.log('uploadedFilenames', uploadedFilenames);
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

  const handleDatePickerStartChange = (value: DatePickerValue) => {
    setStartDate(value);

    const dateStartString = value ? (value instanceof Date ? value.toISOString().split('T')[0] : '') : '';
    if(!dateStartString) return null;

    // const dateStartString = value instanceof Date
    // ? value.toISOString().split('T')[0]
    // : '';

    setValue('startLeaveDate',dateStartString, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleDatePickerEndChange = (value: DatePickerValue) => {
    setEndDate(value);

    const dateEndString = value ? (value instanceof Date ? value.toISOString().split('T')[0] : '') : '';
    if(!dateEndString) return null;

    setValue('endLeaveDate', dateEndString, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  if (!listPerAssigns) return <div>ไม่มีผู้ปฏิบัติงานแทน</div>;

  const logCurrentValues = () => {
    console.log('Current form values:', getValues());
  };

  const handleFileUpload = (filenames: string[]) => {
    setUploadedFilenames(filenames);
    setValue('uploadFiles', filenames, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

  };



  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* <h1>{capitalize(kind)}</h1> */}
      <div className="flex flex-col md:flex-row md:space-x-7">
        <div className="flex-1 md:w-1/2">
          <div id="detailMain" className="mb-10">
            <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียด</h1>
            <div id="select-typeLeave" className="pt-2">
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

                
                <SelectItem value="1" key={1}>
                  ลากิจ
                </SelectItem>
                <SelectItem value="2" key={2}>
                  ลาป่วย
                </SelectItem>
                <SelectItem value="3" key={3}>
                  ลาพักผ่อน
                </SelectItem>
              </Select>
              {/* <Select
              id="typeLeave"
              {...register('typeLeave')}
              items={typeLeaves}
              label="ประเภทการลา"
              radius="sm"
              placeholder=" "
              size="lg"
              selectedKeys={[selectTypeLeave]}
              onChange={handleSelectionTypeLeaveChange}
              variant="bordered"
              className="border-gray-300"
              classNames={{
                value: 'blueDark',
                base: 'blueDark',
                label: 'text-base',
                listbox: 'mlp text-base lg:text-lg',
              }}
            >
              {(typeLeave) => (
                <SelectItem key={typeLeave.value}>{typeLeave.label}</SelectItem>
              )}
            </Select> */}
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
          </div>ช่วงเวลา
          <div id="dateRange">
            <div className="my-5">
              <h1 className="blueDark Ekachon_Bold mb-5">ช่วงเวลา</h1>
              <label className="grayBlack text-base">เริ่มต้น *</label>
              <DatePicker
                className="mx-auto"
                locale={th}
                placeholder="เลือกวันที่เริ่มต้นลา"
                // onValueChange={handleDatePickerStartChange}
                // value={currentStartLeaveDate}
                value={startDate}
                onValueChange={handleDatePickerStartChange}
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
              <label className="grayBlack text-base">สิ้นสุด *</label>
              <DatePicker
                className="mx-auto"
                locale={th}
                minDate={startDate}
                // value={currentEndLeaveDate}
                placeholder="เลือกวันที่สิ้นสุดลา"
                value={endDate}
                onValueChange={handleDatePickerEndChange}
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
                {getValues('totalLeaveDays')} วัน
              </p>
              <Input
                id="totalLeaveDays"
                placeholder=" "
                disabled={true}
                className="hidden"
                value={getValues('totalLeaveDays').toString()}
                {...register('totalLeaveDays')}
              />
            </div>
          </div>{' '}
          {/*  dateRange */}
        </div>
        <div className="mt-5 flex-1 md:w-1/2 lg:mt-0">
          <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียดเพิ่มเติม</h1>
          <div className="" id="selectAssignUser">
          
            <Select
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
               {/* {listPerAssigns.map((animal) => (
          <SelectItem key={animal.user_id} value={animal.user_id}>
            {animal.user_id}
          </SelectItem>
        ))} */}
            </Select>
          </div>
          <div id="reasonLeave" className="mb-5">
            {/* <label htmlFor="reason" className="text-sm text-slate-500">
              เหตุผลการลา *
            </label> */}
            <Textarea
              label="เหตุผลการลา"
              id="reason"
              placeholder=" "
              labelPlacement='outside'
              {...register('reason')}
              variant="bordered"
              radius="sm"
              isInvalid={!!errors.reason}
              errorMessage={errors.reason && errors.reason.message}
            />
            {/* {errors.reason && <div>{errors.reason.message}</div>} */}
          </div>
          <div id="contactLocation" className="mb-5">
            {/* <label htmlFor="address_contact" className="text-sm text-slate-500">
              สถานที่ติดต่อระหว่างการลา *
            </label> */}
            <Textarea
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
            />
          </div>

          <div className="mb-6">
            {/* <label className="grayBlack text-base">เบอร์ติดต่อ *</label> */}
            <Input
            label="เบอร์ติดต่อ"
            labelPlacement='outside'
              id="leaveContactNumber"
              placeholder=" "
              variant="bordered"
              radius="sm"
              isInvalid={!!errors.leaveContactNumber}
              errorMessage={
                errors.leaveContactNumber && errors.leaveContactNumber.message
              }
              {...register('leaveContactNumber')}
            />
          </div>

          {selectTypeLeave[0] === '2' && (
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
          )}
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
