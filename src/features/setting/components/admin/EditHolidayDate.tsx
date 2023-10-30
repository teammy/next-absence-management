import { api } from '~/utils/api';
import SettingHolidayDateForm from './SettingHolidayDateForm';
import { useRouter } from 'next/router';
import Loading from '~/features/ui/components/Loading';
import { type UpdateSettingHolidayInput }  from '../../types';

import React from 'react'

const EditHolidayDate = () => {
  const utils = api.useContext();
  const router = useRouter();

  const id = +(router.query.id as string);
const { mutateAsync: update } = api.admin.settingHoliday.updateHoliday.useMutation({
  onSuccess() {
    utils.admin.settingHoliday.byId.invalidate(id);
  },
});
const { data: settingholiday, isLoading } = api.admin.settingHoliday.byId.useQuery(id);
const editLeave = async (settingholiday: UpdateSettingHolidayInput['data']) => {
  await update({
    id,
    data: settingholiday,
  });
  router.push('/setting/holidayDate');
};

if (isLoading) return <Loading></Loading>;
if (!settingholiday) return <div>No data found.</div>;

  return (
    <SettingHolidayDateForm kind="edit" settingHoliday={settingholiday} onSubmit={editLeave}></SettingHolidayDateForm>
  )
}

export default EditHolidayDate