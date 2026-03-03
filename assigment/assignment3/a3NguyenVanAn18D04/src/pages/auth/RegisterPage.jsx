import React from 'react';
import { Card, Typography, Button, Grid } from 'antd';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../features/auth/components/RegisterForm';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const RegisterPage = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const handleRegisterSuccess = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '24px' }}>
      <Card style={{ width: screens.xs ? '100%' : 700, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>Register Account</Title>
          <Text type="secondary">Join FUMiniHotel to book your rooms</Text>
        </div>

        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Text>Already have an account? </Text>
          <Button type="link" onClick={() => navigate('/login')}>Login here</Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
