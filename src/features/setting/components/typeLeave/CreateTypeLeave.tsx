import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useAppStore } from '~/features/store';
import TypeLeaveForm from './typeLeaveForm';
import { type AddTypeLeaveSettingInput } from '../../types';

const CreateTypeLeave = () => {

  const utils = api.useUtils();
  const list = utils.typeleave.list;
  const router = useRouter();
  const { mutate: add } = api.typeleave.add.useMutation({
    onSuccess(status) {
      if(status) {
        
      }
    }
  })
  

  const createTypeLeave = async (typeLeave: AddTypeLeaveSettingInput) => {
    try {
      await add(typeLeave)
      // router.push('/setting/typeLeave');
    }
    catch (err) {
      console.log("Not add",err);
    }
  };

  return <TypeLeaveForm kind="create" onSubmit={createTypeLeave}></TypeLeaveForm>


};

export default CreateTypeLeave;