import React, { useState } from 'react';
import { Typography, Alert, Space, Input, Button, DatePicker, Radio, Grid } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '../../../core/auth/authService';
import { useAuth } from '../../../core/auth/useAuth';
import { decodeToken } from '../../../core/auth/jwtUtils';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  dateOfBirth: yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
  gender: yup.string().required('Gender is required'),
  idCardNumber: yup.string().matches(/^[0-9]{9}$|^[0-9]{12}$/, 'ID Card must be 9 or 12 digits').required('ID Card number is required'),
});

const RegisterForm = ({ onRegisterSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const screens = useBreakpoint();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      dateOfBirth: null,
      gender: 'Male',
      idCardNumber: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const registerData = {
        emailAddress: data.email,
        password: data.password,
        customerFullName: data.fullName,
        telephone: data.phone,
        customerBirthday: dayjs(data.dateOfBirth).format('YYYY-MM-DD'),
        customerStatus: 1
      };
      
      const response = await authService.register(registerData);
      const token = typeof response === 'string' ? response : response.token;
      if (!token) throw new Error('Registration failed, no token received');

      const decoded = decodeToken(token);
      const id = decoded.customerID || decoded.customerId || decoded.id;
      const userInfo = {
        email: decoded.email || decoded.sub || data.email,
        emailAddress: decoded.email || decoded.sub || data.email,
        fullName: decoded.fullName || data.fullName,
        customerFullName: decoded.fullName || data.fullName,
        role: 'CUSTOMER',
        customerID: id,
        customerId: id,
        id: id,
      };

      login(token, userInfo);
      if (onRegisterSuccess) onRegisterSuccess(userInfo);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Email might already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <div style={{ display: 'grid', gridTemplateColumns: screens.md ? '1fr 1fr' : '1fr', gap: '16px' }}>
          <div>
            <Text strong>Full Name</Text>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="John Doe" status={errors.fullName ? 'error' : ''} style={{ marginTop: '8px' }} />
              )}
            />
            {errors.fullName && <Text type="danger">{errors.fullName.message}</Text>}
          </div>

          <div>
            <Text strong>Email</Text>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="email@example.com" status={errors.email ? 'error' : ''} style={{ marginTop: '8px' }} />
              )}
            />
            {errors.email && <Text type="danger">{errors.email.message}</Text>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: screens.md ? '1fr 1fr' : '1fr', gap: '16px' }}>
          <div>
            <Text strong>Password</Text>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Min 8 chars, A-Z, 0-9" status={errors.password ? 'error' : ''} style={{ marginTop: '8px' }} />
              )}
            />
            {errors.password && <Text type="danger" style={{ fontSize: '12px' }}>{errors.password.message}</Text>}
          </div>

          <div>
            <Text strong>Confirm Password</Text>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Repeat password" status={errors.confirmPassword ? 'error' : ''} style={{ marginTop: '8px' }} />
              )}
            />
            {errors.confirmPassword && <Text type="danger">{errors.confirmPassword.message}</Text>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: screens.md ? '1fr 1fr' : '1fr', gap: '16px' }}>
          <div>
            <Text strong>Phone Number</Text>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="0123456789" status={errors.phone ? 'error' : ''} style={{ marginTop: '8px' }} />
              )}
            />
            {errors.phone && <Text type="danger">{errors.phone.message}</Text>}
          </div>

          <div>
            <Text strong>ID Card Number</Text>
            <Controller
              name="idCardNumber"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="9 or 12 digits" status={errors.idCardNumber ? 'error' : ''} style={{ marginTop: '8px' }} />
              )}
            />
            {errors.idCardNumber && <Text type="danger">{errors.idCardNumber.message}</Text>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: screens.md ? '1fr 1fr' : '1fr', gap: '16px' }}>
          <div>
            <Text strong>Date of Birth</Text>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker {...field} style={{ width: '100%', marginTop: '8px' }} status={errors.dateOfBirth ? 'error' : ''} />
              )}
            />
            {errors.dateOfBirth && <Text type="danger">{errors.dateOfBirth.message}</Text>}
          </div>

          <div>
            <Text strong>Gender</Text>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field} style={{ display: 'block', marginTop: '8px' }}>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                  <Radio value="Other">Other</Radio>
                </Radio.Group>
              )}
            />
            {errors.gender && <Text type="danger">{errors.gender.message}</Text>}
          </div>
        </div>

        <Button type="primary" htmlType="submit" block loading={loading} size="large" style={{ marginTop: '16px' }}>
          Register
        </Button>
      </Space>
    </form>
  );
};

export default RegisterForm;
