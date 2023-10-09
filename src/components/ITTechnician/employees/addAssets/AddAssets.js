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
  DatePicker,
  theme,
  Table,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./AddAssets.css"

const { Option } = Select;

const dataSource = [
  {
    key: "1",
    sno: 1,
    itemName: "Item 1",
    quantity: 10,
    issueDate: "2023-10-05",
    status: "Working",
  },
  {
    key: "2",
    sno: 2,
    itemName: "Item 2",
    quantity: 5,
    issueDate: "2023-10-06",
    status: "Not Working",
  },
];

const columns = [
  {
    title: "SNO",
    dataIndex: "sno",
    key: "sno",
  },
  {
    title: "Item Name",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Issue Date",
    dataIndex: "issueDate",
    key: "issueDate",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const AddAssets = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };
  const cellRender = React.useCallback((current, info) => {
    if (info.type !== "date") {
      return info.originNode;
    }
    if (typeof current === "number") {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Add Assets</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/ITTechnician/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Assets</Breadcrumb.Item>
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
          <Col xs={24} sm={12}>
            <Form.Item
              name="itemName"
              label="Item Name"
              rules={[
                {
                  required: true,
                  message: "Please enter item name",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Item name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please enter quantity",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Input placeholder="Quantity" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Issue Date" style={{ width: "100%" }}>
              <DatePicker cellRender={cellRender} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select gender",
                },
              ]}
              style={{ marginBottom: "12px" }}
              initialValue="Select Status"
            >
              <Select>
                <Option value="working">Working</Option>
                <Option value="notWorking">Not Working</Option>
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
      <div style={{ marginTop: "20px" }}>
      <h3>IT Assets</h3>
        <Table dataSource={dataSource} columns={columns} pagination={false}    className="center-table-data"/>
      </div>
    </div>
  );
};

export default AddAssets;
