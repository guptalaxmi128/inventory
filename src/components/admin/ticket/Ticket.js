import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Space, Table, Input, Modal, Tag } from "antd";
import {
  EditOutlined,
  HomeOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../employees/Employees.css";
import { getAdminTicket } from "../../../actions/admin/ticket/ticket";

const localhost = "http://localhost:5000/";

const Ticket = () => {
  const dispatch = useDispatch();
  // const myticket = useSelector((state) => state.adminTicket.ticket);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [size, setSize] = useState("large");
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Image",
      dataIndex: "attachment",
      key: "avatar",
      render: (attachments) => (
        <div>
          {Array.isArray(attachments) &&
            attachments.map((attachment, index) => (
              <div key={index}>
                <img
                  src={attachment.attachment_Path}
                  alt={attachment.attachment_OriginalName}
                  style={{ height: "60px", width: "100px" }}
                />
              </div>
            ))}
        </div>
      ),
      // render: (attachments) => {
      //   const imagePaths = Array.isArray(attachments)
      //     ? attachments.map((attachment, index) => {
      //         // const imagePath = `${localhost}/attachment/${attachment.attachment_FileName}`;
      //         console.log(`Image path for attachment ${index + 1}:`, imagePath);
      //         return (
      //           <div key={index}>
      //             <img
      //               src={attachment.attachment_Path}
      //               alt={attachment.attachment_OriginalName}
      //               style={{ height: "60px", width: "100px" }}
      //             />
      //           </div>
      //         );
      //       })
      //     : null;

      //   return <div>{imagePaths}</div>;
      // },
    },
    {
      title: "Ticket Number",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
      render: (text, record) => (
        <Link
          to={`/admin/tickets/${record.id}/timeline`}
          style={{ color: "black", cursor: "pointer" }}
        >
          {text}
        </Link>
      ),
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAdminTicket());
        setData(result.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  console.log(data);

  const csvData = [
    ["Ticket Number", "Ticket Category", "Subject", "Detail", "Status"],
    ...data?.map((item) => [
      item.ticketNumber,
      item.ticketCategory,
      item.subject,
      item.details,
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
  //   console.log(printData);

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
      const filtered = data?.filter((item) => {
        return (
          item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ticketCategory
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
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
        <p style={{ fontSize: "22px" }}>Ticket</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/admin/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Ticket</Breadcrumb.Item>
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
              <DownloadOutlined /> CSV
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
    </div>
  );
};

export default Ticket;
