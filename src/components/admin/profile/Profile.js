import React, { useState, useEffect } from "react";
import { Form, Input, Breadcrumb, Row, Col, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { getAdminProfile } from "../../../actions/admin/profile/profile";

const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.adminProfile.admin);
  //  console.log(profile)

  useEffect(() => {
    if (profile && profile.data) {
      setName(profile.data.name);
      setMobileNumber(profile.data.mobileNumber);
      setPost(profile.data.post);
      setEmail(profile.data.email);
    }
  }, [profile]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getAdminProfile());
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Profile</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/admin/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="small" />
        </div>
      ) : (
        <Form layout="vertical" style={{ maxWidth: "100%", margin: "0 auto" }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} style={{ width: "200px" }}>
              <Form.Item label="Name">
                <Input value={name} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ width: "200px" }}>
              <Form.Item label="Email">
                <Input value={email} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} style={{ width: "200px" }}>
              <Form.Item label="Mobile Number">
                <Input value={mobileNumber} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} style={{ width: "200px" }}>
              <Form.Item label="Post">
                <Input value={post} />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
          <Col xs={24} sm={12} style={{ width: "200px" }}>
            <Form.Item label="Department">
              <Input value={department} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ width: "200px" }}>
            <Form.Item label="Attendance Id">
              <Input value={attendanceId} />
            </Form.Item>
          </Col>
         
        </Row> */}
        </Form>
      )}
    </div>
  );
};

export default Profile;
