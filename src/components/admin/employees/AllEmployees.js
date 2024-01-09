import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Space,
  Table,
  Input,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import {
  EditOutlined,
  HomeOutlined,
  DownloadOutlined,
  DeleteOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import "./Employees.css";
import {
  getMember,
  getMemberById,
  updateMember,
} from "../../../actions/addMember/addMember";
import { getAssignAssets } from "../../../actions/admin/assets/assets";

const { Option } = Select;

const AllEmployees = () => {
  const dispatch = useDispatch();

  // const member = useSelector((state) => state.addMember.members);
  // console.log(member);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [size, setSize] = useState("large");
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [post, setPost] = useState("Select Post");
  const [attendanceId, setAttendanceId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const [pageSize,setPageSize]=useState(5);
  const [form] = Form.useForm();
  

  const validateMobileNumber = (_, value) => {
    if (value && !/^\d{10}$/.test(value)) {
      return Promise.reject(new Error("Mobile number must have 10 digits"));
    }
    return Promise.resolve();
  };
  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      render:(text,record,index)=>index+1
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onCell: (record) => {
        return {
          onClick: () => handleNameClick(record.id),
          style: { cursor: "pointer" },
        };
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
    },
    {
      title: "Attendance Id",
      dataIndex: "attendanceId",
      key: "attendanceId",
    },
    {
      title: "QR Code",
      key: "qrcode",
      render: (_, record) => (
        <QRCode
          size={50}
          value={record.qrImage}
          style={{ cursor: "pointer" }}
          onClick={() => handleQRCodeClick(record.qrImage)}
        />
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
          <EditOutlined
            style={{ fontSize: "16px" }}
            onClick={() => handleEditClick(record.id)}
          />
          {/* <DeleteOutlined style={{ color: "red", fontSize: "16px" }} /> */}
          <Button onClick={handleDownloadQRCode} type="primary">
            <DownloadOutlined /> QR Code
          </Button>
        </Space>
      ),
    },
  ];

  const handleDownloadQRCode = async () => {
    try {
      const wrapper = document.createElement("div");
      wrapper.style.width = "200px";
      wrapper.style.height = "200px";
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.justifyContent = "center";
      document.body.appendChild(wrapper);
      const qrCodeElement = document.querySelector("#qrCodeImage");
      qrCodeElement.style.width = "100%";
      qrCodeElement.style.height = "100%";
      wrapper.appendChild(qrCodeElement);
      const canvas = await html2canvas(wrapper);
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      document.body.removeChild(wrapper);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const handleNameClick = async (userId) => {
    setId(userId);

    const selectedEmployee = data.find((employee) => employee.id === userId);
    if (selectedEmployee && selectedEmployee.post === "EMPLOYEE") {
      try {
        setLoading(true);
        const result = await dispatch(getAssignAssets(userId));
        setEmployeeData([result.data]);
        setIsEmployee(true);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getMember());
        setData(result.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
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
        const result = await dispatch(getMemberById(selectedId));
        console.log(result);
        setName(result.data.name);
        setMobileNumber(result.data.mobileNumber);
        setAttendanceId(result.data.attendanceId);
        setEmail(result.data.email);
        setDepartment(result.data.department);
        setPost(result.data.post);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, selectedId]);

  console.log(employeeData);
  console.log(name);

  const csvData = [
    ["Name", "Email", "Mobile Number", "Department", "Post", "Attendance Id"],
    ...data?.map((item) => [
      item.name,
      item.email,
      item.mobileNumber,
      item.department,
      item.post,
      item.attendanceId,
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
    a.download = "employees.csv";
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

  const filterData = () => {
    if (searchQuery.trim() === "") {
      setFilteredData(null);
    } else {
      const filtered = data?.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.mobileNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.post.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.attendanceId.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterData();
  }, [searchQuery]);

  const handleQRCodeClick = (qrCode) => {
    setSelectedQrCode(qrCode);
    setQrCodeModalVisible(true);
  };

  const handleEditClick = (id) => {
    setSelectedId(id);
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleEditModalOk = async () => {
    try {
      const data = {
        name,
        mobileNumber,
        email,
        post,
        department,
        attendanceId,
        id: selectedId,
      };
      // console.log(member);
      const res = await dispatch(updateMember(data));
      if (res.success) {
        message.success(res.message);
        setEditModalVisible(false);
        form.resetFields();
        setName("");
        setMobileNumber("");
        setDepartment("");
        setEmail("");
        setPost("Select Post");
        setAttendanceId("");
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  const handlePostChange = (value) => {
    setPost(value);
  };

  const column = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Item Name",
      dataIndex: "emplyee_asset_association",
      key: "itemName",
      render: (association) =>
        association.map((item) => item.itemName).join(", "),
    },
    {
      title: "Quantity",
      dataIndex: "emplyee_asset_association",
      key: "quantity",
      render: (association) =>
        association.map((item) => item.quantity).join(", "),
    },
    {
      title: "Status",
      dataIndex: "emplyee_asset_association",
      key: "status",
      render: (association) =>
        association.map((item) => item.status).join(", "),
    },
    {
      title: "Date",
      dataIndex: "emplyee_asset_association",
      key: "date",
      render: (association) => association.map((item) => item.date).join(", "),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Employees</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/admin/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Employees</Breadcrumb.Item>
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

      <Modal
        title="Print Table"
        visible={isPrintModalVisible}
        onOk={printTable}
        onCancel={handlePrintModalCancel}
      >
        <p>Review the table data below before printing:</p>
        <div style={{ overflowX: "auto", maxWidth: "100%" }}>
          <Table columns={columns} dataSource={printData} pagination={false} />
        </div>
      </Modal>
      <Modal
        title="QR Code"
        visible={qrCodeModalVisible}
        onCancel={() => setQrCodeModalVisible(false)}
        footer={null}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <QRCode id="qrCodeImage" size={200} type="svg" value={selectedQrCode} />
      </Modal>
      <Modal
        title="Edit Employee"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onOk={handleEditModalOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter name",
              },
            ]}
          >
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter an email",
                type: "email",
              },
            ]}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            rules={[
              {
                required: true,
                message: "Please enter a mobile number",
              },
              {
                validator: validateMobileNumber,
              },
            ]}
          >
            <Input
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Department"
            rules={[
              {
                required: true,
                message: "Please enter department",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Post"
            rules={[
              {
                required: true,
                message: "Please select post",
              },
            ]}
            style={{ marginBottom: "12px" }}
            initialValue="Select Post"
          >
            <Select value={post} onChange={handlePostChange}>
              <Option value="EMPLOYEE">Employee</Option>
              <Option value="STORE KEEPER">Store Keeper</Option>
              <Option value="IT TECHNICIAN">IT Technician</Option>
              <Option value="INSTRUCTOR">Instructor</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Attendance Id"
            rules={[
              {
                required: true,
                message: "Please enter Attendance Id",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input
              placeholder="Enter Attendance Id"
              value={attendanceId}
              onChange={(e) => setAttendanceId(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Employee Assets"
        visible={isEmployee}
        onCancel={() => setIsEmployee(false)}
        footer={null}
      >
        <div style={{ overflow: "auto" }}>
          <Table columns={column} dataSource={employeeData} />
        </div>
      </Modal>
    </div>
  );
};

export default AllEmployees;
