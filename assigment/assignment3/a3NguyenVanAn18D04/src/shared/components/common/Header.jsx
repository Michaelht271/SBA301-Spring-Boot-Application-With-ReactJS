import React from 'react';
import { Layout, Menu, Button, Typography, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { 
  HomeOutlined, 
  SolutionOutlined, 
  HistoryOutlined, 
  UserOutlined, 
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import {useAuth} from "../../../core/auth/useAuth.js";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ layoutType = 'public' }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getMenuItems = () => {
    if (layoutType === 'customer' || (layoutType === 'public' && isAuthenticated && user?.role === 'CUSTOMER')) {
      return [
        { key: '/', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
        { key: '/customer/booking', icon: <SolutionOutlined />, label: <Link to="/customer/booking">New Booking</Link> },
        { key: '/customer/booking-history', icon: <HistoryOutlined />, label: <Link to="/customer/booking-history">My History</Link> },
        { key: '/customer/profile', icon: <UserOutlined />, label: <Link to="/customer/profile">My Profile</Link> },
      ];
    }
    
    if (layoutType === 'staff' || (layoutType === 'public' && isAuthenticated && user?.role === 'STAFF')) {
        return [
          { key: '/staff/dashboard', icon: <DashboardOutlined />, label: <Link to="/staff/dashboard">Dashboard</Link> },
          { key: '/staff/customers', icon: <TeamOutlined />, label: <Link to="/staff/customers">Customers</Link> },
          { key: '/staff/rooms', icon: <HomeOutlined />, label: <Link to="/staff/rooms">Rooms</Link> },
          { key: '/staff/bookings', icon: <CalendarOutlined />, label: <Link to="/staff/bookings">Bookings</Link> },
        ];
      }

    return [
      { key: '/', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    ];
  };

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div className="logo" style={{ 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: '1.5rem', 
        marginRight: '2rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: 'inherit' }}>
          <HomeOutlined style={{ marginRight: '8px' }} />
          FUMiniHotel
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={getMenuItems()}
        style={{ flex: 1, minWidth: 0, borderBottom: 'none' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
        {isAuthenticated ? (
          <Space size="middle">
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', alignItems: 'flex-end' }}>
              <Text strong style={{ color: 'white' }}>{user.fullName}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px' }}>{user.role}</Text>
            </div>
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />} 
              onClick={logout}
              style={{ borderRadius: '6px' }}
            >
              Logout
            </Button>
          </Space>
        ) : (
          <Space>
            <Button 
              type="link" 
              style={{ color: 'white' }} 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              type="primary" 
              onClick={() => navigate('/register')}
              style={{ borderRadius: '6px' }}
            >
              Register
            </Button>
          </Space>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
