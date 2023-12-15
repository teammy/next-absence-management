import MyLeaveList from "~/features/leaves/components/MyLeaveList"
import Layout from "~/features/ui/components/layouts/Normal"


const IndexPage = () => {
  return <MyLeaveList></MyLeaveList>
}

IndexPage.getLayout = Layout

export default IndexPage