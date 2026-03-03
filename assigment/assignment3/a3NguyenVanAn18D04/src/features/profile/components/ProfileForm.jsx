import React from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Divider } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, CalendarOutlined } from '@ant-design/icons';

const ProfileForm = ({ form, onFinish, loading }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark="optional"
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item 
            name="customerFullName" 
            label="Full Name" 
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your full name" size="large" style={{ borderRadius: '8px' }} />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item 
            name="emailAddress" 
            label="Email Address (Read-only)"
          >
            <Input prefix={<MailOutlined />} disabled size="large" style={{ borderRadius: '8px' }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item 
            name="telephone" 
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" size="large" style={{ borderRadius: '8px' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item name="birthday" label="Date of Birth">
            <DatePicker 
              style={{ width: '100%', borderRadius: '8px' }} 
              prefix={<CalendarOutlined />} 
              size="large"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />
      
      <div style={{ textAlign: 'right' }}>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading} 
          size="large"
          style={{ minWidth: '150px', borderRadius: '6px' }}
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
