import DatePicker from "~/features/ui/components/form/DatePicker";
import { useEffect,useState } from "react"
import { convertDateToFormatNormal } from "~/features/shared/helpers/date";
import { type DateValue } from "@mantine/dates";
import SelectItem from "~/features/ui/components/form/SelectItem";
import InputField from "~/features/ui/components/form/InputField";
import {type TextInputProps } from "@mantine/core";
import { api } from "~/utils/api";
import { Select,ComboboxItem,Button } from "@mantine/core";
import { useForm } from '@mantine/form';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { zodResolver } from 'mantine-form-zod-resolver';
import { type SubmitHandler } from "react-hook-form";
import * as validator from '../features/leaves/helpers/validators'
import * as types from "~/features/leaves/types";
import MantineDatePicker from "~/features/ui/components/form/DatePicker";




export default function TestInput () {

  const [startDate,setStartDate] = useState<Date | null>(null);
  const [endDate,setEndDate] = useState<Date | null>(null);
  const [daysDifference, setDaysDifference] = useState(0);
  const [testInput, setTestInput] = useState("");
  const [selectTypeLeave, setSelectTypeLeave] = useState<string | null>('');

  const { data:listType } = api.typeleave.list.useQuery();
  
  const form = useForm({
    validateInputOnChange:true,
    validate: zodResolver(validator.addTest),
    // resolver:zodResolver(validator.addTest),
    initialValues: {
      typeLeave: '',
      startDate: null,
    },

    // validate:zodResolver(validator.addTest)
  })
  

  const onSubmit = (formValue: types.AddTestInput) => {
    console.log(formValue)
  }


  const calculateDaysDifference = (startDate:any,endDate:any) => {
    if(!startDate || !endDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    return diffDays;
  }

  useEffect(() => {
    console.log(selectTypeLeave);
  }, [listType,selectTypeLeave]);

  return (
    <>
  <div>
    <form onSubmit={form.onSubmit((value) =>console.log(value))}>
    <MantineDatePicker 
    // value={startDate}
    // date={value}
    placeholder="เลือกวันที่"
    // onChange={setStartDate}
    label="เริ่มต้น"
    maxDate={endDate ?? undefined}
    // onChange={(value) => {
    //   console.log("Date changed",value);
    //   form.setFieldValue('startDate', value);
    // }}
    onBlur={() => console.log('DatePicker onBlur triggered')}
    {...form.getInputProps('startDate')}
    >
    </MantineDatePicker>
    <hr/>
    {/* <MantineDatePicker
    label="สิ้นสุด"
    value={endDate}
    onChange={setEndDate}
    minDate={startDate ?? undefined}
    /> */}
    {/* <p>รวมเวลาทั้งหมด {daysDifference}</p> */}

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