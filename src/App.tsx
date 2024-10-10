import store from "@/redux/store";
import Routers from "@/routers/Routers";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorTextHeading: '#1570EF'
        },
        components: {},
      }}
    >
      <Provider store={store}>
        <Routers />
        <ToastContainer />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
