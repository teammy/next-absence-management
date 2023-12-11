import React from 'react'
import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../_app';

type Props = {}

const HomePage:NextPageWithLayout = () => {
  return (
    <div>DashboardPage</div>
  )
}
HomePage.getLayout = Layout;
export default HomePage