import React, { useState, useEffect } from "react";
import { Table, Input, Space, DatePicker,Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getEmployeeAssets } from "../../../actions/employee/assets/assets";


const { Search } = Input;
const { RangePicker } = DatePicker;

const Assets = () => {
  const dispatch = useDispatch();

  const [assetsData, setAssetsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getEmployeeAssets());
        setAssetsData(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Extract unique asset categories from the data
    const categories = [...new Set(assetsData.map((item) => item.assetCategory))];
    setCategoryFilters(categories.map((category) => ({ text: category, value: category })));
  }, [assetsData]);

  const onSearch = (value) => {
    const filteredData = assetsData.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setAssetsData(filteredData);
  };

  const onDateChange = (dates) => {
    // Implement date range filter logic here
    // Filter data based on the selected date range
    const filteredData = assetsData.filter(
      (item) =>
        new Date(item.createdAt) >= dates[0].startOf("day") &&
        new Date(item.createdAt) <= dates[1].endOf("day")
    );
    setAssetsData(filteredData);
  };

  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Asset Category",
      dataIndex: "assetCategory",
      key: "assetCategory",
      filters: categoryFilters,
      onFilter: (value, record) => record.assetCategory === value,
    },
    {
      title: "Issue Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString("en-GB"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  return (
    <div>
         <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Assets</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/employee/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Assets</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Space>
          <Search placeholder="Search" onSearch={onSearch} />
          <RangePicker onChange={onDateChange} />
        </Space>
      </div>
      <div style={{ overflowX: "auto" }}>
        <Table
          dataSource={assetsData}
          columns={columns}
          loading={loading}
          className="center-table-data"
        />
      </div>
    </div>
  );
};

export default Assets;
