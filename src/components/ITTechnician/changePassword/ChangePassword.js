import React, { useState } from "react";
import { Form, Input, Button, message, Breadcrumb, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { changePasswordTechnician } from "../../../actions/itTechnician/changePassword/changePassword";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const validatePassword = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters long")
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    console.log("Received value", values);
    try {
      const data = {
        currentPassword: password,
        newPassword,
      };
      const res = await dispatch(changePasswordTechnician(data));
      if (res.success) {
        message.success(res.message);
        setSuccessMsg(true);
        form.resetFields();
        setTimeout(() => {
          setSuccessMsg(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <div>
      {successMsg && (
        <div style={{ color: "green" }}>Password change successfully</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Change Password</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/ITTechnician/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Change Password</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: "100%", margin: "0 auto" }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} style={{ width: "200px" }}>
            <Form.Item
              label="Current Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password
                placeholder="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ width: "200px" }}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter yournew password" },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
