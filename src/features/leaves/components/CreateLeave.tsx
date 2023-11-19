import { api } from '~/utils/api';
import { type AddLeaveInput } from '../types';
import LeaveForm from './LeaveForm';
import { useRouter } from 'next/router';
import { useAppStore } from '~/features/store';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { tr } from '@faker-js/faker';

const CreateLeave = () => {
  const setUiToast = useAppStore((state) => state.setUiToast);
  const [isOpenModalAlert, setOpenModalAlert] = useState(false);
  const router = useRouter();
  const utils = api.useUtils();
  const list = utils.leave.list;
  const { mutate: add } = api.leave.add.useMutation({
    async onMutate(input) {
      await list.cancel();

      const prevData = list.getData();
      list.setData(undefined, (old) => {
        if (!old) return old;
        return [
          {
            ...input,
            id: +new Date(),
            status: 'PENDING',
            user: {
              id: 1,
              name: 'Admin',
              email: 'admin@babelcoder.com',
            },
          },
          ...old,
        ];
      });

      return { prevData };
    },
    onError(_err, _data, ctx) {
      list.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      list.invalidate();
    },
  });
  useEffect(() => {
  console.log("Updated isOpenModalAlert:", isOpenModalAlert);
}, [isOpenModalAlert]);
  const createLeave = async  (leave: AddLeaveInput) => {
    try {
      await add(leave);
    }
    catch (err) {
      setOpenModalAlert(true)
      console.log("Not add",err);
    }

    console.log("isOpenModalAlert",isOpenModalAlert);

    // setUiToast({
    //   type: 'Success',
    //   message: 'The leave has been already created.',
    // });
    // router.push('/leaves');
  };

  const modalAlert = () => {
    return (
    <>
    <Modal isOpen={isOpenModalAlert}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
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
  }

  return <LeaveForm kind="create" onSubmit={createLeave}></LeaveForm>;
};

export default CreateLeave;
