import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Spin,
  Tag,
  Input,
  Space,
  Table,
  DatePicker,
} from "antd";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  getDashboardTechnicianClose,
  getDashboardTechnicianOpen,
  getDashboardTechnicianTicket,
} from "../../../actions/itTechnician/dashboard/dashboard";
import { getTechnicianTicket } from "../../../actions/itTechnician/myTicket/myTicket";

const cardStyle = {
  marginBottom: "10px",
};

const { Search } = Input;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [ticketNumber, setTicketNumber] = useState("");
  const [openTicket, setOpenTicket] = useState("");
  const [closeTicket, setCloseTicket] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const onSearch = (value) => {
    console.log(value);
    const filteredData = filterData(value, data);
    setData(filteredData);
  };

  const onDateChange = (dates) => {
    const filteredData = filterDataByDate(dates, data);
    setData(filteredData);
  };

  const filterData = (searchValue, originalData) => {
    if (!searchValue.trim()) {
      return originalData;
    }

    const filteredData = originalData.filter((item) =>
      Object.values(item).some(
        (val) =>
          val !== null &&
          val.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    return filteredData;
  };

  const filterDataByDate = (dates, originalData) => {
    if (!dates || !dates[0] || !dates[1]) {
      return originalData;
    }

    const filteredData = originalData.filter(
      (item) =>
        new Date(item.createdAt) >= dates[0].startOf("day") &&
        new Date(item.createdAt) <= dates[1].endOf("day")
    );
    return filteredData;
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ticket Number",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
    },
    {
      title: "Name",
      dataIndex: "employee",
      key: "name",
      render: (employee) => employee.name,
    },
    {
      title: "Ticket Category",
      dataIndex: "ticketCategory",
      key: "ticketCategory",
    },
    {
      title: "Reply",
      dataIndex: "reply",
      key: "reply",
      render: (reply) => (reply ? <span>{reply}</span> : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "CREATED":
            color = "blue";
            break;
          case "ONGOING":
            color = "yellow";
            break;
          case "RESOLVED":
            color = "green";
            break;
          default:
            color = "volcano";
            break;
        }

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getTechnicianTicket());
        setData(result.data);
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
        const result = await dispatch(getDashboardTechnicianTicket());
        setTicketNumber(result.data);
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
        const result = await dispatch(getDashboardTechnicianClose());
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
        const result = await dispatch(getDashboardTechnicianOpen());
        setOpenTicket(result.data);
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
            <a href="/ITTechnician/dashboard">
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
              title="Today's Ticket"
              bordered={false}
              style={{ background: "#fff2cd", ...cardStyle }}
            >
              {ticketNumber}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
            <Card
              title="Open Ticket"
              bordered={false}
              style={{ background: "#feede7", ...cardStyle }}
            >
              {openTicket}
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
            <Card
              title="Total Employees"
              bordered={false}
              style={{ background: "#f9d9f9", ...cardStyle }}
            >
              9
            </Card>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
            <Card
              title="Closed Ticket"
              bordered={false}
              style={{ background: "#dbf9f0", ...cardStyle }}
            >
              {closeTicket}
            </Card>
          </Col>
        </Row>
      )}

      <div style={{ marginTop: "50px" }}>
        <h3> Ticket</h3>
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
            dataSource={data}
            columns={columns}
            loading={loading}
            className="center-table-data"
            pagination={{
            pageSizeOptions: ["5", "10", "20", "30", "50", "100", "all"],
            showSizeChanger: true,
            pageSize: pageSize === "all" ? data.length : Number(pageSize),
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onShowSizeChange: (current, newSize) => {
              // Handle page size change
              setPageSize(newSize);
            },
            onChange: (page, newSize) => {
              // Handle page change
              console.log("Page:", page, "PageSize:", newSize);
            },
          }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
