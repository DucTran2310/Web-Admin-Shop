import SidebarComponent from "@/components/SiderComponent";
import { HomeScreen, Inventory, ManageStore, Orders, ReportScreen, Suppliers } from "@/screens";
import { RouteConfig } from "@/types/RouteConfigType";
import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const { Content, Header, Footer } = Layout;

export const ROUTES: RouteConfig[] = [
  { path: "/", element: <HomeScreen /> },
  { path: "/inventory", element: <Inventory /> },
  { path: "/reports", element: <ReportScreen /> },
  { path: "/suppliers", element: <Suppliers /> },
  { path: "/orders", element: <Orders /> },
  { path: "/manage-store", element: <ManageStore /> },
];

const MainRouter: React.FC = () => (
  <BrowserRouter>
    <Layout className="h-[100vh]">
      <SidebarComponent />
      <Layout>
        <Header />
        <Content className="p-4">
          <Routes>
            {ROUTES.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  </BrowserRouter>
);

export default MainRouter;