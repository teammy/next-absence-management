import LayoutNormal from '~/features/ui/components/layouts/LayoutNormal';
import { type NextPageWithLayout } from '../_app';
import ProtectedRoute from '~/features/auth/guards/ProtectedRoute';
import HolidayList from '~/features/setting/components/holiday/HolidayList';

const SettingHolidayPage: NextPageWithLayout = () => {
  return (
    <ProtectedRoute roles={['ADMIN','HR']}>
      <HolidayList></HolidayList>
    </ProtectedRoute>
  );
};

SettingHolidayPage.getLayout = LayoutNormal;

export default SettingHolidayPage;
