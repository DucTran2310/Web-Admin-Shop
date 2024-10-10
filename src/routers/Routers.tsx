import { localDataNames } from "@/constants/appInfo";
import { addAuth, AuthData, authSelector } from "@/redux/reducers/authReducer";
import AuthRouter from "@/routers/AuthRouter";
import MainRouter from "@/routers/MainRouter";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Routers = () => {

  const dispatch = useDispatch()

  const auth: AuthData = useSelector(authSelector)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  const getData =  () => {
    const res = localStorage.getItem(localDataNames.authData)
    res && dispatch(addAuth(JSON.parse(res)))
  }

  return isLoading ? <Spin /> : auth.token !== '' ? <MainRouter /> : <AuthRouter />;
};

export default Routers;
