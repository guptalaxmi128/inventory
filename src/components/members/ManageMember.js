import React, { useState } from "react";
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

const columns = [
  {
    title: " Username",
    dataIndex: "userName",
    key: "userName",
   
  },
  {
    title: " Email",
    dataIndex: "email",
    key: "email",
   
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
   
  },
  {
    title: "Mobile Number",
    dataIndex: "mobileNumber",
    key: "mobileNumber",
   
  },
  {
    title: "Permission",
    dataIndex: "permission",
    key: "permission",
  },
];
const data = [
  {
    key: "1",
    userName: "Laxmi",
    email:'abc@gmail.com',
    name:'Laxmi Gupta',
    mobileNumber:'1234567865',
    permission:'Testing'
  },
  {
    key: "2",
    userName: "Prakhar",
    email:'xyz@gmail.com',
    name:'Prakhar Kulshrestha',
    mobileNumber:'1234567865',
    permission:'Testing'
  },
  {
    key: "3",
    userName: "Ankush",
    email:'abc@gmail.com',
    name:'Ankush Gupta',
    mobileNumber:'1234567865',
    permission:'Testing'
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

const ManageMember = () => {
  const [size, setSize] = useState("large");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [form] = Form.useForm();

  const csvData = [
    ["Username", "Email","Name","Mobile Number","Permission"],
    ...data.map((item) => [item.userName,item.email,item.name,item.mobileNumber, item.permission]),
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
    a.download = "member.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleAddItemsClick = () => {
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
  console.log(printData)

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
        <p style={{ fontSize: "22px" }}>Manage Members</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Members</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size={size}
        // onClick={handleAddItemsClick}
      >
        Add New
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
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table columns={columnsWithAction} dataSource={data} />
        </div>
      </div>
      <Modal
        title="Add Items"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleModalCancel}
        cancelText="Close"
        okText="Save Changes"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="itemName"
            label="Item Name"
            rules={[
              {
                required: true,
                message: "Please enter the item name",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input placeholder="Enter item name" />
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
        // width="58%"
      >
        <p>Review the table data below before printing:</p>
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table columns={columns} dataSource={printData} pagination={false} />
        </div>
      </Modal>
    </div>
  );
};

export default ManageMember;
