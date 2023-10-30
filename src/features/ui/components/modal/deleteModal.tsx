import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

type Props = {
  isOpen: boolean;
  warningMessage: string;
  onOpenChange: () => void;
  onDelete: () => void;
};

function DeleteModal({
  isOpen,
  onOpenChange,
  onDelete,
  warningMessage,
}: Props) {
  return (
    <Modal isOpen={isOpen} backdrop="opaque" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Product deletion
            </ModalHeader>
            <ModalBody>
              <p>{warningMessage}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  onClose();
                  onDelete();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DeleteModal;
