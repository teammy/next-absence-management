import MyLeaveDetails from "~/features/leaves/components/MyLeaveDetails"
import Layout from "~/features/ui/components/layouts/Normal"


const DetailsLeavePage = () => {
  
  return (
      <MyLeaveDetails />
  )
}

DetailsLeavePage.getLayout = Layout;

export default DetailsLeavePage;