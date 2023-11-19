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
    <div className="my-5">
    <Breadcrumbs size="lg">
      <BreadcrumbItem>หน้าแรก</BreadcrumbItem>
      <BreadcrumbItem>เขียนคำขอลา</BreadcrumbItem>
    </Breadcrumbs>

    </div>
    
    <Card classNames={{ header: 'justify-center' }}>
      <CardHeader className="text-2xl blueDark mlp_bold" >คำขอลา</CardHeader>
      <CardBody>
    <CreateLeave/>
      </CardBody>
    </Card>
    </>
  )
}

IndexCreateLeave.getLayout = Layout;

export default IndexCreateLeave