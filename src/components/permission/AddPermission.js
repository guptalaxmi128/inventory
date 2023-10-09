import React from "react";
import { Breadcrumb,Checkbox,Table} from "antd";
import { HomeOutlined } from "@ant-design/icons";

const data = [
  {
    key: '1',
    permission: 'Members',
  },
  {
    key: '2',
    permission: 'Permission',
  },
  {
    key: '3',
    permission: 'Items',
  },
  {
    key: '4',
    permission: 'Category',
  },
  {
    key: '5',
    permission: 'Warehouse',
  },
  {
    key: '6',
    permission: 'Elements',
  },
  {
    key: '7',
    permission: 'Products',
  },
 
];

const columns = [
  {
    title: 'Permission',
    dataIndex: 'permission',
    key: 'permission',
  },
  {
    title: 'Create',
    dataIndex: 'create',
    key: 'create',
    render: (_, record) => (
      <Checkbox />
    ),
  },
  {
    title: 'Update',
    dataIndex: 'update',
    key: 'update',
    render: (_, record) => (
      <Checkbox />
    ),
  },
  {
    title: 'View',
    dataIndex: 'view',
    key: 'view',
    render: (_, record) => (
      <Checkbox />
    ),
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
    render: (_, record) => (
      <Checkbox />
    ),
  },
];

const AddPermission = () => {




  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>User Permission</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Permission</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <Table
      columns={columns}
      dataSource={data}
      pagination={false} 
    />
    </div>
    </div>
  );
};

export default AddPermission;
