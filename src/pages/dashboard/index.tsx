import React from 'react'
import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../_app';

type Props = {}

const DashboardPage:NextPageWithLayout = () => {
  return (
    <div>DashboardPage</div>
  )
}
DashboardPage.getLayout = Layout;
export default DashboardPage