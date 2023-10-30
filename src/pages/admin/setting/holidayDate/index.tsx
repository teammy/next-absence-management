import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../../../_app';
import SettingHolidayList from '~/features/setting/components/admin/SettingHolidayList';


const IndexPage: NextPageWithLayout = () => {
  return (
  <SettingHolidayList></SettingHolidayList>
  );
};

IndexPage.getLayout = Layout;

export default IndexPage;
