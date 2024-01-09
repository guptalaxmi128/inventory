import React, { useState } from "react";
import { Breadcrumb, Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import TechnicianProfile from "./TechnicianProfile";
import MyAssets from "./MyAssets";

const { TabPane } = Tabs;

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Profile</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/ITTechnician/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Personal Info" key="personalInfo">
          <TechnicianProfile />
        </TabPane>
        <TabPane tab="My Assets" key="myAssets">
            <MyAssets />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Profile;
