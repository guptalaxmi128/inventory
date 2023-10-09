import React, { useState,useEffect } from "react";
import { Breadcrumb, Button, Space, Table, Input, Modal, Avatar ,Tag} from "antd";
import {
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Ticket.css";
import { getMyTicket } from "../../../actions/employee/myTicket/myTicket";

const columns = [
  {
    title: "Image",
    dataIndex: "attachment",
    key: "avatar",
    render: (attachments) => (
      <div>
        {attachments.map((attachment, index) => (
          <div key={index}>{attachment.attachment_OriginalName}</div>
        ))}
      </div>
    ),
  },
  {
    title: "Ticket Number",
    dataIndex: "ticketNumber",
    key: "ticketNumber",
  },
  {
    title: "Ticket Category",
    dataIndex: "ticketCategory",
    key: "ticketCategory",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    key: "subject",
  },

  {
    title: "Detail",
    dataIndex: "details",
    key: "details",
  },
  {
    title: "Status", 
    dataIndex: "status", 
    key: "status", 
    render: (status) => ( 
      <Tag color={status === "CREATED" ? "green" : "volcano"}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
];


const columnsWithAction = [
  ...columns,
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined style={{ fontSize: "16px" }} />
        <DeleteOutlined style={{ color: "red", fontSize: "16px" }} />
      </Space>
    ),
  },
];

const MyTicket = () => {
  const dispatch=useDispatch();
  const myticket=useSelector((state)=>state.myTicket.myticket);
  const [data,setData]=useState(myticket?.data || []);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [size, setSize] = useState("large");
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getMyTicket());
  }, [dispatch]);

  const csvData = [
    ["Ticket Number", "Ticket Category", "Subject", "Detail", "Status"],
    ...data.map((item) => [
      item.ticketNumber,
      item.ticketCategory,
      item.subject,
      item.details,
      item.status
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
  console.log(printData);

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
      .filter((column) => column.key !== "action" && column.key !== "avatar")
      .forEach((column) => {
        printWindow.document.write(`<th>${column.title}</th>`);
      });
    printWindow.document.write("</tr>");
    printData.forEach((record) => {
      printWindow.document.write("<tr>");

      columns
        .filter((column) => column.key !== "action" && column.key !== "avatar")
        .forEach((column) => {
          
          printWindow.document.write(`<td>${record[column.dataIndex]}</td>`);
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
      const filtered = data.filter((item) => {
        return (
          item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ticketCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        <p style={{ fontSize: "22px" }}>My Ticket</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>My Ticket</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Link to={"/create-ticket"} style={{ textDecoration: "none" }}>
        <Button type="primary" icon={<PlusOutlined />} size={size}>
          Create
        </Button>
      </Link>
      <div style={{ marginTop: "30px" }}>
        <div className="button-container">
          <div className="mobile-buttons">
            <Button type="primary" size={size} className="mobile-button">
              Copy
            </Button>
            <Button
              type="primary"
              size={size}
              className="mobile-button"
              onClick={downloadCSV}
            >
              CSV
            </Button>
            <Button
              type="primary"
              size={size}
              className="mobile-button"
              onClick={handlePrint}
            >
              Print
            </Button>
          </div>

          <div className="mobile-search">
            <Input.Search placeholder="Search..." 
                 value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        </div>
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <Table columns={columnsWithAction} dataSource={filteredData ||data} />
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
    </div>
  );
};

export default MyTicket;
