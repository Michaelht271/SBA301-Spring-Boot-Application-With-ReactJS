import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert, Space } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '../../../core/auth/authService';
import { useAuth } from '../../../core/auth/useAuth';
import { decodeToken } from '../../../core/auth/jwtUtils';
import { ROLES } from '../../../core/constants';

const { Title, Text } = Typography;

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const loginData = {
        username: data.email,
        password: data.password
      };
      const response = await authService.login(loginData);
      const token = typeof response === 'string' ? response : response.token;
      
      if (!token) throw new Error('No token received');

      const decoded = decodeToken(token);
      localStorage.setItem('token', token);

      let userInfo = {};
      try {
        const meData = await authService.getMe();
        
        // Extract role from roles array (Spring Security format: [{authority: "ROLE_..."}] or ["ROLE_..."])
        const rawRoles = meData.roles || [];
        const roleObj = rawRoles.find(r => (typeof r === 'string' ? r : r.authority)?.startsWith('ROLE_'));
        const roleString = (typeof roleObj === 'string' ? roleObj : roleObj?.authority) || 'ROLE_CUSTOMER';
        const normalizedRole = roleString.replace('ROLE_', '');

        // Try to find ID from any possible source (meData or token)
        const id = meData.customerId || meData.customerID || meData.id || decoded.customerId || decoded.customerID || decoded.id;

        userInfo = {
          email: meData.email || decoded.sub || data.email,
          emailAddress: meData.email || decoded.sub || data.email,
          fullName: meData.fullName || 'User',
          customerFullName: meData.fullName || 'User',
          telephone: meData.telephone,
          birthday: meData.birthday,
          role: normalizedRole,
          customerID: id,
          customerId: id,
          id: id
        };
      } catch (meError) {
        console.error("Failed to fetch /me info", meError);
        const rawRole = (decoded.authorities?.find(a => a.startsWith('ROLE_')) || ROLES.CUSTOMER).replace('ROLE_', '');
        const id = decoded.customerId || decoded.customerID || decoded.id;
        
        userInfo = {
          email: decoded.sub || data.email,
          emailAddress: decoded.sub || data.email,
          fullName: rawRole === 'STAFF' ? 'Staff User' : 'Customer',
          customerFullName: rawRole === 'STAFF' ? 'Staff User' : 'Customer',
          role: rawRole,
          customerID: id,
          customerId: id,
          id: id
        };
      }

      login(token, userInfo);
      if (onLoginSuccess) onLoginSuccess(userInfo);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Text strong>Email</Text>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your email" status={errors.email ? 'error' : ''} style={{ marginTop: '8px' }} />
            )}
          />
          {errors.email && <Text type="danger">{errors.email.message}</Text>}
        </div>

        <div>
          <Text strong>Password</Text>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Enter your password" status={errors.password ? 'error' : ''} style={{ marginTop: '8px' }} />
            )}
          />
          {errors.password && <Text type="danger">{errors.password.message}</Text>}
        </div>

        <Button type="primary" htmlType="submit" block loading={loading} size="large">
          Login
        </Button>
      </Space>
    </form>
  );
};

export default LoginForm;
