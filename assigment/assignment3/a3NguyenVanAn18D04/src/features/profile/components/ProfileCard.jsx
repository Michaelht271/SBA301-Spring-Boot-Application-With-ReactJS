import React from 'react';
import { Card, Typography, Tag, Space, Divider } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProfileCard = ({ profile, user, loading }) => {
  const displayName = profile?.customerFullName || profile?.fullName || user?.fullName || user?.customerFullName;
  const displayEmail = profile?.emailAddress || user?.email || user?.emailAddress;
  const displayPhone = profile?.telephone || user?.telephone;

  return (
    <Card 
      loading={loading && !profile}
      style={{ textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          backgroundColor: '#1890ff', 
          color: 'white', 
          fontSize: '48px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)'
        }}>
          {displayName?.charAt(0).toUpperCase()}
        </div>
      </div>
      <Title level={4} style={{ marginBottom: '4px' }}>{displayName}</Title>
      <Tag color="blue" style={{ marginBottom: '24px' }}>{user?.role || 'CUSTOMER'}</Tag>
      
      <div style={{ textAlign: 'left', background: '#fafafa', padding: '16px', borderRadius: '8px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text type="secondary" style={{ fontSize: '12px' }}>EMAIL</Text>
            <div style={{ wordBreak: 'break-all' }}><MailOutlined /> {displayEmail}</div>
          </div>
          <Divider style={{ margin: '8px 0' }} />
          <div>
            <Text type="secondary" style={{ fontSize: '12px' }}>PHONE</Text>
            <div><PhoneOutlined /> {displayPhone || 'Not provided'}</div>
          </div>
        </Space>
      </div>
    </Card>
  );
};

export default ProfileCard;
