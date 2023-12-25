import { useParams } from "next/navigation"

type Props = {}

const EditTypeLeavePage = (props: Props) => {
  const { typeLeaveId } = useParams()
  console.log(typeLeaveId);
  return (
    <div>EditTypeLeavePage</div>
  )
}

export default EditTypeLeavePage