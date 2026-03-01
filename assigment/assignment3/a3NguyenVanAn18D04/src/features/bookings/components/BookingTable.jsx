import React from 'react';
import { Table, Button, Space, Typography, Tag, Select } from 'antd';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { BOOKING_STATUS_CONFIG } from '../booking.type';

const { Text } = Typography;
const { Option } = Select;

const BookingTable = ({ bookings, loading, onDetail, onEdit, onStatusChange, userRole }) => {
  const getStatusColor = (status) => {
    return BOOKING_STATUS_CONFIG[status?.toUpperCase()]?.color || 'default';
  };

  const columns = [
    { 
        title: 'Booking ID', 
        dataIndex: 'bookingReservationID', 
        key: 'bookingReservationID', 
        width: 100,
        render: (id) => <Text strong>#{id}</Text>
    },
    { title: 'Customer', dataIndex: ['customer', 'customerFullName'], key: 'customer', hidden: userRole === 'CUSTOMER' },
    { 
      title: 'Booking Date',
      key: 'bookingDate',
      render: (_, record) => {
        // Handle flattened DTO or nested details array
        const bookingDate = record.bookingDate
        return (
          <Space direction="vertical" size={0}>
            <Text type="secondary" style={{ fontSize: '12px' }}> {bookingDate ? dayjs(bookingDate).format('DD/MM/YYYY') : 'N/A'}</Text>

          </Space>
        );
      }
    },
    { 
      title: 'Total', 
      dataIndex: 'totalPrice', 
      key: 'totalPrice',
      render: (price) => <Text strong style={{ color: '#1890ff' }}>{price?.toLocaleString()} VND</Text>
    },
    { 
      title: 'Status', 
      dataIndex: 'bookingStatus', 
      key: 'bookingStatus',
      render: (status) => <Tag color={getStatusColor(status)}>{status?.toUpperCase()}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<InfoCircleOutlined />} onClick={() => onDetail(record)}>Details</Button>
          {userRole === 'STAFF' && (
            <>
              <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>Edit</Button>
              <Select 
                size="small"
                style={{ borderRadius: '6px', minWidth: '120px' }}
                value={record.bookingStatus}
                onChange={(val) => onStatusChange(record.bookingReservationID, val)}
              >
                {Object.values(BOOKING_STATUS_CONFIG).map(opt => (
                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                ))}
              </Select>
            </>
          )}
        </Space>
      ),
    },
  ].filter(col => !col.hidden);

  return (
    <Table 
        columns={columns} 
        dataSource={bookings || []} 
        rowKey="bookingReservationID" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    />
  );
};

export default BookingTable;
