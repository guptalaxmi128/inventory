
import React, { useState, useEffect } from "react";
import { Breadcrumb, Table, Button, Modal, Form, Input, message,Spin } from "antd";
import { useDispatch } from "react-redux";
import { HomeOutlined, EditOutlined } from "@ant-design/icons";
import { getStoreKeeperProfile,updateStoreKeeperProfile } from "../../../actions/storeKeeper/profile/profile";

const StoreKeeperProfile = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [post, setPost] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [attendanceId, setAttendanceId] = useState("");
  const [loading,setLoading]=useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getStoreKeeperProfile());
        console.log(result);
        setName(result.data.name);
        setMobileNumber(result.data.mobileNumber);
        setEmail(result.data.email);
        setPost(result.data.post);
        setDepartment(result.data.department);
        setAttendanceId(result.data.attendanceId);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEditClick = () => {
    setVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await dispatch(updateStoreKeeperProfile({name}));
      if (res.success) {
        message.success(res.message);
        setVisible(false);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Department",
      dataIndex: "department",
      key: "department",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEditClick(record)}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Profile</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>
            <a href="/storeKeeper/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="small" />
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={[
              {
                key: 1,
                name,
                email,
                mobileNumber,
                department,
                post,
                attendanceId,
              },
            ]}
            pagination={false}
          />
        </div>
      )}

      <Modal
        title="Update Profile"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form onFinish={handleUpdate} layout="vertical">
          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email">
            <Input disabled value={email} />
          </Form.Item>
          <Form.Item label="Mobile Number">
            <Input disabled value={mobileNumber} />
          </Form.Item>
          <Form.Item label="Post">
            <Input disabled value={post} />
          </Form.Item>
          <Form.Item label="Attendance Id">
            <Input disabled value={attendanceId} />
          </Form.Item>
          <Form.Item label="Department">
            <Input disabled value={department} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </div>
  );
};

export default StoreKeeperProfile;
