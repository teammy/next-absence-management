import { api } from "~/utils/api";
import { useCallback, useState } from "react";
import { Table,TableBody,TableCell,TableRow,TableColumn,TableHeader,useDisclosure,Modal,ModalHeader,ModalBody,ModalContent,ModalFooter,Button } from "@nextui-org/react";
import { PencilSquareIcon,MinusCircleIcon } from "@heroicons/react/24/solid";
import ModalShowTimer from "~/features/ui/components/modal/ModalShowTimer";
import { Link } from "@nextui-org/react";
import TypeLeaveForm from "./typeLeaveForm";

export type Props = {
  id: number;
  leaveTypeDescription: string;
  maxAllowPerYear:number;
}

const TypeLeaveList = () => {

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [openModelDelete, setOpenModelDelete] = useState(false);
  const [selectItemDelete, setSelectItemDelete] = useState<number>(0);
  const [selectItemEdit, setSelectItemEdit] = useState<number>(0);

  const columns = [
    {key: "leaveTypeDescription" , label: "ประเภทการลา"},
    {key: "maxAllowPerYear" , label: "จำนวนวันลาต่อปี(วัน)"},
    {key: "actions" , label: ""},
  ]

  const { data: typeleavelist =[],isLoading,refetch } = api.typeleave.list.useQuery();
  // if(!typeleavelist) return <div>Not Found</div>;
  // if(isLoading) return <div>Loading...</div>;

  const { mutateAsync } = api.typeleave.destroy.useMutation({
    onSuccess: () => {
      setSelectItemDelete(0);
      onClose();
      setOpenModelDelete(true)
      refetch();
    },
  })

  const handleConfirmDelete = async () => {
    // Implement your delete logic here
    if(selectItemDelete){
      try {
        await mutateAsync(selectItemDelete);
      } catch {
        console.error("error");
      }
    }
  }

  const handleDeleteItem = (typeLeaveId:number) => {
    setSelectItemDelete(typeLeaveId)
    onOpen();
  };

  const handleEditItem = (typeLeaveId:number) => {
    // console.log(typeLeaveId);
    setSelectItemEdit(typeLeaveId)
    onOpen();
  };

  const renderCell = useCallback((user: Props, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Props];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/setting/typeLeave/${user.id}`}>
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <PencilSquareIcon className="h-5 w-5"  
            />
              แก้ไข
            </span>
            </Link>
            <span
              className="cursor-pointer text-lg text-danger active:opacity-50"
              onClick={() => handleDeleteItem(user.id)}
            >
              <MinusCircleIcon className="h-5 w-5" />
              ยกเลิก
            </span>
            
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
   <>
      <div className="head-title my-5">
        <h1 className="Ekachon_Bold blueDark text-2xl">ใบลาของฉัน</h1>
      </div>
      <div className=" border-maincontent rounded-md">
        <div className="filter-item m-6">Filter</div>
        <div className="filter-item">
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={typeleavelist}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} className="Ekachon_Light">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1 bg-[#F44436] text-white">
                ยกเลิกใบลา
              </ModalHeader>
              <ModalBody className="p-10 Ekachon_Light">
                <p>
                คุณต้องการจะยกเลิกใบลานี้ ใช่หรือไม่?
                </p>
              </ModalBody>
              <ModalFooter className="bg-[#EFF0F6]">
                <Button color="danger" variant="light" onPress={onClose}>
                  ปิด
                </Button>
          <Button onPress={() =>handleConfirmDelete()} className="bg-[#F44436] text-white">ใช่</Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
      {openModelDelete && <ModalShowTimer onClose={() => setOpenModelDelete(false)} titleInModal="การลบสำเร็จ" msgInModal="ระบบได้ทำการลบสำเร็จแล้ว" />}
   </>
  )
}

export default TypeLeaveList