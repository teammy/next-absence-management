import React from 'react'
import { useRouter } from 'next/router'
import CreateLeave from '~/features/leaves/components/CreateLeave'
import {type NextPageWithLayout } from '~/pages/_app'
import Layout from '~/features/ui/components/layouts/Normal';
import { Card,CardBody,CardHeader,Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';

type Props = {}

const IndexCreateLeave:NextPageWithLayout = () => {

  return (
    <>

    <Breadcrumbs size="lg">
      <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
      <BreadcrumbItem>เขียนใบลา</BreadcrumbItem>
    </Breadcrumbs>

    <div className="head-title my-5">
      <h2 className="text-2xl Ekachon_Bold blueDark">เขียนใบขอลา</h2>
    </div>
    
    <Card classNames={{ header: 'justify-center' }}>
      <CardBody>
    <CreateLeave/>
      </CardBody>
    </Card>
    </>
  )
}

IndexCreateLeave.getLayout = Layout;

export default IndexCreateLeave