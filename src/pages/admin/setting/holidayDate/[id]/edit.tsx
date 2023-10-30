import React from 'react'
import Link from 'next/link'
import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../../../../_app';
import { useRouter } from 'next/router'
import EditHolidayDate from '~/features/setting/components/admin/EditHolidayDate'
import { Card,CardBody } from '@nextui-org/react';

type Props = {}

const EditSettingHoliday : NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Card>
      <CardBody>
      <EditHolidayDate></EditHolidayDate>
        </CardBody>
    </Card>
  )
}

EditSettingHoliday.getLayout = Layout;

export default EditSettingHoliday