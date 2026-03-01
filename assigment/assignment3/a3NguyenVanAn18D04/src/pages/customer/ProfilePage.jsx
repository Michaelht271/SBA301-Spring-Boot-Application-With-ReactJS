import React, { useEffect } from 'react';
import { Form, Typography, Row, Col, message, Divider, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../core/auth/useAuth';
import { useCustomer } from '../../features/profile/useProfile';
import ProfileForm from '../../features/profile/components/ProfileForm';
import ProfileCard from '../../features/profile/components/ProfileCard';
import dayjs from 'dayjs';

const { Title } = Typography;

const ProfilePage = () => {
  const { user, login } = useAuth();
  const { profile, loading, fetchProfile, updateProfile } = useCustomer();
  const [form] = Form.useForm();

  useEffect(() => {
    const customerId = user?.customerID || user?.customerId || user?.id;
    if (customerId) {
      fetchProfile(customerId).then(data => {
        if (data) {
          const birthdayValue = data.birthday || data.customerBirthday;
          form.setFieldsValue({
            customerFullName: data.customerFullName,
            emailAddress: data.emailAddress,
            telephone: data.telephone,
            birthday: birthdayValue ? dayjs(birthdayValue) : null,
          });
        }
      });
    }
  }, [user, fetchProfile, form]);

  const onFinish = async (values) => {
    try {
      const customerId = user?.customerID || user?.customerId || user?.id;
      if (!customerId) {
        message.error('User session expired. Please login again.');
        return;
      }

      // Map form values to the structure the API expects
      const formattedBirthday = values.birthday ? values.birthday.format('YYYY-MM-DD') : null;
      
      const updateData = {
        ...profile, // Preserve existing fields like status and roles
        customerFullName: values.customerFullName,
        telephone: values.telephone,
        emailAddress: values.emailAddress || profile?.emailAddress || user?.email,
        birthday: formattedBirthday,
        customerBirthday: formattedBirthday, // Send both to be safe
        customerStatus: profile?.customerStatus ?? 1,
        roles: profile?.roles ?? 'CUSTOMER'
      };

      const updated = await updateProfile(customerId, updateData);
      
      // Update AuthContext user so header and other components refresh
      if (updated) {
          const token = localStorage.getItem('token');
          // Important: Sync ONLY from the customer API result to follow user requirement
          const updatedUserInfo = {
              ...user,
              customerFullName: updated.customerFullName,
              fullName: updated.customerFullName,
              telephone: updated.telephone,
              emailAddress: updated.emailAddress,
              email: updated.emailAddress,
              customerID: updated.customerID || customerId,
              customerId: updated.customerID || customerId,
              id: updated.customerID || customerId,
          };
          login(token, updatedUserInfo);
      }
      
      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Update profile error:', error);
      message.error(error.message || 'Failed to update profile');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Title level={2}><UserOutlined /> My Profile</Title>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <ProfileCard profile={profile} user={user} loading={loading} />
        </Col>
        <Col xs={24} md={16}>
          <Card title="Account Settings" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <ProfileForm form={form} onFinish={onFinish} loading={loading} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
