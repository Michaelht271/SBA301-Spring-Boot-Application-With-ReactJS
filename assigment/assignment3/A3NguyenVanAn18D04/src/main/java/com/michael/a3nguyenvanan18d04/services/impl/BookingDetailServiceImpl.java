package com.michael.a3nguyenvanan18d04.services.impl;

import com.michael.a3nguyenvanan18d04.dtos.booking.request.BookingDetailRequestDTO;
import com.michael.a3nguyenvanan18d04.entites.BookingDetail;
import com.michael.a3nguyenvanan18d04.entites.BookingReservation;
import com.michael.a3nguyenvanan18d04.entites.RoomInformation;
import com.michael.a3nguyenvanan18d04.repository.BookingDetailRepository;
import com.michael.a3nguyenvanan18d04.services.interfaces.BookingDetailService;
import com.michael.a3nguyenvanan18d04.services.interfaces.BookingReservationService;
import com.michael.a3nguyenvanan18d04.services.interfaces.RoomInformationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingDetailServiceImpl implements BookingDetailService {
	private final BookingDetailRepository bookingDetailRepository;
	private final RoomInformationService roomInformationService;
	
	public BookingDetailServiceImpl(BookingDetailRepository bookingDetailRepository, RoomInformationService roomInformationService) {
		this.bookingDetailRepository = bookingDetailRepository;
		this.roomInformationService = roomInformationService;
	}
	@Override
	public List<BookingDetail> getBookingDetailServices(Long bookingReservationID) {
		return bookingDetailRepository.findAll().stream().filter(bookingDetail -> bookingDetail.getBookingReservation().getBookingReservationID().equals(bookingReservationID)).toList();
	}
	@Override
	public BookingDetail getBookingDetailById(Long id) {
		return bookingDetailRepository.findById(id).orElse(null);
	}
	@Override
	public BookingDetail createBookingDetail(BookingDetailRequestDTO bookingDetailRequestDTO) {
		
		if(bookingDetailRequestDTO == null) return null;
		BookingDetail bookingDetail = BookingDetail.builder().actualPrice(bookingDetailRequestDTO.getActualPrice()).startDate(bookingDetailRequestDTO.getStartDate()).endDate(bookingDetailRequestDTO.getEndDate()).build();
		RoomInformation roomInformation = roomInformationService.getRoomInformationById(bookingDetailRequestDTO.getRoomID());
		roomInformation.addBookingDetail(bookingDetail);
		return bookingDetailRepository.save(bookingDetail);
		
		
	}
	@Override
	public BookingDetail updateBookingDetail(Long id, BookingDetail bookingDetail) {
		return bookingDetailRepository.save(bookingDetail);
	}
	@Override
	public void deleteBookingDetail(Long id) {
		bookingDetailRepository.deleteById(id);
	
	}

	@Override
	public boolean existsByRoomId(Long roomId) {
		return bookingDetailRepository.existsByRoomInformation_RoomID(roomId);
	}
}
