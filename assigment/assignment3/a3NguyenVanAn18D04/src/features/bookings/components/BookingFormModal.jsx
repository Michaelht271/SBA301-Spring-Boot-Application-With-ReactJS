import React, { useEffect } from 'react';
import { Modal, Form, Select, DatePicker, InputNumber, Row, Col, Space, Button } from 'antd';
import dayjs from 'dayjs';
import { INITIAL_BOOKING_STATE, BOOKING_STATUS_CONFIG, MAP_BOOKING_TO_FORM, MAP_FORM_TO_BOOKING } from '../booking.type';

const { Option } = Select;
const { RangePicker } = DatePicker;

const BookingFormModal = ({ open, onCancel, onFinish, editingBooking, loading, rooms, customers }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingBooking) {
                form.setFieldsValue(MAP_BOOKING_TO_FORM(editingBooking));
            } else {
                form.resetFields();
                form.setFieldsValue(INITIAL_BOOKING_STATE);
            }
        }
    }, [open, editingBooking, form]);

    const handleValuesChange = (changedValues, allValues) => {
        const { roomID, dates } = allValues;
        if (roomID && dates && dates[0] && dates[1]) {
            const selectedRoom = (rooms || []).find(r => (r.roomID || r.roomId) === roomID);
            if (selectedRoom) {
                const days = dates[1].diff(dates[0], 'day');
                const price = selectedRoom.roomPricePerDay || selectedRoom.roomPrice || 0;
                if (days > 0) {
                    form.setFieldsValue({ totalPrice: days * price });
                }
            }
        }
    };

    const handleFinish = (values) => {
        onFinish(MAP_FORM_TO_BOOKING(values));
    };

    return (
        <Modal
            title={editingBooking ? 'Edit Booking' : 'Create New Booking'}
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
                onFinish={handleFinish}
                onValuesChange={handleValuesChange}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="customerID" label="Customer" rules={[{ required: true, message: 'Please select a customer' }]}>
                            <Select 
                                placeholder="Select customer" 
                                size="large" 
                                showSearch
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                style={{ borderRadius: '8px' }}
                            >
                                {Array.isArray(customers) ? customers.map(c => (
                                    <Option key={c.customerID || c.customerId} value={c.customerID || c.customerId}>
                                        {c.customerFullName} ({c.emailAddress})
                                    </Option>
                                )) : null}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="roomID" label="Room" rules={[{ required: true, message: 'Please select a room' }]}>
                            <Select 
                                placeholder="Select room" 
                                size="large"
                                showSearch
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                style={{ borderRadius: '8px' }}
                            >
                                {Array.isArray(rooms) ? rooms.filter(r => 
                                    r.roomStatus === 'Available' || 
                                    (editingBooking && ((r.roomID || r.roomId) === (editingBooking.room?.roomID ?? editingBooking.roomID)))
                                ).map(r => (
                                    <Option key={r.roomID || r.roomId} value={r.roomID || r.roomId}>
                                        {r.roomNumber} - {r.roomType?.roomTypeName} ({(r.roomPricePerDay || r.roomPrice)?.toLocaleString()} VND)
                                    </Option>
                                )) : null}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="dates" label="Start & End Dates" rules={[{ required: true, message: 'Please select dates' }]}>
                            <RangePicker 
                                style={{ width: '100%', borderRadius: '8px' }} 
                                size="large"
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="bookingStatus" label="Status" rules={[{ required: true }]}>
                            <Select size="large" style={{ borderRadius: '8px' }}>
                                {Object.values(BOOKING_STATUS_CONFIG).map(opt => (
                                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="totalPrice" label="Total Price (VND)" rules={[{ required: true }]}>
                            <InputNumber 
                                style={{ width: '100%', borderRadius: '8px' }} 
                                size="large"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{ textAlign: 'right', marginBottom: 0, marginTop: '24px' }}>
                    <Space>
                        <Button onClick={onCancel} size="large" style={{ borderRadius: '8px' }}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading} size="large" style={{ borderRadius: '8px' }}>
                            {editingBooking ? 'Update Booking' : 'Create Booking'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BookingFormModal;
