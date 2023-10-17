import LayoutNormal from '~/features/ui/components/layouts/LayoutNormal';
import { type NextPageWithLayout } from '../../../_app';
import ProtectedRoute from '~/features/auth/guards/ProtectedRoute';
import CreateHolidayDate from '~/features/setting/components/admin/CreateHolidayDate';

const CreateHolidayPage: NextPageWithLayout = () => {
  return (
    <ProtectedRoute roles={['ADMIN','HR']}>
      <CreateHolidayDate></CreateHolidayDate>
    </ProtectedRoute>
  );
};

CreateHolidayPage.getLayout = LayoutNormal;

export default CreateHolidayPage;
