import { api } from '~/utils/api';
import LeaveForm from './LeaveForm';
import { useRouter } from 'next/router';
import Loading from '~/features/ui/components/Loading';
import { type UpdateLeaveInput } from '../types';

const EditLeave = () => {
  const utils = api.useUtils();

  const router = useRouter();
  const leaveId = +(router.query.leaveid as string);
  const { mutateAsync: update } = api.leave.update.useMutation({
    onSuccess() {
      utils.leave.byId.invalidate(leaveId);
    },
  });

  const { data: leave, isLoading } = api.leave.byId.useQuery(leaveId);
  const editLeave = async (leave: UpdateLeaveInput['data']) => {
    await update({
      id:leaveId,
      data: leave,
    });
    router.push('/myleave');
  };

  if (isLoading) return <Loading></Loading>;
  if (!leave) return <div>No leave data found.</div>;

  return <LeaveForm kind="edit" leave={leave} onSubmit={editLeave}></LeaveForm>;
};

export default EditLeave;
