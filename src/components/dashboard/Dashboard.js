import React from 'react';
import { Card, Col, Row } from 'antd';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const cardStyle = {
  marginBottom: '10px', 
};

const Dashboard = () => (
  <div>
  <div style={{display:'flex',justifyContent:'space-between'}}>
    <p style={{ fontSize: '22px' }}>Dashboard</p>
    <Breadcrumb style={{ margin: '22px 0' }}>
      <Breadcrumb.Item>
        Dashboard
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/">
          <HomeOutlined />
        </a>
      </Breadcrumb.Item>
    </Breadcrumb>
  
    </div>
    <Row gutter={16} justify="start">
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
        <Card title="Total Items" bordered={false} style={{ background: '#fff2cd', ...cardStyle  }}>
          4
        </Card>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
        <Card title="Total Category" bordered={false} style={{ background: '#feede7', ...cardStyle  }}>
        5
        </Card>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
        <Card title="Total Elements" bordered={false} style={{ background: '#f9d9f9', ...cardStyle  }}>
        9
        </Card>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
        <Card title="Total Products" bordered={false} style={{ background: '#f9d9f9' , ...cardStyle }}>
        4
        </Card>
      </Col>
    </Row>
    <Row gutter={16} >
    
     
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
        <Card title="Total Members" bordered={false} style={{ background: '#fff2cd' , ...cardStyle }}>
        8
        </Card>
      </Col>
      <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
        <Card title="Total Warehouse" bordered={false} style={{ background: '#dbf9f0', ...cardStyle  }}>
        6
        </Card>
      </Col>
    </Row>
  </div>
);

export default Dashboard;
