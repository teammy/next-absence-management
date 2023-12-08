import { type SubmitHandler, useForm,useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize, set } from 'lodash';
import { ThaiDatePicker } from 'thaidatepicker-react';
import {
  Input,
  Button,
  Select,
  SelectItem,
  SelectSection,
} from '@nextui-org/react';
import {
  type AddSettingHolidayInput,
  type UpdateSettingHolidayInput,
  type HolidayDateDetails,
} from '../../types';
import * as validators from '../../helpers/validators';
import { api } from '~/utils/api';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
dayjs.locale('th');


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
  // const { data: listTypes } = api.admin.settingHoliday.listHolidayType.useQuery();

  const listTypes = [
    {
      id: 1,
      holidayType: 'วันหยุดนักขัตฤกษ์',
    },
    {
      id: 2,
      holidayType: 'วันหยุดราชการ',
    },
  ]
  const { kind, onSubmit  } = props;
  

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<
    typeof onSubmit extends SubmitHandler<AddSettingHolidayInput>
      ? AddSettingHolidayInput
      : UpdateSettingHolidayInput['data']
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create'
        ? validators.addSettingHoliday
        : validators.addSettingHoliday
    ),
    defaultValues: kind === 'edit' ? props.settingHoliday : undefined,
  });

  const currentEndLeaveDate = getValues('holidayDate');
  const handleSettingHolidayDatePickerChange = (christDate: any) => {
    setValue('holidayDate', christDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  let head_text;
  if (kind === 'edit') {
    const head_text = 'แก้ไขข้อมูลวันหยุดนักขัตฤกษ์';
    const bttn_text = 'แก้ไขข้อมูล';
  } else {
    const head_text = 'เพิ่มข้อมูลวันหยุดนักขัตฤกษ์';
    const bttn_text = 'บันทึกข้อมูล';
  }




  // useEffect(() => {
  //   if (kind === 'edit') {
  //     setValue('holidayTypeId', props.settingHoliday.holidayTypeId, {
  //       shouldValidate: true
  //     });
  //     setValue('holidayName', props.settingHoliday.holidayName, {
  //       shouldValidate: true
  //     });
  //     setValue('holidayDate', props.settingHoliday.holidayDate, {
  //       shouldValidate: true
  //     });
  //   }
  //   console.log("is Valid",isValid)
  // },[isValid]);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg">{capitalize(kind)}</h1>
        <div className="mb-10 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="mb-6 flex w-full flex-wrap items-end gap-4 md:mb-0 md:flex-nowrap">
              <label
                htmlFor="holidayDate"
                className="block text-small text-default-500"
              >
                วันที่หยุด
              </label>
              <ThaiDatePicker
                id="holidayDate"
                yearBoundary={2}
                onChange={handleSettingHolidayDatePickerChange}
                value={currentEndLeaveDate}
                inputProps={{
                  displayFormat: 'D MMM YYYY',
                  className:
                    'border rounded-md border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
                }}
              />
              <Input
                id="holidayName"
                label="รายละเอียด"
                labelPlacement="outside"
                placeholder=" "
                classNames={{ label: 'text-default-500 text-base' }}
                errorMessage={errors.holidayName?.message}
                {...register('holidayName')}
              />

              <Select
              {...register('holidayTypeId')}
                label="ประเภทวันหยุด"
                labelPlacement="outside"
                placeholder=" "
                classNames={{ label: 'text-default-500 text-base' }}
                errorMessage={errors.holidayTypeId?.message}
                defaultSelectedKeys={kind === 'edit' ? getValues('holidayTypeId').toString() : undefined}
              >
                {listTypes?.map((item,index) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.holidayType}
                  </SelectItem>
                )) || []}
              </Select>
              {/* <Input
          id="holidayType"
          placeholder='Type Leave'
          {...register('holidayType')}
        /> */}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          color="primary"
          isDisabled={!isValid}
          className="w-full"
        >
          {capitalize(kind)}
        </Button>
      </form>
    </div>
  );
};

export default SettingHolidayDateForm;
