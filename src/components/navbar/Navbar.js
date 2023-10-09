import React, { useState } from "react";
import {
  ShoppingCartOutlined,
  DashboardOutlined,
  PropertySafetyOutlined,
  TeamOutlined,
  LogoutOutlined,
  BankOutlined,
  DropboxOutlined,
  SnippetsOutlined,
  SafetyCertificateOutlined,
  PlusCircleOutlined,
  BarsOutlined,
  UserOutlined,
  KeyOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import Dashboard from "../dashboard/Dashboard";
import Items from "../items/Items";
import Category from "../category/Category";
import Elements from "../elements/Elements";
import WareHouse from "../warehouse/WareHouse";
import AddValue from "../elements/addvalue/AddValue";
import AddMembers from "../members/AddMembers";
import ManageProducts from "../products/ManageProducts";
import ManagePermission from "../permission/ManagePermission";
import ManageMember from "../members/ManageMember";
import AddProducts from "../products/AddProduct";
import AddPermission from "../permission/AddPermission";
import StoreKeeperPassword from "../storeKeeper/storeKeeperPassword/StoreKeeperPassword";
import StoreKeeperProfile from "../storeKeeper/storeKeeperProfile/StoreKeeperProfile";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Navbar = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      link: "/storeKeeper/dashboard",
    },
    {
      key: "2",
      icon: <ShoppingCartOutlined />,
      label: "Items",
      link: "/storeKeeper/items",
    },
    {
      key: "3",
      icon: <DropboxOutlined />,
      label: "Category",
      link: "/storeKeeper/category",
    },
    {
      key: "4",
      icon: <BankOutlined />,
      label: "Warehouse",
      link: "/storeKeeper/warehouse",
    },
    {
      key: "5",
      icon: <SnippetsOutlined />,
      label: "Elements",
      link: "/storeKeeper/element",
    },
    {
      key: "6",
      icon: <PropertySafetyOutlined />,
      label: "Products",
      subMenu: [
        {
          key: "6-1",
          label: "Add Products",
          link: "/storeKeeper/add-products",
          icon: <PlusCircleOutlined />,
        },
        {
          key: "6-2",
          label: "Manage Products",
          link: "/storeKeeper/manage-products",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "7",
      icon: <TeamOutlined />,
      label: "Members",
      subMenu: [
        {
          key: "7-1",
          label: "Add Members",
          link: "/storeKeeper/add-members",
          icon: <PlusCircleOutlined />,
        },
        {
          key: "7-2",
          label: "Manage Members",
          link: "/storeKeeper/manage-members",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "8",
      icon: <SafetyCertificateOutlined />,
      label: "Permission",
      subMenu: [
        {
          key: "8-1",
          label: "Add Permission",
          link: "/storeKeeper/add-permission",
          icon: <PlusCircleOutlined />,
        },
        {
          key: "8-2",
          label: "Manage Permission",
          link: "/storeKeeper/manage-permission",
          icon: <BarsOutlined />,
        },
      ],
    },
    {
      key: "9",
      icon: <UserOutlined />,
      label: "Profile",
      subMenu: [
        {
          key: "9-1",
          label: "Change Password",
          link: "/storeKeeper/storeKeeper-change-password",
          icon: <KeyOutlined />,
        },
        {
          key: "9-2",
          label: "Profile",
          link: "/storeKeeper/storeKeeper-profile",
          icon: <UserOutlined />,
        },
      ],
    },
    { key: "10", icon: <LogoutOutlined />, label: "Logout",link:"/" },
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
          <h3 style={{ color: "white", textAlign: "center" }}>
            Inventory Management
          </h3>
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
            {location.pathname === "/storeKeeper/dashboard" && <Dashboard />}
            {location.pathname === "/storeKeeper/items" && <Items />}
            {location.pathname === "/storeKeeper/category" && <Category />}
            {location.pathname === "/storeKeeper/warehouse" && <WareHouse />}
            {location.pathname === "/storeKeeper/element" && <Elements />}
            {location.pathname === "/storeKeeper/addvalue" && <AddValue />}
            {location.pathname === "/storeKeeper/add-members" && <AddMembers />}
            {location.pathname === "/storeKeeper/manage-products" && <ManageProducts/>}
            {location.pathname === "/storeKeeper/manage-permission" && <ManagePermission />}
            {location.pathname === "/storeKeeper/manage-members" && <ManageMember />}
            {location.pathname === "/storeKeeper/add-products" && <AddProducts />}
            {location.pathname === "/storeKeeper/add-permission" && <AddPermission />}
            {location.pathname === "/storeKeeper/storeKeeper-change-password" && <StoreKeeperPassword />}
            {location.pathname === "/storeKeeper/storeKeeper-profile" && <StoreKeeperProfile />}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Inventory Management ©2023 by Store Keeper
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
