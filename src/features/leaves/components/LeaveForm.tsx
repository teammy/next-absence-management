// import dayjs from 'dayjs';
// import { th } from 'date-fns/locale';
// import 'dayjs/locale/th';
// dayjs.locale('th');
import DatePicker from '~/features/ui/components/form/DatePicker';
import { type DateValue } from '@mantine/dates/lib/types';
import { convertDateToFormatNormal } from '~/features/shared/helpers/date';
import { type SubmitHandler } from 'react-hook-form';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
// import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import FileUploadLeave from './FileUploadLeave';
import InputField from '~/features/ui/components/form/InputField';
import TextAreaField from '~/features/ui/components/form/TextAreaField';
import SelectItemField from '~/features/ui/components/form/SelectItemField';

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
import MantineDatePicker from '~/features/ui/components/form/DatePicker';
import { NumberInput, Textarea,TextInput,Button } from '@mantine/core';


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

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   getValues,
  //   formState: { errors, isValid },
  // } = useForm<
  //   typeof onSubmit extends SubmitHandler<AddLeaveInput>
  //     ? AddLeaveInput
  //     : UpdateLeaveInput['data']
  // >({
  //   mode: 'onBlur',
  //   resolver: zodResolver(
  //     kind === 'create' ? validators.add : validators.updateForm,
  //   ),
    // defaultValues: kind === 'edit' ? props.leave : undefined,
  // });

  const form = useForm<typeof onSubmit extends SubmitHandler<AddLeaveInput> ? AddLeaveInput : UpdateLeaveInput['data']>({
    validateInputOnChange: true,
    validate: zodResolver(
      kind === 'create' ? validators.add : validators.updateForm,
    ),
    initialValues: {
      typeLeave: '',
      startLeaveDate: null,
      endLeaveDate: null,
      totalLeaveDay: 0,
      reason: '',
      assignUser: '',
      uploadFiles: [],
      leaveLocation: '',
      leaveContactNumber: '',
    },
    
  });

  const calculateDaysDifference = () => {
    const startLeaveDate = form.values.startLeaveDate;
    const endLeaveDate = form.values.endLeaveDate;
    if(!startLeaveDate || !endLeaveDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((endLeaveDate - startLeaveDate) / oneDay)) + 1;
    form.setFieldValue('totalLeaveDay',diffDays)
    
    return diffDays;
  }


  // const calculateDiffDays = (startDate: any, endDate: any) => {
  //   if(!startDate || !endDate) return 0;
  //   let diffDays = 0;
  //   const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  //   const holidays = [
  //     new Date('2023-10-02'), // public holiday
  //     new Date('2023-10-03'), // public holiday
  //     new Date('2023-10-01'), // custom holiday
  //   ];
  //   for (
  //     let date = new Date(startDate);
  //     date <= new Date(endDate);
  //     date.setDate(date.getDate() + 1)
  //   ) {
  //     const dayOfWeek = date.getDay();
  //     if (dayOfWeek !== 0 && dayOfWeek !== 6) {
  //       // exclude weekends
  //       const isHoliday = holidays.some(
  //         (holiday) => holiday.toDateString() === date.toDateString(),
  //       );
  //       if (!isHoliday) {
  //         diffDays++;
  //       }
  //     }
  //   }

  //   return diffDays;
  // };

  // const handleValueAssignUserChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   setSelectAssignUser(e.target.value);
  // };


  // useEffect(() => {
  //   setValue('totalLeaveDays', calculateDiffDays(startDate, endDate));
  //   setTotalLeaveDate(getValues('totalLeaveDays'));

  //   setValue('typeLeave',selectTypeLeave,{
  //     shouldValidate:true,
  //     shouldDirty:true,
  //     shouldTouch:true,
  //   })

  //   console.log("getValue:",getValues('typeLeave'))
  //   console.log("value From useState:",selectTypeLeave)


  //   setValue('assignUser', selectAssignUser, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   });

  //   setValue('uploadFiles', uploadedFilenames, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   });
  
  // }, [selectTypeLeave, selectAssignUser, startDate, endDate,uploadedFilenames]);

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

  // const handleSelectTypeLeaveChange = (value:string) => {
  //   setSelectTypeLeave(value);
  //   if(value) {
  //     setValue('typeLeave',value, {
  //       shouldValidate: true,
  //       shouldDirty: true,
  //       shouldTouch: true,
  //     })
  //   }
 // };


  // const handleDatePickerStartChange = (value:DateValue) => {
  //   setStartDate(value);
  //   if(value) {
  //     setValue('startLeaveDate',convertDateToFormatNormal(value.toString()),{
  //       shouldValidate: true,
  //       shouldDirty: true,
  //       shouldTouch: true,
  //     })
  //   }
  // };

  // const handleDatePickerEndChange = (value:DateValue) => {
  //   setEndDate(value);
  //   if(value) {
  //     setValue('endLeaveDate',convertDateToFormatNormal(value.toString()),{
  //       shouldValidate: true,
  //       shouldDirty: true,
  //       shouldTouch: true,
  //     })
  //   }
  // };

  // if (!listPerAssigns) return <div>ไม่มีผู้ปฏิบัติงานแทน</div>;

  // const logCurrentValues = () => {
  //   console.log('Current form values:', getValues());
  // };

  // const handleFileUpload = (filenames: string[]) => {
  //   setUploadedFilenames(filenames);
  // };

  const handleSubmit = (formValue : AddLeaveInput) => {
    // form.setFieldValue('startLeaveDate',convertDateToFormatNormal(formValue.startLeaveDate))
    console.log("formValue",formValue)
  }

  useEffect(()=> {
    calculateDaysDifference()
  },[form.isValid(),form.values.startLeaveDate, form.values.endLeaveDate])

  return (
    <>
    <form className="flex flex-col" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      {/* <h1>{capitalize(kind)}</h1> */}
      <div className="flex flex-col md:flex-row md:space-x-7">
        <div className="flex-1 md:w-1/2">
          <div id="detailMain" className="mb-10">
            <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียด</h1>
            <div id="select-typeLeave" className="pt-2">
              <SelectItemField
                label="ประเภทการลา"
                data={listTypeLeave?.map((item) => ({
                  value: item.id as any,
                  label: item.leaveTypeDescription,
                }))}
                placeholder="เลือกประเภทการลา"
                {...form.getInputProps('typeLeave')}
              />
            </div>
            <div
              className="my-4 flex justify-between text-base"
              id="remainingLeaveDays"
            >
              <p className="txt_gray">ยอดวันลาสะสม</p>
              <p className="blueDark">0 วัน</p>
            </div>
            <div
              className="my-4 flex justify-between text-base"
              id="remainingLeaveDays"
            >
              <p className="txt_gray">วันลาคงเหลือรวม</p>
              <p className="blueDark">0 วัน</p>
            </div>
          </div>
          <div id="dateRange">
            <div className="my-5">
              <h1 className="blueDark Ekachon_Bold mb-5">ช่วงเวลา</h1>
              <MantineDatePicker
                placeholder="เลือกวันที่"
                label="วันที่เริ่มต้น"
                maxDate={form.values.endLeaveDate ?? undefined}
                {...form.getInputProps('startLeaveDate')}
              />
            </div>
            <div>
              <MantineDatePicker
                label='วันที่สิ้นสุด'
                placeholder='เลือกวันที่'
                minDate={form.values.startLeaveDate ?? undefined}
                {...form.getInputProps('endLeaveDate')}
              />
            </div>

            <div
              className="my-6 flex justify-between text-base"
              id="remainingLeaveDays"
            >
              <p className="Ekachon_Light text-[#6F6F6F]">ระยะเวลา</p>
              <p className="blueDark Ekachon_Bold"> วัน</p>
              <NumberInput
              hideControls
              disabled 
              {...form.getInputProps('totalLeaveDay')}
              rightSection="วัน"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex-1 md:w-1/2 lg:mt-0">
          <h1 className="blueDark Ekachon_Bold mb-5">รายละเอียดเพิ่มเติม</h1>
          <div className="" id="selectAssignUser">
          
             <SelectItemField
              className="mb-6"
              label="ผู้ปฏิบัติงานแทน"
              placeholder="เลือกผู้ปฏิบัติงานแทน"
              data={listPerAssigns?.map((item) => ({
                value: item.user_id.toString(),
                label: `${item.person_firstname} ${item.person_lastname}`,
              }))}
              {...form.getInputProps('assignUser')}
            />

              

          </div>
          <div id="reasonLeave" className="mb-5">
            <TextAreaField
            label="เหตุผลการลา"
            {...form.getInputProps('reason')}
            />
          </div>
          <div id="contactLocation" className="mb-5">
            <TextAreaField 
            label="สถานที่ติดต่อระหว่างการลา"
            {...form.getInputProps('leaveLocation')}
            cols={3}
            />
        
          </div>

          <div className="mb-6">
            <TextInput label="เบอร์ติดต่อ" {...form.getInputProps('leaveContactNumber')} />
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

      {/* <Button type="button" onClick={logCurrentValues}>
      Log Current Values
      </Button> */}

      <Button
        type="submit"
        color="gray"
        // className="btn-orange mt-5"
        // disabled={!form.isValid()}
        // isDisabled={!isValid}
      >
        {capitalize(kind)}
      </Button>
    </form>
    </>
  );
}

export default LeaveForm;


