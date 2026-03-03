import React from 'react';
import { Modal, Descriptions, Tag, Divider, Typography, Space, Button, Alert, Card, Row, Col } from 'antd';
import { BookOutlined, InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { BOOKING_STATUS_CONFIG } from '../booking.type';

const { Title, Text, Paragraph } = Typography;

const BookingDetailModal = ({ open, onCancel, booking, userRole, onStatusChange }) => {
  if (!booking) return null;

  const getStatusColor = (status) => {
    return BOOKING_STATUS_CONFIG[status?.toUpperCase()]?.color || 'default';
  };

  const details = booking.bookingDetails || [];

  return (
    <Modal
      title={
        <Space>
          <BookOutlined />
          <span>Booking Details - #{booking.bookingReservationID}</span>
        </Space>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
      style={{ borderRadius: '12px', overflow: 'hidden' }}
    >
      <div style={{ padding: '16px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Tag color={getStatusColor(booking.bookingStatus)} style={{ fontSize: '1.1rem', padding: '6px 20px', borderRadius: '20px' }}>
            {booking.bookingStatus?.toUpperCase()}
          </Tag>
        </div>
        
        <Descriptions title="Customer Information" bordered column={2} labelStyle={{ background: '#fafafa', fontWeight: '600' }}>
          <Descriptions.Item label="Name">{booking.customer?.customerFullName}</Descriptions.Item>
          <Descriptions.Item label="Email">{booking.customer?.emailAddress}</Descriptions.Item>
          <Descriptions.Item label="Phone" span={2}>{booking.customer?.telephone}</Descriptions.Item>
        </Descriptions>
        
        <Divider orientation="left">Booking Summary</Divider>
        
        <Descriptions bordered column={2} labelStyle={{ background: '#fafafa', fontWeight: '600' }}>
          <Descriptions.Item label="Booking ID">#{booking.bookingReservationID}</Descriptions.Item>
          <Descriptions.Item label="Booking Date">
            {booking.bookingDate ? dayjs(booking.bookingDate).format('YYYY-MM-DD HH:mm') : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Total Price" span={2}>
            <Text strong style={{ fontSize: '1.2rem', color: '#1890ff' }}>
                {(Number(booking.totalPrice) || 0).toLocaleString()} VND
            </Text>
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Room Details ({details.length})</Divider>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {details.map((detail, index) => {
                const room = detail.roomInformation;
                const start = detail.startDate;
                const end = detail.endDate;
                const nights = (start && end) ? dayjs(end).diff(dayjs(start), 'day') : 0;

                return (
                    <Card key={detail.bookingDetailID || index} size="small" type="inner" 
                        title={<Text strong>Room {room?.roomNumber}</Text>}
                        extra={<Tag color="blue">{room?.roomType?.roomTypeName}</Tag>}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>CHECK-IN</Text>
                                    <Text strong>{start ? dayjs(start).format('YYYY-MM-DD') : 'N/A'}</Text>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary" style={{ fontSize: '12px' }}>CHECK-OUT</Text>
                                    <Text strong>{end ? dayjs(end).format('YYYY-MM-DD') : 'N/A'}</Text>
                                </Space>
                            </Col>
                        </Row>
                        <Divider style={{ margin: '8px 0' }} />
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Text type="secondary">{nights} nights x {detail.actualPrice?.toLocaleString()} VND</Text>
                            </Col>
                            <Col>
                                <Text strong style={{ color: '#1890ff' }}>
                                    {(nights * (detail.actualPrice || 0)).toLocaleString()} VND
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                );
            })}
        </div>

        {userRole === 'STAFF' && (
          <>
            <Divider />
            <Title level={5}>Quick Actions</Title>
            <Space wrap>
              {booking.bookingStatus === 'PENDING' && (
                <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => onStatusChange(booking.bookingReservationID, 'CONFIRMED')}>Confirm</Button>
              )}
              {booking.bookingStatus === 'CONFIRMED' && (
                <Button type="primary" onClick={() => onStatusChange(booking.bookingReservationID, 'CHECKED_IN')}>Check-in</Button>
              )}
              {booking.bookingStatus === 'CHECKED_IN' && (
                <Button type="primary" onClick={() => onStatusChange(booking.bookingReservationID, 'CHECKED_OUT')}>Check-out</Button>
              )}
              {booking.bookingStatus !== 'CANCELLED' && booking.bookingStatus !== 'CHECKED_OUT' && (
                <Button danger icon={<CloseCircleOutlined />} onClick={() => onStatusChange(booking.bookingReservationID, 'CANCELLED')}>Cancel</Button>
              )}
            </Space>
          </>
        )}

        {userRole === 'CUSTOMER' && (
            <>
                <Divider orientation="left">Booking Policy</Divider>
                <div style={{ background: '#fff7e6', padding: '16px', borderRadius: '8px', border: '1px solid #ffd591' }}>
                    <Paragraph style={{ margin: 0 }}>
                        <InfoCircleOutlined style={{ color: '#fa8c16', marginRight: '8px' }} />
                        Check-in time is from 2:00 PM and check-out time is until 12:00 PM. 
                    </Paragraph>
                    <Paragraph style={{ margin: '8px 0 0 0' }}>
                        For any modifications, please contact our support team.
                    </Paragraph>
                </div>
            </>
        )}
      </div>
    </Modal>
  );
};

export default BookingDetailModal;