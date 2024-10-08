import AuthRouter from "@/routers/AuthRouter";
import MainRouter from "@/routers/MainRouter";

const Routers = () => {
  return 1 > 2 ? <MainRouter /> : <AuthRouter />;
};

export default Routers;
