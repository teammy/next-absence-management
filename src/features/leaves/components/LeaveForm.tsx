import dayjs from 'dayjs';
import { th } from 'date-fns/locale';
import 'dayjs/locale/th';
dayjs.locale('th');
import { ThaiDatePicker } from 'thaidatepicker-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize, set } from 'lodash';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import {
  ArrowUpTrayIcon,
  SpeakerXMarkIcon,
  BriefcaseIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import FileUploadLeave from './FileUploadLeave';
import AvatarUploader from '~/features/ui/components/AvatarUploader';
import {
  DatePicker,
  TextInput,
  DatePickerValue,
  Select,
  SelectItem,
  Textarea,
} from '@tremor/react';

import { Button } from '@nextui-org/react';
import {
  type AddLeaveInput,
  type LeaveDetails,
  type UpdateLeaveInput,
} from '../types';
import * as validators from '../helpers/validators';
import { useState, useEffect, useRef, type ChangeEventHandler, use } from 'react';

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
  const [selectAssignUser, setSelectAssignUser] = useState<string>("");
  const [totalLeaveDate, setTotalLeaveDate] = useState<string>("");

  const { kind, onSubmit } = props;
  const userId = session?.user.user_id ? session?.user.user_id : 0;
  const wardId = session?.user.ward_id ? session?.user.ward_id : 0;
  const positionId = session?.user.position_id ? session?.user.position_id : 0;

  type EmployeeAssings = {
    user_id: string;
    person_firstname : string;
    person_lastname : string;
  };

  const {data: listPerAssigns } =
    api.employee.listEmployeeAssign.useQuery<EmployeeAssings[]>({ wardId, userId,positionId });

  const handleSelectionTypeLeaveChange: ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    setSelectTypeLeave(event.target.value);
    setValue('typeLeave', event.target.value);
  };

  const handleSelectAssignUserChange: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setSelectAssignUser(event.target.value);
    setValue('assignUser', Number(event.target.value));
  };

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


  const calculateDiffDays = (startDate: string, endDate: string) => {
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

  const currentStartLeaveDate = getValues('startLeaveDate');
  const currentEndLeaveDate = getValues('endLeaveDate');

  useEffect(() => {
    setTotalLeaveDate(
      calculateDiffDays(currentStartLeaveDate, currentEndLeaveDate).toString(),
    );
    setValue(
      'totalLeaveDays',
      calculateDiffDays(currentStartLeaveDate, currentEndLeaveDate),
    );
  }, [currentStartLeaveDate, currentEndLeaveDate]);

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

  const handleDatePickerStartChange = (startDate) => {
    // console.log('christDate', startDate);
    setValue('startLeaveDate', startDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleDatePickerEndChange = (endDate) => {
    // console.log("endDate",endDate)
    const convertEnddateTostring = endDate;
    setValue('endLeaveDate', endDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  if (!listPerAssigns) return <div>ไม่มีผู้ปฏิบัติงานแทน</div>;

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* <h1>{capitalize(kind)}</h1> */}
      <div className="flex flex-col md:flex-row md:space-x-7">
        <div className="flex-1 md:w-1/2">
          <div id="detailMain" className="mb-10">
            <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียด</h1>
            <label htmlFor="typeLeave" className="text-base text-slate-500">
              ประเภทการลา *
            </label>
            <div id="select-typeLeave" className="pt-2">
              <Select
                value={selectTypeLeave}
                id="typeLeave"
                onValueChange={setSelectTypeLeave}
                placeholder="เลือกประเภทการลา"
              >
                <SelectItem value="1" icon={BriefcaseIcon}>
                  ลากิจ
                </SelectItem>
                <SelectItem value="2" icon={SpeakerXMarkIcon}>
                  ลาป่วย
                </SelectItem>
                <SelectItem value="3" icon={PhotoIcon}>
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
          </div>
          <div id="dateRange">
            <div className="my-5">
              <h1 className="blueDark Ekachon_Bold mb-5">ช่วงเวลา</h1>
              <label className="grayBlack text-base">เริ่มต้น *</label>
              <DatePicker
                className="mx-auto"
                locale={th}
                placeholder="เลือกวันที่เริ่มต้นลา"
                onValueChange={handleDatePickerStartChange}
                value={currentStartLeaveDate}
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
                minDate={new Date(currentStartLeaveDate)}
                value={currentEndLeaveDate}
                placeholder="เลือกวันที่สิ้นสุดลา"
                onValueChange={handleDatePickerEndChange}
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
              <p className="blueDark Ekachon_Bold">{totalLeaveDate} วัน</p>
              <TextInput
                id="totalLeaveDays"
                placeholder=" "
                disabled={true}
                className="hidden"
                value={totalLeaveDate}
                {...register('totalLeaveDays')}
              />
            </div>
          </div>{' '}
          {/*  dateRange */}
        </div>
        <div className="mt-5 flex-1 md:w-1/2 lg:mt-0">
          <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียดเพิ่มเติม</h1>
          <div className="" id="selectAssignUser">
            <label htmlFor="assignUser" className="text-sm text-slate-500">
              เลือกผู้ปฏิบัติงานแทน *
            </label>

            {/* <div className="max-w-sm mx-auto space-y-6">
        <Select value={selectAssignUser} onValueChange={setSelectAssignUser}>
          <SelectItem value="1">
          Kilometers
          </SelectItem>
          <SelectItem value="2">
          Meters
          </SelectItem>
          <SelectItem value="3">
          Miles
          </SelectItem>
          <SelectItem value="4">
          Nautical Miles
          </SelectItem>
        </Select>
      </div> */}
            <Select
              // {...register('assignUser')}
              id="assignUser"
              className="mb-6"
              value={selectAssignUser}
              onValueChange={setSelectAssignUser}
            >
              {listPerAssigns.map((listPerAssign) => (
                <SelectItem value={listPerAssign.user_id}>
                  {listPerAssign.person_firstname}{' '}
                  {listPerAssign.person_lastname}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div id="reasonLeave" className="mb-5">
            <label htmlFor="reason" className="text-sm text-slate-500">
              เหตุผลการลา *
            </label>
            <Textarea
              id="reason"
              placeholder=" "
              {...register('reason')}
            />
            {errors.reason && <div>{errors.reason.message}</div>}
          </div>
          <div id="contactLocation" className="mb-5">
            <label htmlFor="address_contact" className="text-sm text-slate-500">
              สถานที่ติดต่อระหว่างการลา *
            </label>
            <Textarea
              placeholder=" "
              id="address_contact"
              cols={3}
              {...register('leaveLocation')}
            />
          </div>

          <div className="mb-6">
            <label className="grayBlack text-base">เบอร์ติดต่อ *</label>
            <TextInput
              id="leaveContactNumber"
              placeholder=" "
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
              <FileUploadLeave />
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
