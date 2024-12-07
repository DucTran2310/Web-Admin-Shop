import { COLORS } from "@/constants/colors";
import { auth } from "@/firebase/firebaseConfig";
import { authSelector, removeAuth } from "@/redux/reducers/authReducer";
import { Avatar, Button, Dropdown, Input, MenuProps, Space } from "antd"
import { signOut } from "firebase/auth";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {

  const user = useSelector(authSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userMenu: MenuProps['items'] = [
    {
      label: 'Logout',
      title: 'Logout',
      key: 'logout',
      onClick: async () => {
        await signOut(auth)
        navigate('/')
        await dispatch(removeAuth())
        localStorage.clear()
      }
    },
  ];

  return (
    <div className="p-2 row bg-white flex items-center justify-between">
      <div className="col w-[50%]">
        <Input
          placeholder="Search product, supplier, order..."
          style={{
            borderRadius: 100,
            width: '100%',
          }}
          size="large"
          prefix={<IoIosSearch className="text-muted" size={20} />}
        />
      </div>
      <div className="col text-right cursor-pointer">
        <Space>
          <Button type="text" icon={<IoIosNotificationsOutline size={22} color={COLORS.gray600} />} />
          <Dropdown menu={{ items: userMenu }}>

            <Avatar
              src={user?.photoUrl}
              size={40}
            />
          </Dropdown>
        </Space>
      </div>
    </div>
  )
}

export default HeaderComponent
