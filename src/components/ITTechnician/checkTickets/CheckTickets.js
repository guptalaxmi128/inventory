import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Input,
  Form,
  Select,
  Row,
  Col,
  Space,
  Modal,
  Table,
  Tag,
  message,
} from "antd";
import {
  DownloadOutlined,
  HomeOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./CheckTickets.css";
import {
  getTechnicianTicket,
  getTicketById,
  updateTicket,
} from "../../../actions/itTechnician/myTicket/myTicket";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const columns = [
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

const CheckTickets = () => {
  const dispatch = useDispatch();
  // const myticket = useSelector(
  //   (state) => state.technicianTicket.technicianticket
  // );
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [size, setSize] = useState("large");
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [reply, setReply] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [details, setDetails] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  const ticketById = useSelector((state) => state.technicianTicket.ticket);

  const fetchSelectedItemData = async () => {
    if (id) {
      dispatch(getTicketById(id));
    }
  };

  // console.log(myticket)
  useEffect(() => {
    if (isAddModalVisible) {
      fetchSelectedItemData();
    }
  }, [isAddModalVisible]);

  useEffect(() => {
    if (ticketById && id) {
      setSubject(ticketById.data?.subject || "");
      setTicketCategory(ticketById.data?.ticketCategory || "");
      setTicketNumber(ticketById.data?.ticketNumber || "");
      setStatus(ticketById.data?.status || "");
      setReply(ticketById.data?.reply || "");
      setDetails(ticketById.data?.details || "");
    }
  }, [ticketById, id]);

  const onFinish = async () => {
    try {
      const data = {
        id,
        subject,
        ticketCategory,
        reply,
        status,
      };
      const res = await dispatch(updateTicket(data));
      if (res.success) {
        message.success(res.message);
        setStatus("Select status");
        setReply("");
        setTicketCategory("Select ticket category");
        setSubject("");
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error(error.response.data.message);
    }
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };
  const handleTicketChange = (value) => {
    setTicketCategory(value);
  };

  const handleOpenModal = (id) => {
    setId(id);
    setIsAddModalVisible(true);
  };

  const handleCloseModal = () => {
    setId(null);
    setIsAddModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getTechnicianTicket());
        setData(res.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  console.log(data);

  const columnsWithAction = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="default" onClick={() => handleOpenModal(record.id)}>
            <PlusOutlined style={{ fontSize: "16px" }} /> Action
          </Button>
          <Link to={`/ITTechnician/tickets/${record.id}/timeline`}>
            <Button type="default">View Timeline</Button>
          </Link>
        </Space>
      ),
    },
  ];
  const csvData = [
    ["Ticket Number", "Name", "Ticket Category", "Status"],
    ...data?.map((item) => [
      item.ticketNumber,
      item.employee.name,
      item.ticketCategory,
      item.status,
    ]),
  ];

  const arrayToCSV = (arr) => {
    return arr
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  };

  const downloadCSV = () => {
    const csvString = arrayToCSV(csvData);
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "myticket.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    setPrintData(data);
    setIsPrintModalVisible(true);
  };

  const handlePrintModalCancel = () => {
    setIsPrintModalVisible(false);
  };

  const printTable = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write("<html><head><title>Print</title>");

    // Add custom CSS styles here
    printWindow.document.write(`
      <style>
        table {
          width: 100%; 
        }
        th, td {
          padding: 10px;
          border: 1px solid #000; 
        }
      </style>
    `);

    printWindow.document.write("</head><body>");
    printWindow.document.write(
      '<h1 style="text-align: center;">Printed Table</h1>'
    );
    printWindow.document.write('<table border="1" style="margin: 0 auto;">');
    printWindow.document.write("<tr>");

    columns
      .filter((column) => column.key !== "action")
      .forEach((column) => {
        printWindow.document.write(`<th>${column.title}</th>`);
      });
    printWindow.document.write("</tr>");
    printData.forEach((record) => {
      printWindow.document.write("<tr>");

      columns
        .filter((column) => column.key !== "action")
        .forEach((column) => {
          if (column.dataIndex === "employee") {
            const cellData = `${record.employee.name}`;
            printWindow.document.write(`<td>${cellData}</td>`);
          } else {
            printWindow.document.write(`<td>${record[column.dataIndex]}</td>`);
          }
        });
      printWindow.document.write("</tr>");
    });

    printWindow.document.write("</table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const filterData = () => {
    if (searchQuery.trim() === "") {
      setFilteredData(null);
    } else {
      const filtered = data?.filter((item) => {
        return (
          item.ticketCategory
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.employee.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterData();
  }, [searchQuery]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Check Ticket</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/ITTechnician/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Check Ticket</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div style={{ marginTop: "30px" }}>
        <div className="button-container">
          <div className="mobile-buttons">
            <Button
              type="primary"
              size={size}
              className="mobile-button"
              onClick={downloadCSV}
            >
              <DownloadOutlined /> Export
            </Button>
            <Button
              type="primary"
              size={size}
              className="mobile-button"
              onClick={handlePrint}
            >
              <PrinterOutlined /> Print
            </Button>
          </div>

          <div className="mobile-search">
            <Input.Search
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <Table
            columns={columnsWithAction}
            dataSource={filteredData || data}
            loading={loading}
          />
        </div>
      </div>

      <Modal
        title="Print Table"
        open={isPrintModalVisible}
        onOk={printTable}
        onCancel={handlePrintModalCancel}
      >
        <p>Review the table data below before printing:</p>
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <Table columns={columns} dataSource={printData} pagination={false} />
        </div>
      </Modal>
      <Modal
        title={`Edit Ticket - Ticket Number
        ${ticketNumber}
        `}
        open={isAddModalVisible}
        onCancel={handleCloseModal}
        onOk={onFinish}
      >
        <Form layout="vertical">
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
              <Form.Item
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
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={24}>
              <Form.Item label="Ticket Number" style={{ marginBottom: "12px" }}>
                <Input
                  placeholder="Ticket Number"
                  value={ticketNumber}
                  disabled={!!ticketById}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={24}>
              <Form.Item
                label="Subject"
                rules={[
                  {
                    required: true,
                    message: "Please enter subject",
                  },
                ]}
                style={{ marginBottom: "12px" }}
              >
                <TextArea
                  rows={3}
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={24}>
              <Form.Item
                // name="reply"
                label="Reply"
                style={{ marginBottom: "12px" }}
              >
                <TextArea
                  rows={3}
                  placeholder="Enter Reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={12} lg={24}>
              <Form.Item label="Details" style={{ marginBottom: "12px" }}>
                <TextArea
                  rows={3}
                  placeholder="Details"
                  value={details}
                  disabled={!!ticketById}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckTickets;
