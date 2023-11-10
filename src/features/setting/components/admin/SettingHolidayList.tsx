import DataGrid, {
  type DataGridColumn,
} from '~/features/ui/components/DataGrid';

// import { DataGrid,
//   type DataGridColumn,
// } from '~/features/ui/components/table/DataTable';

// import  DataGrid, {type DataGridColumn}  from '~/features/ui/components/table/DataTable';
import { api } from '~/utils/api';
import { type HolidayDateItem } from '~/features/setting/types';
// import LeaveDetails from './LeaveItem';
import {
  Button,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import EditIcon from '~/features/ui/components/icon/edit-icon';
import TrashIcon from '~/features/ui/components/icon/trash-icon';
import Link from 'next/link';
import { useEffect, useState,useMemo } from 'react';

export function SettingHolidayList() {
  const utils = api.useUtils();
  const lists = utils.admin.settingHoliday.listHoliday;
  const { data, isLoading } = api.admin.settingHoliday.listHoliday.useQuery();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange,onClose  } = useDisclosure();

  const [selectedHoliday, setSelectedHoliday] = useState<number | null>(null);
  const { mutateAsync } = api.admin.settingHoliday.destroyHoliday.useMutation({
    onSuccess(status) {
      if (status) {
        setSelectedHoliday(null);
        onClose();
        lists.invalidate();
      }
    },
  });

  const handleDeleteClick = (holiday: HolidayDateItem) => {
    setSelectedHoliday(holiday.id);
    onOpen();
  };

  const handelConfirmDelete = async () => {
    if (selectedHoliday) {
      try {
        // console.log("selectedHoliday",selectedHoliday);
        await mutateAsync(selectedHoliday);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns: DataGridColumn<HolidayDateItem>[] = [
    {
      field: 'holidayDate',
      headerName: 'วันที่',
      value: (holiday) => holiday.holidayDate,
    },
    {
      field: 'holidayName',
      headerName: 'รายละเอียด',
      value: (holiday) => holiday.holidayName,
    },
    {
      field: 'holidayType',
      headerName: 'ประเภทวันหยุด',
      value: (holiday) => holiday.holidayType.holidayType,
    },
    {
      field: 'id',
      headerName: '',
      value: (holiday) => (
        <div className="relative flex items-center gap-3 justify-end">
          <Tooltip content="แก้ไข" showArrow={true}>
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <Link href={`/admin/setting/holidayDate/${holiday.id}/edit`}>
                <EditIcon />
              </Link>
            </span>
          </Tooltip>
          <Tooltip color="danger" content="ลบ" showArrow={true}>
            <span className="cursor-pointer text-lg text-danger active:opacity-50">
              <Button isIconOnly color="danger" onPress={()=>handleDeleteClick(holiday)}>
                <TrashIcon />
              </Button>
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];

  if (!data) return <div>Not Content...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h1>Setting Holiday List</h1>
        <p>
         
        </p>
      </div>
      <DataGrid
        title="All Leave Requests"
        columns={columns}
        rows={data}
      ></DataGrid>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                คุณต้องการลบสิ่งนี้ใช่หรือไม่ ?
              </ModalHeader>
            
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button color="danger" onPress={() => handelConfirmDelete()}>
                  ลบ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SettingHolidayList;
