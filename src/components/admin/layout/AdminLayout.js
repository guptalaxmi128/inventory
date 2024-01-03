import React, { useState } from "react";
import {
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link,useLocation  } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import Dashboard from "../dashboard/Dashboard";
import AddNew from "../employees/AddNew";
import AllEmployees from "../employees/AllEmployees";
import Profile from "../profile/Profile";
import AssetsCategory from "../assetsCategory/AssetsCategory";
import Ticket from "../ticket/Ticket";
import Assets from "../assets/Assets";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminLayout = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

    { key: "6", icon: <LogoutOutlined />, label: "Logout", link:"/" },
  ];

  const [openKeys, setOpenKeys] = useState(["6"]);
  // console.log("Current pathname:", location.pathname);

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
            <h3 style={{ color: "white", textAlign: "center" }}>Admin</h3>
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
              margin: "24px 16px 0"
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 450,
                background: colorBgContainer,
              }}
            >
               {location.pathname === "/admin/dashboard" && <Dashboard />}
               {location.pathname === "/admin/add-employee" && <AddNew />}
               {location.pathname === "/admin/all-employees" && <AllEmployees/>}
               {location.pathname === "/admin/admin-profile" && <Profile/>}
               {location.pathname === "/admin/assets-category" && <AssetsCategory />}
               {location.pathname === "/admin/admin-ticket" && <Ticket />}
               {location.pathname === "/admin/assets" && <Assets />}
            </div>
          </Content>

          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Inventory Management ©2023
          </Footer>
        </Layout>
      </Layout>
   
  );
};

export default AdminLayout;
