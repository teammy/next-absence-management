import DatePicker from "~/features/ui/components/form/DatePicker";
import { useEffect,useState } from "react"
import { convertDateToFormatNormal } from "~/features/shared/helpers/date";
import { type DateValue } from "@mantine/dates";
import SelectItem from "~/features/ui/components/form/SelectItem";
import InputField from "~/features/ui/components/form/InputField";
import {type TextInputProps } from "@mantine/core";
import { api } from "~/utils/api";
import { Select,ComboboxItem,Button,NumberInput } from "@mantine/core";
import { useForm } from '@mantine/form';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { zodResolver } from 'mantine-form-zod-resolver';
import { type SubmitHandler } from "react-hook-form";
import * as validator from '../features/leaves/helpers/validators'
import * as types from "~/features/leaves/types";
import MantineDatePicker from "~/features/ui/components/form/DatePicker";


export type TestFromProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<types.AddLeaveInput>;
    }
  | {
      kind: 'edit';
      leave: types.LeaveDetails;
      onSubmit: SubmitHandler<types.UpdateLeaveInput['data']>;
    };


export default function TestInput (props:TestFromProps) {

  const [startDate,setStartDate] = useState<Date | null>(null);
  const [endDate,setEndDate] = useState<Date | null>(null);
  const [daysDifference, setDaysDifference] = useState(0);
  const [testInput, setTestInput] = useState("");
  const [selectTypeLeave, setSelectTypeLeave] = useState<string | null>('');

  const { data:listType } = api.typeleave.list.useQuery();
  const { kind, onSubmit } = props;
  const form = useForm({
    validateInputOnChange:true,
    validate: zodResolver(
      validator.addTest
      // kind==='create'? validator.addTest : validator.update
      // kind==='create' ?   validator.addTest
    ),
    initialValues: {
      typeLeave: '',
      startLeaveDate: null,
      endLeaveDate: null,
      totalLeaveDays:0,
    },

    // validate:zodResolver(validator.addTest)
  })
  

  const handleSubmit = (formValue: types.AddTestInput) => {
    console.log(formValue)
  }



  const calculateDaysDifference = () => {
    const startLeaveDate = form.values.startLeaveDate;
    const endLeaveDate = form.values.endLeaveDate;
    if(!startLeaveDate || !endLeaveDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((endLeaveDate - startLeaveDate) / oneDay)) + 1;

    return diffDays;
  }

  useEffect(() => {
    form.setFieldValue('totalLeaveDay',calculateDaysDifference())
    // console.log("totaldate",calculateDaysDifference());
  }, [form.values.startLeaveDate, form.values.endLeaveDate]);

  return (
    <>
  <div>
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
    <MantineDatePicker 
    // date={value}
    placeholder="เลือกวันที่"
    label="เริ่มต้น"
    maxDate={form.values.endLeaveDate ?? undefined}
    {...form.getInputProps('startLeaveDate')}
    onChange={(value) => {
      form.setFieldValue('startLeaveDate',value)
      form.setFieldValue('totalLeaveDay',calculateDaysDifference())
    }}
    >
    </MantineDatePicker>
    <hr/>
    <MantineDatePicker
    label="สิ้นสุด"
    minDate={form.values.startLeaveDate ?? undefined}
    {...form.getInputProps('endLeaveDate')}
    onChange={(value)=>{
      form.setFieldValue('endLeaveDate',value);
      form.setFieldValue('totalLeaveDay',calculateDaysDifference())
    }}
    />
    <div>รวมเวลาทั้งหมด <NumberInput {...form.getInputProps('totalLeaveDay')} /> วัน</div>
    

    <SelectItem
      label="Your favorite library"
      placeholder="เลือกประเภทการลา"
      data={listType?.map((item) => ({
        value: item.id.toString(),
        label: item.leaveTypeDescription,
      }))}
      {...form.getInputProps('typeLeave')}
    />

    {/* <InputField
    label="ทดสอบ Input"
    value={testInput}
    onChange={(e) => setTestInput(e.currentTarget.value)}
    >
    
    </InputField> */}
    <Button type="submit">Submit</Button>
    </form>
  </div>
    </>
  )
}