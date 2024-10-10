import store from "@/redux/store";
import Routers from "@/routers/Routers";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

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
      </Provider>
    </ConfigProvider>
  );
}

export default App;
