import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Space,
  Table,
  Tag,
  Input,
  Modal,
  Form,
  Select,
} from "antd";
import {
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "../items/Items.css";

const { Option } = Select;


const data = [
  {
    key: "1",
    elementName: "Clothes",
    totalValue: "2",
    status: ["Active"],
  },
  {
    key: "2",
    elementName: "Computer",
    totalValue: "5",
    status: ["Active"],
  },
  {
    key: "3",
    elementName: "Mobile",
    totalValue: "6",
    status: ["Active"],
  },
];

const Elements = () => {
  const [size, setSize] = useState("large");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [form] = Form.useForm();


  const columns = [
    {
      title: "Element name",
      dataIndex: "elementName",
      key: "elementName",
    },
    {
      title: "Total Value",
      dataIndex: "totalValue",
      key: "totalValue",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status.map((status) => {
            let color = status.length > 5 ? "green" : "volcano";
  
            return (
              <Tag color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
        <Link to="/addvalue" style={{textDecoration:'none'}}>
          <Button type="default" >
            <PlusOutlined style={{ fontSize: "16px" }} /> Add Value
          </Button>
          </Link>
          <EditOutlined style={{ fontSize: "16px" }} />
          <DeleteOutlined style={{ color: "red", fontSize: "16px" }} />
        </Space>
      ),
    },
  ];

  const csvData = [
    ["Element Name", "Status"],
    ...data.map((item) => [item.itemName, item.status.join(", ")]),
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
    a.download = "element.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleAddCategoryClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values:", values);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
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

 
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Manage Elements</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Elements</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size={size}
        onClick={handleAddCategoryClick}
      >
        Add Element
      </Button>
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
            <Input.Search placeholder="Search..." />
          </div>
        </div>

        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Add Element"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleModalCancel}
        cancelText="Close"
        okText="Save Changes"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="elementName"
            label="Element Name"
            rules={[
              {
                required: true,
                message: "Please enter the element name",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input placeholder="Enter element name" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select a status",
              },
            ]}
            initialValue="Active"
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Print Table"
        visible={isPrintModalVisible}
        onOk={printTable}
        onCancel={handlePrintModalCancel}
      >
        <p>Review the table data below before printing:</p>
        <Table columns={columns} dataSource={printData} pagination={false} />
      </Modal>
    </div>
  );
};

export default Elements;
