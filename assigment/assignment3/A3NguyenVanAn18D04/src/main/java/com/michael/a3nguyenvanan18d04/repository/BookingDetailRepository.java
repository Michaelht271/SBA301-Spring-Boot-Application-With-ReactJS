package com.michael.a3nguyenvanan18d04.repository;

import com.michael.a3nguyenvanan18d04.entites.BookingDetail;

import com.michael.a3nguyenvanan18d04.entites.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, Long> {
	
	List<BookingDetail> findBookingDetailsByBookingReservation(BookingReservation bookingReservation);

	boolean existsByRoomInformation_RoomID(Long roomID);
}
