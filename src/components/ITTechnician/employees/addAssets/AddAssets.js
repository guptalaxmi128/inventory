import React, { useState,useEffect } from "react";
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
  message
} from "antd";
import { useDispatch} from 'react-redux';
import { HomeOutlined } from "@ant-design/icons";
import { getAssetsCategoryStore } from "../../../../actions/storeKeeper/assetsCategory/assetsCategory";
import "./AddAssets.css";

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

const AddAssets = (props) => {
  const { attendanceId } = props;
  const dispatch =useDispatch();
  // console.log(attendanceId)
  const [selectedDate, setSelectedDate] = useState(null);
  const [assetsData,setAssetsData]=useState([]);
  const [loading,setLoading]=useState(true);

  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };
  // const cellRender = React.useCallback((current, info) => {
  //   if (info.type !== "date") {
  //     return info.originNode;
  //   }
  //   if (typeof current === "number") {
  //     return <div className="ant-picker-cell-inner">{current}</div>;
  //   }
  //   return (
  //     <div
  //       className="ant-picker-cell-inner"
  //       style={current.date() === 1 ? style : {}}
  //     >
  //       {current.date()}
  //     </div>
  //   );
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAssetsCategoryStore());
        setAssetsData(result.data);
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
            <Form.Item label="Issue Date" style={{ width: "100%" }} name="date"
            rules={[
                {
                  required: true,
                  message: "Please select date",
                },
              ]} >
              {/* <DatePicker cellRender={cellRender} style={{ width: "100%" }} /> */}
              <DatePicker
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                setSelectedDate(dateString);
              }}
              format="YYYY-MM-DD"
            />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
          <Form.Item
            label="Assets Category"
            name="assetCategory"
            rules={[{ required: true, message: "Please select assets category!" }]}
            style={{ marginBottom: "12px" }}
          >
            <Select placeholder="Assets Category" >
              {assetsData?.map((data, index) => (
                <Option key={index} value={data.categoryName}>
                  {data.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          </Col>
          </Row>
          <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select status",
                },
              ]}
              style={{ marginBottom: "12px" }}
            >
              <Select placeholder="Select status">
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
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          className="center-table-data"
        />
      </div>
    </div>
  );
};

export default AddAssets;
