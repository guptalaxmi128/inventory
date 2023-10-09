import React, { useState ,useEffect} from "react";
import { Breadcrumb, Button, Space, Table, message, Input, Modal, Form } from "antd";
import {
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import './AssetsCategory.css'; 
import { addAssetsCategory, getAssetsCategory } from "../../../actions/admin/assetsCategory/assetsCategory";



const columns = [
    {
      title: "Assets Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Category number",
      dataIndex: "categoryNumber",
      key: "categoryNumber",
    },
    
   
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


const AssetsCategory = () => {
  const dispatch=useDispatch();
  const assets=useSelector((state)=>state.assetsCategory.category)
  // console.log(assets)
  const [data,setData]=useState(assets?.data || [])
  const [size, setSize] = useState("large");
  const [assetsCategory,setAssetsCategory]=useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [printData, setPrintData] = useState([]); 
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async () => {
   
    try {
      const data = {
      categoryName: assetsCategory
      };
      await dispatch(addAssetsCategory(data));
     
      setSuccessMsg(true);
      message.success("Assets category successfully");
      setIsModalVisible(false);
      form.resetFields();
      setTimeout(() => {
        setSuccessMsg(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  dispatch(getAssetsCategory());
  }, [dispatch])
 

  const csvData = [
    ["Category Name","Category Number"], 
    ...data.map(item => [item.categoryName,item.categoryNumber]), 
  ];


  const arrayToCSV = (arr) => {
    return arr.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
  };


  const downloadCSV = () => {
    const csvString = arrayToCSV(csvData);
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "category.csv";
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
    printWindow.document.write('<h1 style="text-align: center;">Printed Table</h1>');
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
      {successMsg && (
        <div style={{ color: "green" }}>Assets Category added successfully</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Manage Category</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/admin/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Category</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Button type="primary" icon={<PlusOutlined />} size={size} onClick={handleAddCategoryClick}>
        Add Category
      </Button>
      <div style={{ marginTop: "30px" }}>
        <div className="button-container">
          <div className="mobile-buttons">
            <Button type="primary" size={size} className="mobile-button">
              Copy
            </Button>
            <Button type="primary" size={size} className="mobile-button" onClick={downloadCSV}>
              CSV
            </Button>
            <Button type="primary" size={size} className="mobile-button" onClick={handlePrint}>
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
        title="Add Assets Category"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleModalCancel}
        cancelText="Close"
        okText="Save Changes"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[
              {
                required: true,
                message: "Please enter the category name",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input  placeholder="Enter category name" value={assetsCategory} onChange={(e)=>setAssetsCategory(e.target.value)} />
          </Form.Item>
         
        </Form>
      </Modal>
      <Modal
        title="Print Table"
        open={isPrintModalVisible}
        onOk={printTable}
        onCancel={handlePrintModalCancel}
      >
        <p>Review the table data below before printing:</p>
        <Table columns={columns} dataSource={printData} pagination={false} />
      </Modal>
    </div>
  );
};

export default AssetsCategory;
