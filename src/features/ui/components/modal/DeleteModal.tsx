import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
import { useState,useEffect } from 'react';

type Props = {
  isOpen: boolean;
  warningMessage: string;
  onOpenChange: () => void;
  onDelete: () => void;
  onClose: () => void;
};

function DeleteModal({
  onClose,
  warningMessage,
}: Props) {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000); // Set timer for 5 seconds.
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal isOpen={isVisible} backdrop="opaque" onClose={onClose} >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
             การลบสำเร็จ
            </ModalHeader>
            <ModalBody>
              ระบบได้ทำการลบสำเร็จแล้ว
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
