import { api } from '~/utils/api';
import TypeLeaveForm from './typeLeaveForm';
import { useRouter } from 'next/router';
import { type UpdateTypeLeaveSettingInput } from '../../types';

const EditTypeLeave = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const typeLeaveId = +(router.query.id as string);
  const { mutateAsync: update } = api.typeleave.update.useMutation({
    onSuccess() {
      utils.typeleave.byId.invalidate(typeLeaveId);
    },
  });
  const { data: typeLeave, isLoading } = api.typeleave.byId.useQuery(typeLeaveId);
  const editTypeLeave = async (typeLeave: UpdateTypeLeaveSettingInput['data']) => {
    await update({
      id:typeLeaveId,
      data: typeLeave,
    });
    router.push('/setting/typeLeave');
  };
  if (isLoading) return <div>Loading...</div>;
  if (!typeLeave) return <div>No typeLeave data found.</div>;

  return <TypeLeaveForm kind="edit" typeLeave={typeLeave} onSubmit={editTypeLeave}></TypeLeaveForm>;
};

export default EditTypeLeave;