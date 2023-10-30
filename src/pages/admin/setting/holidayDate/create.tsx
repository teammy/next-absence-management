import LayoutNormal from '~/features/ui/components/layouts/LayoutNormal';
import { type NextPageWithLayout } from '../../../_app';
import ProtectedRoute from '~/features/auth/guards/ProtectedRoute';
import CreateHolidayDate from '~/features/setting/components/admin/CreateHolidayDate';
import Layout from '~/features/ui/components/layouts/Normal';
import { Card, CardBody } from '@nextui-org/react';

const CreateHolidayPage: NextPageWithLayout = () => {
  return (
    <ProtectedRoute roles={['ADMIN','HR']}>
      <Card>
      <CardBody>

      <CreateHolidayDate></CreateHolidayDate>
      </CardBody>
      </Card>
    </ProtectedRoute>
  );
};

CreateHolidayPage.getLayout = Layout;

export default CreateHolidayPage;
