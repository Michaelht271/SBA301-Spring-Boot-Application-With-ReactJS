import React from 'react';
import { Table, Button, Space, Typography, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CustomerTable = ({ customers, loading, onEdit, onDelete, onView }) => {
  const columns = [
    { title: 'ID', dataIndex: 'customerID', key: 'customerID', width: 80, render: (id) => <Text strong>#{id}</Text> },
    { title: 'Full Name', dataIndex: 'customerFullName', key: 'customerFullName', sorter: (a, b) => a.customerFullName.localeCompare(b.customerFullName) },
    { title: 'Email', dataIndex: 'emailAddress', key: 'emailAddress' },
    { title: 'Phone', dataIndex: 'telephone', key: 'telephone' },
    { 
      title: 'Status', 
      dataIndex: 'customerStatus', 
      key: 'customerStatus',
      render: (status) => (
        <Tag color={status === 1 ? 'green' : 'red'} style={{ borderRadius: '4px' }}>
          {status === 1 ? 'ACTIVE' : 'INACTIVE'}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<InfoCircleOutlined />} onClick={() => onView(record)}>View</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to deactivate this customer?"
            onConfirm={() => onDelete(record.customerID)}
            okText="Yes"
            cancelText="No"
            disabled={record.customerStatus === 0}
          >
            <Button type="link" danger icon={<DeleteOutlined />} disabled={record.customerStatus === 0}>Deactivate</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={customers || []} 
      rowKey="customerID"
      loading={loading}
      pagination={{ pageSize: 10 }}
      style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    />
  );
};

export default CustomerTable;
