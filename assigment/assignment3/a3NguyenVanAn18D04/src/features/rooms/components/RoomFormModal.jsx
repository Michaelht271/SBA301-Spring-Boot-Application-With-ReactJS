import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Row, Col, Space, Button } from 'antd';
import { INITIAL_ROOM_STATE, ROOM_STATUS_OPTIONS, MAP_ROOM_TO_FORM, MAP_FORM_TO_ROOM } from '../room.type';

const { Option } = Select;

const RoomFormModal = ({ open, onCancel, onFinish, editingRoom, loading, roomTypes, form: externalForm }) => {
    const [internalForm] = Form.useForm();
    const form = externalForm || internalForm;

    useEffect(() => {
        if (open) {
            if (editingRoom) {
                form.setFieldsValue(MAP_ROOM_TO_FORM(editingRoom));
            } else {
                form.resetFields();
                // Set default values but remove roomID for new creation
                const { roomID, ...rest } = INITIAL_ROOM_STATE;
                form.setFieldsValue(rest);
            }
        } else {
            form.resetFields();
        }
    }, [open, editingRoom, form]);

    const handleFinish = (values) => {
        onFinish(MAP_FORM_TO_ROOM(values));
    };

    return (
        <Modal
            title={editingRoom ? 'Edit Room' : 'Add New Room'}
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
            >
                {editingRoom && (
                    <Form.Item name="roomID" label="Room ID">
                        <Input disabled />
                    </Form.Item>
                )}

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="roomNumber" label="Room Number" rules={[{ required: true, message: 'Please enter room number' }]}>
                            <Input placeholder="Enter room number" size="large" style={{ borderRadius: '8px' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="roomMaxCapacity" label="Max Capacity" rules={[{ required: true, message: 'Please enter max capacity' }]}>
                            <InputNumber style={{ width: '100%', borderRadius: '8px' }} size="large" min={1} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="roomPricePerDay" label="Price per Day (VND)" rules={[{ required: true, message: 'Please enter price per day' }]}>
                            <InputNumber
                                style={{ width: '100%', borderRadius: '8px' }}
                                size="large"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                min={0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="roomStatus" label="Status" rules={[{ required: true }]}>
                            <Select size="large" style={{ borderRadius: '8px' }}>
                                {ROOM_STATUS_OPTIONS.map(opt => (
                                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="roomDetailDescription" label="Room Detail Description">
                    <Input.TextArea rows={4} placeholder="Enter room description" style={{ borderRadius: '8px' }} />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="roomTypeID" label="Room Type" rules={[{ required: true, message: 'Please select room type' }]}>
                            <Select
                                placeholder="Select room type"
                                size="large"
                                style={{ borderRadius: '8px' }}
                                loading={loading}
                                showSearch
                                optionFilterProp="children"
                            >
                                {roomTypes?.map(type => (
                                    <Option key={type.roomTypeID} value={type.roomTypeID}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{type.roomTypeName}</span>
                                            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>{type.roomTypeDescription?.substring(0, 30)}...</span>
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{ textAlign: 'right', marginBottom: 0, marginTop: '24px' }}>
                    <Space>
                        <Button onClick={onCancel} size="large" style={{ borderRadius: '8px' }}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading} size="large" style={{ borderRadius: '8px' }}>
                            {editingRoom ? 'Update Room' : 'Create Room'}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RoomFormModal;
