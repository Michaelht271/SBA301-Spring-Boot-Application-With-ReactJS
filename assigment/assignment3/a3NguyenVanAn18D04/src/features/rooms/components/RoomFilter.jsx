import React from 'react';
import { Row, Col, Card, Input, Select, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {ROOM_STATUS} from "../../../core/constants/index.js";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const RoomFilter = ({ onSearch, onStatusChange, initialStatus = 'All' }) => {
  return (
    <Card style={{ marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={12} lg={14}>
          <Search
            placeholder="Search by room name or type..."
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={onSearch}
            allowClear
            style={{ borderRadius: '8px' }}
          />
        </Col>
        <Col xs={24} md={12} lg={10}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Text strong>Filter Status:</Text>
            <Select 
              defaultValue={initialStatus} 
              style={{ width: 150 }} 
              onChange={onStatusChange} 
              size="large"
              style={{ borderRadius: '8px', minWidth: '150px' }}
            >
              <Option value="All">All Status</Option>
              <Option value={ROOM_STATUS.AVAILABLE}>Available</Option>
              <Option value={ROOM_STATUS.INACTIVE}>Inactive</Option>
            </Select>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default RoomFilter;
