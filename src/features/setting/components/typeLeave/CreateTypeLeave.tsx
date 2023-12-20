import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useAppStore } from '~/features/store';
import TypeLeaveForm from './typeLeaveForm';
import { type AddTypeLeaveSettingInput } from '../../types';

const CreateTypeLeave = () => {

  const utils = api.useUtils();
  const list = utils.typeleave.list;
  const router = useRouter();

  const createTypeLeave = async (typeLeave: AddTypeLeaveSettingInput) => {
    try {
      console.log("typeLeave",typeLeave);
      // await api.typeLeave.add.mutateAsync(typeLeave);
      // router.push('/setting/typeLeave');
    }
    catch (err) {
      console.log("Not add",err);
    }
  };

  return <TypeLeaveForm kind="create" onSubmit={createTypeLeave}></TypeLeaveForm>


};

export default CreateTypeLeave;