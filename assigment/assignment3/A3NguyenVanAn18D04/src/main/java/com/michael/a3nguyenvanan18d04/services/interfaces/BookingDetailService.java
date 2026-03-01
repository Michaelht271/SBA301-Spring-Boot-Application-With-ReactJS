package com.michael.a3nguyenvanan18d04.services.interfaces;

import com.michael.a3nguyenvanan18d04.dtos.booking.request.BookingDetailRequestDTO;
import com.michael.a3nguyenvanan18d04.entites.BookingDetail;

import java.util.List;

public interface BookingDetailService {
	List<BookingDetail> getBookingDetailServices(Long id);
	
	BookingDetail getBookingDetailById(Long id);
	
	BookingDetail createBookingDetail(BookingDetailRequestDTO bookingDetailRequestDTO);
	
	BookingDetail updateBookingDetail(Long id, BookingDetail bookingDetail);
	
	void deleteBookingDetail(Long id);

	boolean existsByRoomId(Long roomId);
}
