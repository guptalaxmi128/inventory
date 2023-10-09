import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Input, Form, Select, Row, Col, Space } from "antd";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicketById } from "../../../../actions/itTechnician/myTicket/myTicket";

const { Option } = Select;

const AddPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const myticket = useSelector((state) => state.technicianTicket.ticket);


  useEffect(() => {
    dispatch(getTicketById(id));
  }, [dispatch]);

  console.log(myticket);
  const [form] = Form.useForm();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    console.log("myticket:", myticket)
    if (myticket) {
      console.log("Setting subject:", myticket.data.subject)
      setSubject(myticket.data.subject);
      setTicketCategory(myticket.data.ticketCategory);
      setStatus(myticket.data.status);
      setReply(myticket.data.reply);
    }
  }, [myticket]);

  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleTicketChange = (value) => {
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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Add</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/ITTechnician/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add</Breadcrumb.Item>
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
            />
            <Input
              placeholder="Upload an image"
              readOnly
              value={selectedFiles || ""}
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
              // name="subject"
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
               placeholder="Enter subject" value={subject} 
               onChange={(e) => setSubject(e.target.value)}
              
               />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
          <Form.Item
             
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
              <Select value={ticketCategory} onChange={handleTicketChange}>
                <Option value="Category1">Category 1</Option>
                <Option value="Category2">Category 2</Option>
              </Select>
          </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* <Form.Item
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
              <Select>
                <Option value="category1">Category1</Option>
              </Select>
            </Form.Item> */}
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
              <Input placeholder="Enter Department" value={department} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              // name="changeStatus"
              label="Change Status"
              rules={[
                {
                  required: true,
                  message: "Please select an option",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select change status"
            >
              <Select value={status} onChange={handleStatusChange}>
                <Option value="CREATED">CREATED</Option>
                <Option value="ONGOING">ONGOING</Option>
                <Option value="RESOLVED">RESOLVED</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              // name="reply"
              label="Reply"
              rules={[
                {
                  required: true,
                  message: "Please enter reply",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input
                placeholder="Enter reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
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

export default AddPage;
