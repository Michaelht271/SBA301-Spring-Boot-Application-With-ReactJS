import React, { useState } from 'react';
import { Layout, Menu, Space, Typography, Button } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {useAuth} from "../../core/auth/useAuth.js";
import Footer from "../components/common/Footer.jsx";



const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const StaffLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { key: '/staff/dashboard', icon: <DesktopOutlined />, label: <Link to="/staff/dashboard">Dashboard</Link> },
    { key: '/staff/customers', icon: <UserOutlined />, label: <Link to="/staff/customers">Customers</Link> },
    { key: '/staff/rooms', icon: <HomeOutlined />, label: <Link to="/staff/rooms">Rooms</Link> },
    { key: '/staff/bookings', icon: <BookOutlined />, label: <Link to="/staff/bookings">Bookings</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white', 
          fontWeight: 'bold', 
          fontSize: '1.2rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {collapsed ? 'FU' : 'FUMiniHotel'}
        </div>
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline" items={menuItems} />
      </Sider>
      
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <Title level={4} style={{ margin: 0 }}>Staff Administration Panel</Title>
          <Space size="large">
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', alignItems: 'flex-end' }}>
              <Text strong>{user?.fullName}</Text>
              <Text type="secondary" style={{ fontSize: '11px' }}>{user?.role}</Text>
            </div>
            <Button type="primary" danger icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Button>
          </Space>
        </Header>
        
        <Content style={{ margin: '24px 16px', minHeight: 'calc(100vh - 64px - 100px)' }}>
          <div style={{ 
            padding: '24px', 
            background: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            minHeight: '100%'
          }}>
            <Outlet />
          </div>
        </Content>
        
        <Footer />
      </Layout>
    </Layout>
  );
};

export default StaffLayout;
