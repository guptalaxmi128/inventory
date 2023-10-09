import React, { useState } from "react";
import { Breadcrumb, Button, Input, Form, Select, Row, Col,Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddMembers = () => {

  const [form] = Form.useForm();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Add New Member</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Member</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: "100%", margin: "0 auto" }}
        onFinish={(values) => {
          // Handle form submission here
          console.log(values);
        }}
      >
        <Row gutter={16} >
        <Col xs={24} sm={12}>
            <Form.Item
              name="permission"
              label="Permission"
              rules={[
                {
                  required: true,
                  message: "Please select a permission",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select Permission"
            >
              <Select>
                
                <Option value="abc">abc</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the first name",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
       
        </Row>
        <Row gutter={16}>
         
        <Col xs={24} sm={12}>
            <Form.Item
              name="userName"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the user name",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the last name",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter an email",
                  type: "email",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input  placeholder="email"/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please enter a mobile number",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input  placeholder="Mobile Number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter a password",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input.Password  placeholder="Password" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              style={{ marginBottom: "12px" }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password   placeholder="Confirm Password"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select gender",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select gender"
            >
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
         
        </Row>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save & Close
            </Button>
            <Button type="default" htmlType="button">
              Back
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddMembers;
