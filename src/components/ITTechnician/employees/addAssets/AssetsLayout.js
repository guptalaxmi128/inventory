import React from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  KeyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import AddAssets from "./AddAssets";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const AssetsLayout = () => {
  const { attendanceId } = useParams();
  // console.log(attendanceId)

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

    { key: "5", icon: <LogoutOutlined />, label: "Logout", link: "/" },
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
              <Menu.Item key={item.key} icon={item.icon}>
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
            <AddAssets attendanceId={attendanceId} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AssetsLayout;
