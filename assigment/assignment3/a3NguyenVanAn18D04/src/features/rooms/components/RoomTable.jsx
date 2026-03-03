import React from 'react';
import { Table, Button, Space, Typography, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {ROOM_STATUS} from "../../../core/constants/index.js";
import { ROOM_STATUS_OPTIONS } from '../room.type';

const { Text } = Typography;

const RoomTable = ({ rooms, loading, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    return ROOM_STATUS_OPTIONS.find(opt => opt.value === status)?.color || 'default';
  };

  const columns = [
    { title: 'ID', dataIndex: 'roomId', key: 'roomId', width: 80, render: (id) => <Text strong>#{id}</Text> },
    //{ title: 'Room Name', dataIndex: 'roomName', key: 'roomName', sorter: (a, b) => (a.roomName || '').localeCompare(b.roomName || '') },
    { title: 'Room Number', dataIndex: 'roomNumber', key: 'roomNumber' },
    { title: 'Type', dataIndex: ['roomType', 'roomTypeName'], key: 'roomType' },
    { 
      title: 'Price/Night', 
      dataIndex: 'roomPricePerDay',
      key: 'roomPricePerDay',
      render: (price) => <Text strong style={{ color: '#1890ff' }}>{price?.toLocaleString()} VND</Text>,
      sorter: (a, b) => (a.roomPrice || 0) - (b.roomPrice || 0)
    },
    { 
      title: 'Status', 
      dataIndex: 'roomStatus', 
      key: 'roomStatus',
      render: (status) => (
        <Tag color={getStatusColor(status)} style={{ borderRadius: '4px' }}>
          {status?.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this room?"
            onConfirm={() => onDelete(record.roomId)}
            okText="Yes"
            cancelText="No"
            disabled={record.roomStatus === ROOM_STATUS.INACTIVE}
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              disabled={record.roomStatus === ROOM_STATUS.INACTIVE}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={rooms || []} 
      rowKey="roomId" 
      loading={loading}
      pagination={{ pageSize: 10 }}
      style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    />
  );
};

export default RoomTable;
