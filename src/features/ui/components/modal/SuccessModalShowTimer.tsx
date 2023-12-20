import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
import { useState,useEffect } from 'react';

type Props = {
  msgInModal: string;
  titleInModal: string;
  onClose: () => void;
};

function SuccessModalShowTimer({
  onClose,
  msgInModal,
  titleInModal,
}: Props) {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1000); // Set timer for 5 seconds.
    return () => clearTimeout(timer);
  }, []);

  return (
    <Modal isOpen={isVisible} backdrop="opaque" onClose={onClose} >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {titleInModal}
            </ModalHeader>
            <ModalBody>
              {msgInModal}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default SuccessModalShowTimer;
