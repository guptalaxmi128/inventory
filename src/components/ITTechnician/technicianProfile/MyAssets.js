import React, { useState, useEffect } from "react";
import { Table, Input, Space, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { getAssetsTechnician } from "../../../actions/itTechnician/assets/assets";

const { Search } = Input;
const { RangePicker } = DatePicker;

const MyAssets = () => {
  const dispatch = useDispatch();

  const [assetsData, setAssetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilters, setCategoryFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getAssetsTechnician());
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
    // Implement search logic here
    // Filter data based on the search value
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

export default MyAssets;
