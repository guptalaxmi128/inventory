import React, { useState, useEffect } from "react";
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
  message,
} from "antd";
import {
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAssetsCategoryStore } from "../../actions/storeKeeper/assetsCategory/assetsCategory";
import "./Items.css";
import {
  addAssets,
  getAssets,
  getAssetsById,
  updateAssets,
} from "../../actions/storeKeeper/assets/assets";

const { Option } = Select;

const Items = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState("large");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [assetsData, setAssetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [assetsCategory, setAssetsCategory] = useState("");
  const [id, setId] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Assets Category",
      dataIndex: "assetCategory",
      key: "assetCategory",
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   render: (_, { status }) => (
    //     <>
    //       {status.map((status) => {
    //         let color = status.length > 5 ? "green" : "volcano";

    //         return (
    //           <Tag color={color} key={status}>
    //             {status.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAssetsCategoryStore());
        setAssetsData(result.data);
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
        const result = await dispatch(getAssets());
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
        const result = await dispatch(getAssetsById(id));
        setItemName(result.data.itemName);
        setAssetsCategory(result.data.assetCategory);
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
    a.download = "items.csv";
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

  const handleSave = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      console.log("Received values:", values);

      const res = await dispatch(addAssets(values));

      if (res.success) {
        message.success(res.message);
        setIsModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error during validation or dispatch:", error);

      // Optionally, you can display an error message to the user
      message.error("An error occurred. Please try again.");
    }
  };

  const handleEditClick = (itemId) => {
    setId(itemId);
    setIsEditModalVisible(true);
    const selectedItem = data.find((item) => item.itemId === itemId);
    if (selectedItem) {
      form.setFieldsValue(selectedItem);
    }
  };

  // const handleSave = async () => {
  //   try {
  //     await form.validateFields();
  //     const values = form.getFieldsValue();
  //     const data={
  //       id:selectedItemId,
  //       ...values
  //     }
  //     if (selectedItemId) {
  //       // Update existing item
  //       const res = await dispatch(updateAssets(data));
  //       if (res.success) {
  //         message.success(res.message);
  //         setIsModalVisible(false);
  //         form.resetFields();
  //         setSelectedItemId(null);
  //       }
  //     } else {
  //       // Add new item
  //       const res = await dispatch(addAssets(values));
  //       if (res.success) {
  //         message.success(res.message);
  //         setIsModalVisible(false);
  //         form.resetFields();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error during validation or dispatch:", error);
  //     message.error("An error occurred. Please try again.");
  //   }
  // };

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
  const handleCategoryChange = (value) => {
    setAssetsCategory(value);
  };
  console.log(assetsCategory)

  const handleEditSave = async () => {
    try {
      const data = {
        id,
        itemName,
       assetCategory: assetsCategory,
        quantity,
      };
      const res = await dispatch(updateAssets(data));
      if (res.success) {
        message.success(res.message);
        setIsEditModalVisible(false);
        setItemName("");
        setQuantity("");
        setAssetsCategory("Select Assets Category");
        setId(null);
      }
    } catch (error) {
      console.error("Error during validation or dispatch:", error);
      message.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Manage Items</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Items</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size={size}
        onClick={handleAddItemsClick}
      >
        Add Items
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

        <Table columns={columns} dataSource={data} loading={loading} />
      </div>
      <Modal
        title={"Add Items"}
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
            label="Assets Category"
            name="assetCategory"
            rules={[
              { required: true, message: "Please select assets category!" },
            ]}
          >
            <Select placeholder="Assets Category">
              {assetsData?.map((data, index) => (
                <Option key={index} value={data.categoryName}>
                  {data.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: "Please enter quantity",
              },
            ]}
          >
            <Input placeholder="Quantity" type="number" />
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
      <Modal
        title="Edit Item"
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
        }}
        onOk={handleEditSave}
        okText="Update"
        cancelText="Close"
      >
        <Form layout="vertical">
          <Form.Item
            label="Item Name"
            rules={[
              {
                required: true,
                message: "Please enter the item name",
              },
            ]}
          >
            <Input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Assets Category"
            rules={[
              { required: true, message: "Please select assets category!" },
            ]}
          >
            <Select value={assetsCategory} onChange={handleCategoryChange}>
              {assetsData?.map((data, index) => (
                <Option key={index} value={data.categoryName}>
                  {data.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            rules={[
              {
                required: true,
                message: "Please enter quantity",
              },
            ]}
          >
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Items;
