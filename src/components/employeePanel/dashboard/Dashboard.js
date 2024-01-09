import React, { useState, useEffect } from "react";
import { Card, Col, Row, Table, DatePicker, Input, Space,Spin } from "antd";
import { Breadcrumb } from "antd";
import { useDispatch } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import {
  getDashboardEmployeeAsset,
  getDashboardEmployeeCategory,
  getDashboardEmployeeClose,
  getDashboardEmployeeOpen,
} from "../../../actions/employee/dashboard/dashboard";
import { getEmployeeAssets } from "../../../actions/employee/assets/assets";

const cardStyle = {
  marginBottom: "10px",
};

const { Search } = Input;
const { RangePicker } = DatePicker;
const Dashboard = () => {
  const dispatch = useDispatch();

  const [assetsData, setAssetsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [assetNumber, setAssetNumber] = useState("");
  const [closeTicket, setCloseTicket] = useState("");
  const [openTicket, setOpenTicket] = useState("");
  const [category,setCategory]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getEmployeeAssets());
        setAssetsData(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Extract unique asset categories from the data
    const categories = [
      ...new Set(assetsData.map((item) => item.assetCategory)),
    ];
    setCategoryFilters(
      categories.map((category) => ({ text: category, value: category }))
    );
  }, [assetsData]);

  const onSearch = (value) => {
    const filteredData = assetsData.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setAssetsData(filteredData);
  };

  const onDateChange = (dates) => {
    // Implement date range filter logic here
    // Filter data based on the selected date range
    const filteredData = assetsData.filter(
      (item) =>
        new Date(item.createdAt) >= dates[0].startOf("day") &&
        new Date(item.createdAt) <= dates[1].endOf("day")
    );
    setAssetsData(filteredData);
  };

  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Asset Category",
      dataIndex: "assetCategory",
      key: "assetCategory",
      filters: categoryFilters,
      onFilter: (value, record) => record.assetCategory === value,
    },
    {
      title: "Issue Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString("en-GB"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getDashboardEmployeeAsset());
        setAssetNumber(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getDashboardEmployeeClose());
        setCloseTicket(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getDashboardEmployeeOpen());
        setOpenTicket(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getDashboardEmployeeCategory());
        setCategory(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Dashboard</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/employee/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
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
      <Row gutter={16} justify="start">
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <Card
            title="Total Assets(item)"
            bordered={false}
            style={{ background: "#fff2cd", ...cardStyle }}
          >
            {assetNumber}
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <Card
            title="Total Asset Category"
            bordered={false}
            style={{ background: "#feede7", ...cardStyle }}
          >
            {category}
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <Card
            title="Open Tickets(Current)"
            bordered={false}
            style={{ background: "#f9d9f9", ...cardStyle }}
          >
            {openTicket}
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <Card
            title="Closed Tickets"
            bordered={false}
            style={{ background: "#dbf9f0", ...cardStyle }}
          >
            {closeTicket}
          </Card>
        </Col>
      </Row>)}
      <div style={{ marginTop: "50px" }}>
        <h3> Assets</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <Space>
            <Search placeholder="Search" onSearch={onSearch} />
            <RangePicker onChange={onDateChange} />
          </Space>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            dataSource={assetsData}
            columns={columns}
            loading={loading}
            className="center-table-data"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
