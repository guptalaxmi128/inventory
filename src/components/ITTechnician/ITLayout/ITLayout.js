import React, { useState } from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined,
  KeyOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import Dashboard from "../dashboard/Dashboard";
import Employees from "../employees/Employees";
import CheckTickets from "../checkTickets/CheckTickets";
import AddAssets from "../employees/addAssets/AddAssets";
import ChangePassword from "../changePassword/ChangePassword";
import TechnicianProfile from "../technicianProfile/TechnicianProfile";
// import AddPage from "../checkTickets/addPage/AddPage";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ITLayout = () => {
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          label: "Change Password",
          link: "/ITTechnician/change-password",
          icon: <KeyOutlined />,
        },
        {
          key: "4-2",
          label: "Profile",
          link: "/ITTechnician/profile",
          icon: <UserOutlined />,
        },
      ],
    },

    { key: "5", icon: <LogoutOutlined />, label: "Logout",link:"/" },
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
          <h3 style={{ color: "white", textAlign: "center" }}>IT Technician</h3>
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
              minHeight:496,
              background: colorBgContainer,
            }}
          >
            {location.pathname === "/ITTechnician/dashboard" && <Dashboard />}
            {location.pathname === "/ITTechnician/employees" && <Employees />}
            {location.pathname === "/ITTechnician/check-tickets" && (
              <CheckTickets />
            )}
            {location.pathname === "/ITTechnician/add-assets" && <AddAssets />}
            {location.pathname === "/ITTechnician/change-password" && <ChangePassword />}
            {location.pathname === "/ITTechnician/profile" && <TechnicianProfile />}
            {/* {location.pathname.startsWith('/ITTechnician/add-page') && <AddPage />} */}

          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Inventory Management ©2023 Created by IT Technician
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ITLayout;
