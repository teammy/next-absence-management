import React from 'react'
import { useRouter } from 'next/router'
import CreateLeave from '~/features/leaves/components/CreateLeave'
import {type NextPageWithLayout } from '~/pages/_app'
import Layout from '~/features/ui/components/layouts/Normal';
import { Card,CardBody,CardHeader } from '@nextui-org/react';

type Props = {}

const IndexCreateLeave:NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
    <Card>
      <CardHeader className="text-xl font-semibold">สร้างใบลาประเภท {slug}</CardHeader>
      <CardBody>
    <CreateLeave/>
      </CardBody>
    </Card>
    </>
  )
}

IndexCreateLeave.getLayout = Layout;

export default IndexCreateLeave