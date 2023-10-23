import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import LeaveItem from './LeaveItem';
import FloatingActionButton from '~/features/ui/components/FloatingActionButton';
import { useRouter } from 'next/router';
import {Card, CardHeader, CardBody, CardFooter,CircularProgress} from "@nextui-org/react";

const LeaveList = () => {
  const router = useRouter();
  const { data: leaves, isLoading } = api.leave.list.useQuery(); // CSR

  if (isLoading) return <Loading></Loading>;
  if (!leaves) return <div>Not found.</div>;

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
       <Card>
      <CardBody>
        <p><CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            // indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold",
          }}
          value={70}
          strokeWidth={4}
          showValueLabel={true}
        /></p>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
      {leaves.map((leave) => (
        <LeaveItem key={leave.id} {...leave}></LeaveItem>
      ))}
      <FloatingActionButton onClick={() => router.push('/leaves/selectType')}>
        +
      </FloatingActionButton>
    </div>
  );
};

export default LeaveList;
