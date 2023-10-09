import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Button, Input, Form, Select, Row, Col, Space } from "antd";
// import JoditEditor from "jodit-react";
import { HomeOutlined, UploadOutlined } from "@ant-design/icons";
// import 'jodit-react/examples/app.css';

const { Option } = Select;

const AddProducts = () => {
  const [form] = Form.useForm();//Description not added

  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef(null);
  const editor = useRef(null);

  useEffect(() => {
    if (editor.current) {
      editor.current.workplace.style.height = "300px";
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Add New Products</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
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
              value={imageName || ""}
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
              name="productName"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the product name",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Please enter the price",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Enter price" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="qty"
              label="Qty"
              rules={[
                {
                  required: true,
                  message: "Please enter qty",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Enter qty" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="color"
              label="Color"
              rules={[
                {
                  required: true,
                  message: "Please select color",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select Color"
            >
              <Select>
                <Option value="yellow">Yellow</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="size"
              label="Size"
              rules={[
                {
                  required: true,
                  message: "Please select size",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select size"
            >
              <Select>
                <Option value="small">Small</Option>
                <Option value="medium">Medium</Option>
                <Option value="large">Large</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={16}>
          <Col xs={24} sm={12}>
            <h1>Jodit Editor Example</h1>
            <JoditEditor
              ref={editor}
              config={{
                readonly: false,
                toolbarButtonSize: "large",
              }}
            />
          </Col>
        </Row> */}

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please select category",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select category"
            >
              <Select>
                <Option value="category1">Category1</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="element"
              label="Element"
              rules={[
                {
                  required: true,
                  message: "Please select element",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select element"
            >
              <Select>
                <Option value="element1">Element1</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="item"
              label="Items"
              rules={[
                {
                  required: true,
                  message: "Please select item",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select item"
            >
              <Select>
                <Option value="item1">Item1</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="warehouse"
              label="Warehouse"
              rules={[
                {
                  required: true,
                  message: "Please select warehouse",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select warehouse"
            >
              <Select>
                <Option value="warehouse">Warehouse</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="availability"
              label="Availability"
              rules={[
                {
                  required: true,
                  message: "Please select availability",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select availability"
            >
              <Select>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="remarkText"
              label="Remark Text (if any)"
              rules={[
                {
                  required: true,
                  message: "Please enter remark text",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Enter remark" />
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

export default AddProducts;
