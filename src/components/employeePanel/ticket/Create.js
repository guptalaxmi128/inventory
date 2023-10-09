import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Form,
  Select,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addMyTicket } from "../../../actions/employee/myTicket/myTicket";

const { Option } = Select;

const Create = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [subject, setSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [details, setDetails] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleCategory = (value) => {
    setTicketCategory(value);
  };

  const fileInputRef = React.createRef();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length < 1) {
      alert("Please select at least 1 file.");
      return;
    }

    if (files.length > 10) {
      alert("Please select  10 files.");
      return;
    }

    const fileList = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      fileList.push(file);
    }
    console.log(fileList);
    setSelectedFiles(fileList);
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("details", details);
    formData.append("ticketCategory", ticketCategory);
    selectedFiles.forEach((file) => {
      formData.append(`attachment`, file);
    });
    await dispatch(addMyTicket(formData));
    setSuccessMsg(true);
    message.success("Ticket added successfully");

    form.resetFields();
    setSelectedFiles([]);
    setTimeout(() => {
      setSuccessMsg(false);
    }, 2000);
  };

 

 
  return (
    <div>
      {successMsg && (
        <div style={{ color: "green" }}>Ticket added successfully</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Create</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/employee/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
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
            <label htmlFor="imageInput">Image Upload</label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="imageInput"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              min="1"
              max="12"
            />
            <Input
              placeholder="Upload image(s)"
              readOnly
              value={
                selectedFiles.length === 0
                  ? ""
                  : `${selectedFiles.length} file(s) selected`
              }
              onClick={handleClick}
              suffix={<UploadOutlined />}
              style={{
                cursor: "pointer",
                width: "100%",
                padding: "4px 11px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                backgroundColor: "#fff",
                fontSize: "14px",
                marginTop: "8px",
              }}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="subject"
              label="Subject"
              rules={[
                {
                  required: true,
                  message: "Please enter subject",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="details"
              label="Detail"
              rules={[
                {
                  required: true,
                  message: "Please enter detail",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter detail"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="ticketCategory"
              label="Ticket Category"
              rules={[
                {
                  required: true,
                  message: "Please select ticket category",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select ticket category"
            >
              <Select value={ticketCategory} onChange={handleCategory}>
                <Option value="category1">Category1</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save & Close
            </Button>
            <Link to={"/employee/dashboard"} style={{textDecoration:'none'}}>
            <Button type="default" htmlType="button">
              Back
            </Button>
            </Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
