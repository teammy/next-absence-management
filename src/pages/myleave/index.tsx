import { type GetServerSideProps } from 'next';
import MyLeaveList from "~/features/leaves/components/MyLeaveList"
import Layout from "~/features/ui/components/layouts/Normal"
import { generateServerSideHelper } from "~/server/shared/serverSideHelper"
import { useSession } from 'next-auth/react';


const IndexPage = () => {
  return <MyLeaveList></MyLeaveList>
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   // const { data: session } = useSession();
//   // const userId = session?.user.user_id ? session?.user.user_id : 0;

//   const helper = generateServerSideHelper();
//   await helper.leave.listItemsForUser.prefetch(13);

//   return {
//     props: {
//       trpcState: helper.dehydrate(),
//     },
//   };
// };

IndexPage.getLayout = Layout

export default IndexPage