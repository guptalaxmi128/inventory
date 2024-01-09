import React from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, theme, message } from "antd";
import { useDispatch } from "react-redux";
import Dashboard from "../dashboard/Dashboard";
import Employees from "../employees/Employees";
import CheckTickets from "../checkTickets/CheckTickets";
import AddAssets from "../employees/addAssets/AddAssets";
import ChangePassword from "../changePassword/ChangePassword";
import Profile from "../technicianProfile/Profile";
import { LOGOUT_TECHNICIAN } from "../../../constants/actionTypes";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const ITLayout = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_TECHNICIAN });
    message.success("Technician logout successfully!");
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/ITTechnician/dashboard",
    },

    {
      key: "2",
      icon: <TeamOutlined />,
      label: "Employees",
      link: "/ITTechnician/employees",
    },
    {
      key: "3",
      icon: <SafetyCertificateOutlined />,
      label: "Check Tickets",
      link: "/ITTechnician/check-tickets",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Profile",
      subMenu: [
        {
          key: "4-1",
          label: "Profile",
          link: "/ITTechnician/profile",
          icon: <UserOutlined />,
        },
        {
          key: "4-2",
          label: "Change Password",
          link: "/ITTechnician/change-password",
          icon: <KeyOutlined />,
        },
      ],
    },

    {
      key: "5",
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
          <h3 style={{ color: "white", textAlign: "center" }}>IT Technician</h3>
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
              <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={item.key === "5" ? item.onClick : null}
              >
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}

        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 496,
              background: colorBgContainer,
            }}
          >
            {location.pathname === "/ITTechnician/dashboard" && <Dashboard />}
            {location.pathname === "/ITTechnician/employees" && <Employees />}
            {location.pathname === "/ITTechnician/check-tickets" && (
              <CheckTickets />
            )}
            {location.pathname === "/ITTechnician/add-assets" && <AddAssets />}
            {location.pathname === "/ITTechnician/change-password" && (
              <ChangePassword />
            )}
            {location.pathname === "/ITTechnician/profile" && <Profile />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ITLayout;
