/**
 * Room Data Structure & Default Values based on Java Entity
 */

export const INITIAL_ROOM_STATE = {
    roomID: undefined,
    roomNumber: '',
    roomDetailDescription: '',
    roomMaxCapacity: 1,
    roomStatus: 'AVAILABLE',
    roomPricePerDay: 0,
    roomType: {
        roomTypeID: undefined
    }
};

export const ROOM_STATUS_OPTIONS = [
    { label: 'Available', value: 'AVAILABLE', color: 'green' },
    { label: 'Inactive', value: 'INACTIVE', color: 'red' },
];

export const MAP_ROOM_TO_FORM = (room) => ({
    roomID: room.roomID || room.roomId,
    roomNumber: room.roomNumber,
    roomDetailDescription: room.roomDetailDescription || room.roomDescription,
    roomMaxCapacity: room.roomMaxCapacity,
    roomPricePerDay: room.roomPricePerDay || room.roomPrice,
    roomStatus: room.roomStatus?.toUpperCase() || 'AVAILABLE',
    roomTypeID: room.roomType ? (room.roomType.roomTypeID || room.roomType.roomTypeId) : undefined,
});

export const MAP_FORM_TO_ROOM = (values) => ({
    roomID: values.roomID,
    roomNumber: values.roomNumber,
    roomDetailDescription: values.roomDetailDescription,
    roomMaxCapacity: values.roomMaxCapacity,
    roomPricePerDay: values.roomPricePerDay,
    roomStatus: values.roomStatus,
    roomType: {
        roomTypeID: values.roomTypeID
    }
});
