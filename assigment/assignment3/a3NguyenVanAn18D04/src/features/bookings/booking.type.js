import dayjs from 'dayjs';

/**
 * Booking Data Structure & Default Values based on Java Entity
 */

export const INITIAL_BOOKING_STATE = {
    bookingReservationID: undefined,
    customerID: undefined,
    roomID: undefined,
    dates: null,
    totalPrice: 0,
    bookingStatus: 'Pending',
};

export const BOOKING_STATUS_CONFIG = {
    PENDING: { label: 'Pending', value: 'Pending', color: 'gold' },
    CONFIRMED: { label: 'Confirmed', value: 'Confirmed', color: 'cyan' },
    CHECKED_IN: { label: 'Checked-in', value: 'Checked-in', color: 'blue' },
    CHECKED_OUT: { label: 'Checked-out', value: 'Checked-out', color: 'green' },
    CANCELLED: { label: 'Cancelled', value: 'Cancelled', color: 'red' },
};

export const MAP_BOOKING_TO_FORM = (booking) => {
    const startDate = booking.startDate || booking.checkInDate || (booking.bookingDetails && booking.bookingDetails[0]?.startDate);
    const endDate = booking.endDate || booking.checkOutDate || (booking.bookingDetails && booking.bookingDetails[0]?.endDate);
    const roomID = booking.roomID || booking.roomId || (booking.bookingDetails && booking.bookingDetails[0]?.roomInformation?.roomID);

    return {
        bookingReservationID: booking.bookingReservationID || booking.bookingReservationId,
        customerID: booking.customer?.customerID ?? booking.customer?.customerId ?? booking.customerID ?? booking.customerId,
        roomID: roomID,
        dates: [
            startDate ? dayjs(startDate) : null,
            endDate ? dayjs(endDate) : null,
        ],
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
    };
};
export const MAP_FORM_TO_BOOKING = (values) => {
    const { selectedRooms, ...rest } = values;

    // Create bookingDetails with individual dates for each room
    const bookingDetails = (selectedRooms || []).map(room => {
        const start = room.dates && room.dates[0] ? room.dates[0] : null;
        const end = room.dates && room.dates[1] ? room.dates[1] : null;

        return {
            roomID: room.roomID || room.roomId,
            startDate: start ? start.format('YYYY-MM-DDTHH:mm:ss') : null,
            endDate: end ? end.format('YYYY-MM-DDTHH:mm:ss') : null,
            actualPrice: room.roomPricePerDay || room.roomPrice
        };
    });

    // Use the earliest start date and latest end date for the main booking record if needed
    const allStarts = selectedRooms.filter(r => r.dates?.[0]).map(r => r.dates[0]);
    const allEnds = selectedRooms.filter(r => r.dates?.[1]).map(r => r.dates[1]);

    const minStart = allStarts.length > 0 ? dayjs.min ? dayjs.min(allStarts) : allStarts.sort((a,b) => a.diff(b))[0] : null;
    const maxEnd = allEnds.length > 0 ? dayjs.max ? dayjs.max(allEnds) : allEnds.sort((a,b) => b.diff(a))[0] : null;

    return {
        ...rest,
        customerID: values.customerID,
        bookingDetails: bookingDetails,
        startDate: minStart ? minStart.format('YYYY-MM-DDTHH:mm:ss') : null,
        endDate: maxEnd ? maxEnd.format('YYYY-MM-DDTHH:mm:ss') : null,
        checkInDate: minStart ? minStart.format('YYYY-MM-DD') : null,
        checkOutDate: maxEnd ? maxEnd.format('YYYY-MM-DD') : null,
        bookingDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        totalPrice: values.totalPrice,
    };
};

