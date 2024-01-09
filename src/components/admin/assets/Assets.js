import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Space,
  Table,
  message,
  Input,
  Modal,
  Form,
} from "antd";
import {
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "../assetsCategory/AssetsCategory.css";
import {
  getAdminAssets,
  getAdminAssetsById,
  updateAdminAssets,
} from "../../../actions/admin/assets/assets";

const Assets = () => {
  const dispatch = useDispatch();
  // const assets=useSelector((state)=>state.assets.assets)
  // console.log(assets)
  const [data, setData] = useState([]);
  const [size, setSize] = useState("large");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [id, setId] = useState("");
  const [pageSize,setPageSize]=useState(5);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Item name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Assets Category",
      dataIndex: "assetCategory",
      key: "assetCategory",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: "16px" }}
            onClick={() => handleEditClick(record.id)}
          />
          <DeleteOutlined style={{ color: "red", fontSize: "16px" }} />
        </Space>
      ),
    },
  ];

  const handleSave = async () => {
    try {
      const data = {
        itemName,
        assetCategory: categoryName,
        quantity,
        id,
      };
      const res = await dispatch(updateAdminAssets(data));

      if (res.success) {
        message.success(res.message);
        setIsModalVisible(false);
        form.resetFields();
        setItemName("");
        setCategoryName("");
        setQuantity("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAdminAssets());
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
        const result = await dispatch(getAdminAssetsById(id));
        setItemName(result.data.itemName);
        setCategoryName(result.data.assetCategory);
        setQuantity(result.data.quantity);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const csvData = [
    ["Item Name", "Assets Category", "Quantity"],
    ...data?.map((item) => [item.itemName, item.assetCategory, item.quantity]),
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
    a.download = "assets.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleEditClick = (id) => {
    setId(id);
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
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.assetCategory.toLowerCase().includes(searchQuery.toLowerCase())
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
        <p style={{ fontSize: "22px" }}>Manage Assets</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/admin/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Assets</Breadcrumb.Item>
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

        <Table
          columns={columns}
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
      <Modal
        title="Add Assets"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleModalCancel}
        cancelText="Cancel"
        okText="Update"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Item Name"
            rules={[
              {
                required: true,
                message: "Please enter the item name",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Asset Category"
            rules={[
              {
                required: true,
                message: "Please enter asset category",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input
              placeholder="Enter asset category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            rules={[
              {
                required: true,
                message: "Please enter the quantity",
              },
            ]}
            style={{ marginBottom: "12px" }}
          >
            <Input
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
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

export default Assets;
