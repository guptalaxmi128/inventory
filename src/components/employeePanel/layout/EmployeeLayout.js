import React from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  KeyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Layout, Menu, theme, message } from "antd";
import { useDispatch } from "react-redux";
import Dashboard from "../dashboard/Dashboard";
import Create from "../ticket/Create";
import MyTicket from "../ticket/MyTicket";
import EmployeePassword from "../employeePassword/EmployeePassword";
import EmployeeProfile from "../employeeProfile/EmployeeProfile";
import Assets from "../assets/Assets";
import { LOGOUT_EMPLOYEE } from "../../../constants/actionTypes";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const EmployeeLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch({ type: LOGOUT_EMPLOYEE });
    message.success("Employee logout successfully!");
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/employee/dashboard",
    },

    {
      key: "2",
      icon: <TeamOutlined />,
      label: "Ticket",
      subMenu: [
        {
          key: "2-1",
          label: "Create",
          link: "/employee/create-ticket",
          icon: <PlusCircleOutlined />,
        },
        {
          key: "2-2",
          label: "My Ticket",
          link: "/employee/my-ticket",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "3",
      icon: <DashboardOutlined />,
      label: "Assets",
      link: "/employee/assets",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Profile",
      subMenu: [
        {
          key: "4-1",
          label: "Profile",
          link: "/employee/employee-profile",
          icon: <UserOutlined />,
        },
        {
          key: "4-2",
          label: "Change Password",
          link: "/employee/employee-change-password",
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
          <h3 style={{ color: "white", textAlign: "center" }}>Employee</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
        >
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
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 450,
              background: colorBgContainer,
            }}
          >
            {location.pathname === "/employee/dashboard" && <Dashboard />}
            {location.pathname === "/employee/create-ticket" && <Create />}
            {location.pathname === "/employee/my-ticket" && <MyTicket />}
            {location.pathname === "/employee/employee-change-password" && (
              <EmployeePassword />
            )}
            {location.pathname === "/employee/employee-profile" && (
              <EmployeeProfile />
            )}
            {location.pathname === "/employee/assets" && <Assets />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeLayout;
