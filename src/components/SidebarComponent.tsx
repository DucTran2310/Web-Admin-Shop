import { Layout, Menu, MenuProps, Typography } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineInventory2 } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BsBox2 } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { COLORS } from "@/constants/colors";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;
const { Text } = Typography

const SidebarComponent = () => {
  const items: MenuItem[] = [
    {
      key: "DashBoard",
      label: <Link to={"/"}>DashBoard</Link>,
      icon: <AiOutlineHome size={20} />,
    },
    {
      key: "Inventory",
      label: <Link to={"/inventory"}>Inventory</Link>,
      icon: <MdOutlineInventory2 size={20} />,
    },
    {
      key: "Reports",
      label: <Link to={"/reports"}>Reports</Link>,
      icon: <HiOutlineDocumentReport size={20} />,
    },
    {
      key: "Suppliers",
      label: <Link to={"/suppliers"}>Supplier</Link>,
      icon: <HiOutlineUserCircle size={20} />,
    },
    {
      key: "Orders",
      label: <Link to={"/orders"}>Orders</Link>,
      icon: <BsBox2 size={20} />,
    },
    {
      key: "Manage Store",
      label: <Link to={"/manage-store"}>Manage Store</Link>,
      icon: <GoTasklist size={20} />,
    },
  ];

  return (
    <Sider theme="light">
      <div className="p-2 flex items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/admin-shop-6e6a7.appspot.com/o/Logo_sm.png?alt=media&token=a27b16b6-a1ee-4beb-9faa-556788856b52"
          width={48}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: COLORS.primary500,
            margin: 0
          }}
        >
          KANBAN
        </Text>
      </div>
      <Menu items={items} theme="light" />
    </Sider>
  );
};

export default SidebarComponent;
