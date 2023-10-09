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
  Avatar
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
        title: "Avatar",
        dataIndex: "imageName",
        key: "avatar",
        render: (imageName) => (
          <Avatar src={imageName} alt="Avatar" size={40} />
        ),
      },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
   
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
   
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
   
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
   
  },
  {
    title: "Availability",
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
];
const data = [
  {
    key: "1",
    productName: "Clothes",
    price:'2300',
    qty:'4',
    warehouse:'sample1',
    imageName:"https://media.istockphoto.com/id/1372559778/photo/a-millennial-woman-is-preparing-the-shipment-of-some-clothes-in-her-new-online-shop.jpg?s=1024x1024&w=is&k=20&c=Gb-gUds4iouDdJLT2qOUIxBnAZf9FzGCet0pHBkSM7s=",
    status: ["Active"],
  },
  {
    key: "2",
    productName: "Computer",
    price:'50000',
    qty:'1',
    warehouse:'sample2',
    imageName:'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: ["Active"],
  },
  {
    key: "3",
    productName: "Mobile",
    price:'25000',
    qty:'4',
    warehouse:'sample3',
    imageName:'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    status: ["Active"],
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

const ManageProducts = () => {
  const [size, setSize] = useState("large");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [form] = Form.useForm();

  const csvData = [
    ["Product Name","Price","Qty","Warehouse", "Status"],
    ...data.map((item) => [item.itemName,item.price,item.qty,item.warehouse, item.status.join(", ")]),
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
    a.download = "product.csv";
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
        <p style={{ fontSize: "22px" }}>Manage Products</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size={size}
        onClick={handleAddItemsClick}
      >
        Add Product
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
        <Table columns={columnsWithAction } dataSource={data} />
        </div>
      </div>
      <Modal
        title="Add Product"
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
      >
        <p>Review the table data below before printing:</p>
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <Table columns={columns} dataSource={printData} pagination={false} />
        </div>
      </Modal>
    </div>
  );
};

export default ManageProducts;
