import { api } from "~/utils/api";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";

// export interface LeaveDetailsProps {
//   leaveid : LeaveDetails['id'];
// }

const LeaveDetails = () => {
  const router = useRouter();
  const leaveId =  router.query.leaveid;
  const { data: detailleave, isLoading } = api.leave.byId.useQuery(
    Number(leaveId)
  );

  if (isLoading) return <Loader color="#1A477F" type="dots" />;
  if (!detailleave) return <div>No data found</div>;

  return <div>Leave Details</div>;
};

export default LeaveDetails;
