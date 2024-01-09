import React from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { Layout, Menu, theme, message } from "antd";
import { LOGOUT_ADMIN } from "../../../constants/actionTypes";
import Dashboard from "../dashboard/Dashboard";
import AddNew from "../employees/AddNew";
import AllEmployees from "../employees/AllEmployees";
import Profile from "../profile/Profile";
import AssetsCategory from "../assetsCategory/AssetsCategory";
import Ticket from "../ticket/Ticket";
import Assets from "../assets/Assets";
import { useDispatch } from "react-redux";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminLayout = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_ADMIN });
    console.log("User");
    message.success("Admin logout successfully!");
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/admin/dashboard",
    },

    {
      key: "2",
      icon: <TeamOutlined />,
      label: "Employees",
      subMenu: [
        {
          key: "2-1",
          label: "Add Employee",
          link: "/admin/add-employee",
          icon: <PlusCircleOutlined />,
        },
        {
          key: "2-2",
          label: "All Employees",
          link: "/admin/all-employees",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "3",
      icon: <PlusCircleOutlined />,
      label: "Assets Category",
      link: "/admin/assets-category",
    },
    {
      key: "4",
      icon: <PlusCircleOutlined />,
      label: "Assets(Items)",
      link: "/admin/assets",
    },
    {
      key: "5",
      icon: <BarsOutlined />,
      label: "Ticket",
      link: "/admin/admin-ticket",
    },
    {
      key: "6",
      icon: <UserOutlined />,
      label: "Profile",
      link: "/admin/admin-profile",
    },
    {
      key: "7",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ height: "100vh" }}
      >
        <div className="sider-header">
          <div className="demo-logo-vertical" />
          <h3 style={{ color: "white", textAlign: "center" }}>Admin</h3>
        </div>
        <Menu theme="dark" mode="inline">
          {menuItems.map((item) =>
            item.subMenu ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.subMenu.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    icon={subItem.icon}
                    style={{ paddingLeft: "30px" }}
                  >
                    <Link to={subItem.link}>{subItem.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}   onClick={item.key === "7" ? item.onClick : null}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              // minHeight: "calc(100vh - 48px)",
              background: colorBgContainer,
            }}
          >
            {location.pathname === "/admin/dashboard" && <Dashboard />}
            {location.pathname === "/admin/add-employee" && <AddNew />}
            {location.pathname === "/admin/all-employees" && <AllEmployees />}
            {location.pathname === "/admin/admin-profile" && <Profile />}
            {location.pathname === "/admin/assets-category" && (
              <AssetsCategory />
            )}
            {location.pathname === "/admin/admin-ticket" && <Ticket />}
            {location.pathname === "/admin/assets" && <Assets />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
