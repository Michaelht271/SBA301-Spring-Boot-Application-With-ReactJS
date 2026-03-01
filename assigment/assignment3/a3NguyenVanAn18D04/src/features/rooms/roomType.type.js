/**
 * Room Type Data Structure & Default Values based on Java Entity
 */

export const INITIAL_ROOM_TYPE_STATE = {
    roomTypeID: undefined,
    roomTypeName: '',
    roomTypeDescription: '',
    roomTypeNote: ''
};

export const MAP_ROOM_TYPE_TO_FORM = (type) => ({
    roomTypeID: type.roomTypeID,
    roomTypeName: type.roomTypeName,
    roomTypeDescription: type.roomTypeDescription,
    roomTypeNote: type.roomTypeNote,
});

export const MAP_FORM_TO_ROOM_TYPE = (values) => ({
    roomTypeID: values.roomTypeID,
    roomTypeName: values.roomTypeName,
    roomTypeDescription: values.roomTypeDescription,
    roomTypeNote: values.roomTypeNote,
});
