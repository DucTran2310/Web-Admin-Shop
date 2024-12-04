import { HeaderComponent, SidebarComponent } from "@/components";
import { HomeScreen, Inventory, ManageStore, Orders, ReportScreen, Suppliers } from "@/screens";
import { RouteConfig } from "@/types/RouteConfigType";
import { Affix, Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const { Content, Footer } = Layout;

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
    <Layout>
      <Affix offsetTop={0}>
        <SidebarComponent />
      </Affix>
      <Layout>
        <Affix offsetTop={0}>
          <HeaderComponent />
        </Affix>
        <Content className="my-4 mx-8 container bg-white">
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