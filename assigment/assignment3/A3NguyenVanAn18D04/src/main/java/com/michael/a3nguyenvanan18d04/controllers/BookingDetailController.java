package com.michael.a3nguyenvanan18d04.controllers;

import com.michael.a3nguyenvanan18d04.services.interfaces.BookingDetailService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/booking-detail")
public class BookingDetailController {
    private final BookingDetailService bookingDetailService;

    public BookingDetailController(BookingDetailService bookingDetailService) {
        this.bookingDetailService = bookingDetailService;
    }

    @GetMapping("/{bookingReservationID}")
    public ResponseEntity<Object> getBookingDetails(@PathVariable Long bookingReservationID) {
        return ResponseEntity.ok(bookingDetailService.getBookingDetailServices(bookingReservationID));
    }



}
