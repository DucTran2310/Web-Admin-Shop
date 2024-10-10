import { AuthData, authSelector } from "@/redux/reducers/authReducer";
import AuthRouter from "@/routers/AuthRouter";
import MainRouter from "@/routers/MainRouter";
import { useDispatch, useSelector } from "react-redux";

const Routers = () => {

  const dispatch = useDispatch()

  const auth: AuthData = useSelector(authSelector)

  return !auth.token ? <MainRouter /> : <AuthRouter />;
};

export default Routers;
