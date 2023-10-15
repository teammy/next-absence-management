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

const HolidayList = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    <Button color="primary" onPress={onOpen}>
      เพิ่มวันหยุด
    </Button>
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">เพิ่มวันหยุดนักขัตฤกษ์</ModalHeader>
          <ModalBody>
            <p> 
              <Input 
              label="วันที่"
              labelPlacement='outside'
              />
            </p>
            <p>
            <Input 
              label="ชื่อวันหยุด"
              labelPlacement='outside'
              />
            </p>
            <p>

            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
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
