import React from 'react';
import { Card, Typography, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../../features/auth/components/LoginForm';
import { ROLES } from '../../core/constants';

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = (userInfo) => {
    const from = location.state?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
    } else {
      if (userInfo.role === ROLES.STAFF) {
        navigate('/staff/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>Login</Title>
          <Text type="secondary">Welcome back to FUMiniHotel</Text>
        </div>

        <LoginForm onLoginSuccess={handleLoginSuccess} />

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Text>Don't have an account? </Text>
          <Button type="link" onClick={() => navigate('/register')}>Register now</Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
