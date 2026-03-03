import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col, Space, Button } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const CustomerFormModal = ({ open, onCancel, onFinish, editingCustomer, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (editingCustomer) {
        form.setFieldsValue({
          ...editingCustomer,
          birthday: editingCustomer.birthday ? dayjs(editingCustomer.birthday) : null
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ customerStatus: 1 });
      }
    }
  }, [open, editingCustomer, form]);

  return (
    <Modal
      title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
      style={{ borderRadius: '12px', overflow: 'hidden' }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => onFinish(values)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="customerFullName" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
              <Input placeholder="Enter full name" size="large" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="emailAddress" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]}>
              <Input placeholder="Enter email" size="large" style={{ borderRadius: '8px' }} disabled={!!editingCustomer} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="telephone" label="Telephone" rules={[{ required: true, message: 'Please enter telephone' }]}>
              <Input placeholder="Enter telephone" size="large" style={{ borderRadius: '8px' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="birthday" label="Birthday">
              <DatePicker style={{ width: '100%', borderRadius: '8px' }} size="large" format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="customerStatus" label="Status" rules={[{ required: true }]}>
          <Select size="large" style={{ borderRadius: '8px' }}>
            <Option value={1}>Active</Option>
            <Option value={0}>Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0, marginTop: '24px' }}>
          <Space>
            <Button onClick={onCancel} size="large" style={{ borderRadius: '8px' }}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading} size="large" style={{ borderRadius: '8px' }}>
              {editingCustomer ? 'Update Customer' : 'Create Customer'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerFormModal;
