import { api } from '~/utils/api';
import { useAppStore } from '~/features/store';
import TypeLeaveForm from './typeLeaveForm';
import { type AddTypeLeaveSettingInput } from '../../types';

const CreateTypeLeave = () => {
  const setUiToast = useAppStore((state) => state.setUiToast);
  const utils = api.useUtils();
  const listType = utils.typeleave.list;
  const { mutate: add } = api.typeleave.add.useMutation({
    onSettled() {
      listType.invalidate();
    }
  })
  
  const createTypeLeave = async (typeLeave: AddTypeLeaveSettingInput) => {
    await add(typeLeave);
    setUiToast({
      type: 'Success',
      message: 'เพิ่มข้อมูลสำเร็จ',
    })
  };

  return <TypeLeaveForm kind="create" onSubmit={createTypeLeave}></TypeLeaveForm>

};

export default CreateTypeLeave;