import React from 'react';
import { Card, Tag, Typography, Button, Space } from 'antd';
import { HomeOutlined, DollarOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const RoomCard = ({ room, onBook }) => {
  if (!room) return null;

  const roomNumber = room.roomNumber;
  const roomPricePerDay = room.roomPricePerDay || room.roomPrice;
  const roomDetailDescription = room.roomDetailDescription || room.roomDescription;
  
  return (
    <Card
      hoverable
      style={{ borderRadius: '12px', overflow: 'hidden' }}
      cover={
        <div style={{ height: '200px', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HomeOutlined style={{ fontSize: '64px', color: '#bfbfbf' }} />
        </div>
      }
      actions={[
        <Button 
          type="primary" 
          onClick={() => onBook(room)}
          disabled={room.roomStatus !== 'Available'}
          style={{ borderRadius: '6px' }}
        >
          Book Now
        </Button>
      ]}
    >
      <Card.Meta
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.1rem' }}>Room {roomNumber}</span>
            <Tag color={room.roomStatus === 'Available' ? 'green' : 'red'} style={{ borderRadius: '4px' }}>
              {room.roomStatus?.toUpperCase()}
            </Tag>
          </div>
        }
        description={
          <Space direction="vertical" style={{ width: '100%', marginTop: '8px' }}>
            <Text type="secondary" size="small">Type: {room.roomType?.roomTypeName || 'N/A'}</Text>
            <Text strong style={{ fontSize: '1.2rem', color: '#1890ff' }}>
              <DollarOutlined /> {roomPricePerDay?.toLocaleString() || '0'} / Night
            </Text>
            <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
              {roomDetailDescription || 'No description available.'}
            </Paragraph>
          </Space>
        }
      />
    </Card>
  );
};

export default RoomCard;
