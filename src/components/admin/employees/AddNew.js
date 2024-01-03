import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Form,
  Row,
  Col,
  Space,
  Select,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addMember } from "../../../actions/addMember/addMember";

const { Option } = Select;

const AddNew = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("Select Post");
  const [attendanceId, setAttendanceId] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [form] = Form.useForm();

  const handlePostChange = (value) => {
    setPost(value);
  };

  const validateMobileNumber = (_, value) => {
    if (value && !/^\d{10}$/.test(value)) {
      return Promise.reject(new Error("Mobile number must have 10 digits"));
    }
    return Promise.resolve();
  };

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
      const member = {
        name,
        mobileNumber,
        email,
        post,
        department,
        attendanceId,
        password,
      };
      // console.log(member);
      const res = await dispatch(addMember(member));
      if (res.success) {
        message.success(res.message);
        setSuccessMsg(true)
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
        <div style={{ color: "green" }}>User registered successfully</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Add New Employee</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Employee</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: "100%", margin: "0 auto" }}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter name",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
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
              <Input
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[
                {
                  required: true,
                  message: "Please enter a mobile number",
                },
                {
                  validator: validateMobileNumber,
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="department"
              label="Department"
              rules={[
                {
                  required: true,
                  message: "Please enter department",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="post"
              label="Post"
              rules={[
                {
                  required: true,
                  message: "Please select post",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select Post"
            >
              <Select value={post} onChange={handlePostChange}>
                <Option value="EMPLOYEE">Employee</Option>
                <Option value="STORE KEEPER">Store Keeper</Option>
                <Option value="IT TECHNICIAN">IT Technician</Option>
                <Option value="INSTRUCTOR">Instructor</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="attendanceId"
              label="Attendance Id"
              rules={[
                {
                  required: true,
                  message: "Please enter Attendance Id",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter Attendance Id"
                value={attendanceId}
                onChange={(e) => setAttendanceId(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  validator: validatePassword,
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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

export default AddNew;
