import React from 'react';
import { Layout, Typography, Divider, Row, Col, Space } from 'antd';
import { 
  HomeOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined 
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Title, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ 
      backgroundColor: '#f0f2f5', 
      padding: '48px 50px', 
      color: '#595959',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
    }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Title level={4} style={{ marginBottom: '24px' }}>
            <HomeOutlined style={{ marginRight: '8px' }} />
            FUMiniHotel
          </Title>
          <Paragraph>
            The best hotel management system for FPT University students. 
            Book your rooms quickly and securely with our mini hotel system.
          </Paragraph>
          <Space size="large" style={{ fontSize: '20px', marginTop: '16px' }}>
            <Link href="#"><FacebookOutlined /></Link>
            <Link href="#"><TwitterOutlined /></Link>
            <Link href="#"><InstagramOutlined /></Link>
          </Space>
        </Col>
        
        <Col xs={24} md={8}>
          <Title level={5} style={{ marginBottom: '24px' }}>Quick Links</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Link href="/" style={{ color: '#595959' }}>Home</Link>
            <Link href="/customer/booking" style={{ color: '#595959' }}>Book Now</Link>
            <Link href="/customer/profile" style={{ color: '#595959' }}>My Profile</Link>
            <Link href="/customer/booking-history" style={{ color: '#595959' }}>Booking History</Link>
          </Space>
        </Col>
        
        <Col xs={24} md={8}>
          <Title level={5} style={{ marginBottom: '24px' }}>Contact Info</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text><MailOutlined style={{ marginRight: '8px' }} /> contact@fuminihotel.com</Text>
            <Text><PhoneOutlined style={{ marginRight: '8px' }} /> +84 123 456 789</Text>
            <Text>📍 FPT University, Hoa Lac Hi-Tech Park, Hanoi</Text>
          </Space>
        </Col>
      </Row>
      
      <Divider style={{ margin: '32px 0' }} />
      
      <div style={{ textAlign: 'center' }}>
        <Text type="secondary">
          FUMiniHotel ©{new Date().getFullYear()} Created by a3NguyenVanAn18D04
        </Text>
      </div>
    </AntFooter>
  );
};

const Paragraph = ({ children }) => (
  <div style={{ marginBottom: '16px', lineHeight: '1.6' }}>
    <Text type="secondary">{children}</Text>
  </div>
);

export default Footer;
