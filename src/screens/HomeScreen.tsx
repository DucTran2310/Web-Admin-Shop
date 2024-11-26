import { handleAPI } from "@/apis/handleAPI"
import { EXPIRED_TOKEN } from "@/constants/appInfo"
import { authSelector, refreshToken, removeAuth } from "@/redux/reducers/authReducer"
import { Button } from "antd"
import { useDispatch, useSelector } from "react-redux"

const HomeScreen = () => {

  const dispatch = useDispatch()
  const auth = useSelector(authSelector)

  const getProducts = async () => {
    const api = '/product/get-products'

    try {
      const res = await handleAPI(api)

      console.log('VVVRES: ', res)
    } catch (error: any) {
      if (error.message === EXPIRED_TOKEN) {
        handleRefreshToken()
      }
    }
  }

  const handleRefreshToken = async () => {
    const api = `auth/refresh-token?id=${auth._id}`
    try {
      const res = await handleAPI(api)

      dispatch(refreshToken(res?.data.token))
    } catch (error) {
      console.log('VVVERR: ', error)
    }
  }

  return (
    <div>
      <Button onClick={() => dispatch(removeAuth())}>Logout</Button>
      <Button onClick={getProducts}>GET PRODUCT</Button>
    </div>
  )
}

export default HomeScreen