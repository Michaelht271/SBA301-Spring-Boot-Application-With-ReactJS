import React, { useEffect, useState } from 'react';
import { Button, Typography, message, Drawer, Descriptions, Tag, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import customerService from '../../features/customers/customerService';
import CustomerTable from '../../features/customers/components/CustomerTable';
import CustomerFormModal from '../../features/customers/components/CustomerFormModal';
import dayjs from 'dayjs';

const { Title } = Typography;

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await customerService.getAll();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error('Failed to fetch customers');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAdd = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingCustomer(record);
    setIsModalOpen(true);
  };

  const handleView = (record) => {
    setViewingCustomer(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await customerService.delete(id);
      message.success('Customer status set to Inactive');
      fetchCustomers();
    } catch (error) {
      message.error('Failed to deactivate customer', error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = {
        ...values,
        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null
      };

      if (editingCustomer) {
        await customerService.update(editingCustomer.customerID, data);
        message.success('Customer updated successfully');
      } else {
        await customerService.create(data);
        message.success('Customer created successfully');
      }
      setIsModalOpen(false);
      fetchCustomers();
    } catch (error) {
      message.error('Operation failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2}>Customer Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
          size="large"
          style={{ borderRadius: '8px' }}
        >
          Add Customer
        </Button>
      </div>

      <CustomerTable 
        customers={customers} 
        loading={loading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        onView={handleView}
      />

      <CustomerFormModal 
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onFinish={onFinish}
        editingCustomer={editingCustomer}
        loading={loading}
      />

      <Drawer
        title="Customer Detailed Information"
        width={500}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        style={{ borderRadius: '12px 0 0 12px' }}
      >
        {viewingCustomer && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    backgroundColor: '#1890ff', 
                    color: 'white', 
                    fontSize: '32px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto',
                    marginBottom: '12px'
                }}>
                    {viewingCustomer.customerFullName.charAt(0).toUpperCase()}
                </div>
                <Title level={4}>{viewingCustomer.customerFullName}</Title>
                <Tag color={viewingCustomer.customerStatus === 1 ? 'green' : 'red'}>
                    {viewingCustomer.customerStatus === 1 ? 'ACTIVE' : 'INACTIVE'}
                </Tag>
            </div>
            
            <Divider />
            
            <Descriptions column={1} bordered labelStyle={{ background: '#fafafa', fontWeight: 'bold' }}>
              <Descriptions.Item label="Customer ID">#{viewingCustomer.customerId}</Descriptions.Item>
              <Descriptions.Item label="Full Name">{viewingCustomer.customerFullName}</Descriptions.Item>
              <Descriptions.Item label="Email Address">{viewingCustomer.emailAddress}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{viewingCustomer.telephone}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{viewingCustomer.birthday ? dayjs(viewingCustomer.birthday).format('DD MMMM YYYY') : 'N/A'}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CustomersPage;
