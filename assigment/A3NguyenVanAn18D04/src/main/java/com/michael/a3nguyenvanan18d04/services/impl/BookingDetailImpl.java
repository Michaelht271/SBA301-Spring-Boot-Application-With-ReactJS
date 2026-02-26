package com.michael.a3nguyenvanan18d04.services.impl;

import com.michael.a3nguyenvanan18d04.entites.BookingDetail;
import com.michael.a3nguyenvanan18d04.repository.BookingDetailRepository;
import com.michael.a3nguyenvanan18d04.services.interfaces.BookingDetailService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingDetailImpl implements BookingDetailService {
	private final BookingDetailRepository bookingDetailRepository;
	
	public BookingDetailImpl(BookingDetailRepository bookingDetailRepository) {
		this.bookingDetailRepository = bookingDetailRepository;
	}
	@Override
	public List<BookingDetail> getBookingDetailServices() {
		return bookingDetailRepository.findAll();
	}
	@Override
	public BookingDetail getBookingDetailById(Long id) {
		return bookingDetailRepository.findById(id).orElse(null);
	}
	@Override
	public BookingDetail createBookingDetail(BookingDetail bookingDetail) {
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
}
