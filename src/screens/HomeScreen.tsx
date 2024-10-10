import { removeAuth } from "@/redux/reducers/authReducer"
import { Button } from "antd"
import { useDispatch } from "react-redux"

const HomeScreen = () => {

  const dispatch = useDispatch()

  return (
    <div>
      <Button onClick={() => dispatch(removeAuth())}>Logout</Button>
    </div>
  )
}

export default HomeScreen