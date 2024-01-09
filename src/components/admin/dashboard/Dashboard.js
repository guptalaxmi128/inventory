import React, { useState, useEffect } from "react";
import { Card, Col, Row, Spin } from "antd";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import {
  getTotalAsset,
  getTotalCategory,
  getTotalEmployee,
  getTotalMember,
} from "../../../actions/admin/dashboard/dashboard";
import { useDispatch } from "react-redux";

const cardStyle = {
  marginBottom: "10px",
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [totalCategory, setTotalCategory] = useState("");
  const [totalAsset, setTotalAsset] = useState("");
  const [totalEmployee, setTotalEmployee] = useState("");
  const [totalMember, setTotalMember] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dispatch(getTotalAsset());
        setTotalAsset(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
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
        const result = await dispatch(getTotalCategory());
        setTotalCategory(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
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
        const result = await dispatch(getTotalEmployee());
        setTotalEmployee(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
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
        const result = await dispatch(getTotalMember());
        setTotalMember(result.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontSize: "22px" }}>Dashboard</p>
        <Breadcrumb style={{ margin: "22px 0" }}>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/admin/dashboard">
              <HomeOutlined />
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
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
        <>
          <Row gutter={16} justify="start">
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
              <Card
                title="Total Items"
                bordered={false}
                style={{ background: "#fff2cd", ...cardStyle }}
              >
                {totalAsset}
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
              <Card
                title="Total Category"
                bordered={false}
                style={{ background: "#feede7", ...cardStyle }}
              >
                {totalCategory}
              </Card>
            </Col>
            {/* <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
              <Card
                title="Total Elements"
                bordered={false}
                style={{ background: "#f9d9f9", ...cardStyle }}
              >
                9
              </Card>
            </Col> */}
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
              <Card
                title="Total Employees"
                bordered={false}
                style={{ background: "#dbf9f0", ...cardStyle }}
              >
                {totalEmployee}
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
              <Card
                title="Total Members"
                bordered={false}
                style={{ background: "#f9d9f9", ...cardStyle }}
              >
                {totalMember}
              </Card>
            </Col>
          </Row>
          {/* <Row gutter={16}> */}
            {/* <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
              <Card
                title="Total Products"
                bordered={false}
                style={{ background: "#f9d9f9", ...cardStyle }}
              >
                4
              </Card>
            </Col> */}

         
            {/* <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
              <Card
                title="Total Warehouse"
                bordered={false}
                style={{ background: "#dbf9f0", ...cardStyle }}
              >
                6
              </Card>
            </Col> */}
          {/* </Row> */}
        </>
      )}
    </div>
  );
};

export default Dashboard;
