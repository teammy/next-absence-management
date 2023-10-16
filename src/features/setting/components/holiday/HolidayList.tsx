import React from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react';
import DataTable from '~/features/ui/components/table/DataTable';
import { ThaiDatePicker } from 'thaidatepicker-react';
import { type SubmitHandler , useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize, set } from 'lodash';
import * as validators from '../../helpers/validators';
import { type } from 'os';
import {
  type AddHolidayInput,
  type DestroyHolidayInput,
  type UpdateHolidayInput,
} from '../../types';


export type HolidayListProps = 
  | {
    kind: 'create';
    onSubmit: SubmitHandler<AddHolidayInput>;
    }
  | {
    kind: 'edit';
    settingHoliday: UpdateHolidayInput;
    onSubmit: SubmitHandler<UpdateHolidayInput['data']>;
  } 
  | {
    kind: 'destroy';
    onSubmit: SubmitHandler<DestroyHolidayInput>;
  };
  

const HolidayList = (props: HolidayListProps) => {
  const { kind , onSubmit } = props;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<
    typeof onSubmit extends SubmitHandler<AddHolidayInput>
      ? AddHolidayInput
      : UpdateHolidayInput['data']
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.addHoliday : validators.updateFormHoliday,
    ),
    defaultValues: kind === 'edit' ? props.settingHoliday : undefined,
  });
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const currentHolidayDate = getValues('holidayLeaveDate');

  const handleDatePickerHolidayChange = (christDate:any) => {
    setValue('holidayLeaveDate', christDate, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };


  return (
    <>
    <Button color="primary" onPress={onOpen}>
      เพิ่มวันหยุด
    </Button>
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">เพิ่มวันหยุดราชการ</ModalHeader>
          <ModalBody>
            <div> 
            <ThaiDatePicker
          id="holidayLeaveDate"
          onChange={handleDatePickerHolidayChange}
          value={currentHolidayDate}
          yearBoundary={1} 
        />
            </div>
            <div>
            <Input 
              label="รายละเอียดวันหยุด"
              labelPlacement='inside'
              placeholder=""
              />
            </div>
            <div>
           <Select
           label="ประเภทวันหยุด"
           labelPlacement='inside'
           >
            <SelectItem key={1} value={1}>
              วันหยุดราชการ
            </SelectItem>
            <SelectItem key={2} value={2}>
              วันหยุดชดเชย
            </SelectItem>
           </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              ยกเลิก
            </Button>
            <Button color="primary" onPress={onClose}>
              เพิ่ม
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  </>
  );
};

export default HolidayList;
