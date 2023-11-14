import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../_app';
import LeaveList from '~/features/leaves/components/LeaveList';
import { Card, CardBody,Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

const IndexPage: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-2 md:w-1/3">
          <Card className="border-1 border-[#f68b1f] drop-shadow-md h-[100px]">
            <CardBody className="text-[#002d63]">
              <p className="text-2xl font-bold">
                ลาพักผ่อน
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="flex-1 p-2 md:w-1/3 ">
          <Card className="border-1 border-[#f68b1f] drop-shadow-md">
            <CardBody className=" text-[#002d63]">
              <p></p>
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="flex-1 p-2 md:w-1/3 ">
          <Card className="border-1 border-[#f68b1f] drop-shadow-md">
            <CardBody className="text-[#002d63]">
              <p>
                Make beautiful websites regardless of your design experience.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
      {/* <LeaveList></LeaveList> */}
      <Button onPress={() => router.push('/leaves/selectType')}>
        เขียนใบลา
      </Button>
    </>
  );
};

IndexPage.getLayout = Layout;

export default IndexPage;
