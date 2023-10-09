import React, { useState } from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  KeyOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import Dashboard from "../dashboard/Dashboard";
import Create from "../ticket/Create";
import MyTicket from "../ticket/MyTicket";
import EmployeePassword from "../employeePassword/EmployeePassword";
import EmployeeProfile from "../employeeProfile/EmployeeProfile";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const EmployeeLayout = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      icon: <UserOutlined />,
      label: "Profile",
      subMenu: [
        {
          key: "3-1",
          label: "Change Password",
          link: "/employee/employee-change-password",
          icon: <KeyOutlined />,
        },
        {
          key: "3-2",
          label: "Profile",
          link: "/employee/employee-profile",
          icon: <UserOutlined />,
        },
      ],
    },

    { key: "4", icon: <LogoutOutlined />, label: "Logout", link:"/" },
  ];

  const [openKeys, setOpenKeys] = useState(["6"]);

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
      >
        <div className="sider-header">
          <div className="demo-logo-vertical" />
          <h3 style={{ color: "white", textAlign: "center" }}>Employee</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
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
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />

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
            {location.pathname === "/employee/employee-change-password" && <EmployeePassword />}
            {location.pathname === "/employee/employee-profile" && <EmployeeProfile />}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Inventory Management ©2023 Created by Tech Astute
        </Footer>
      </Layout>
    </Layout>
  );
};

export default EmployeeLayout;
