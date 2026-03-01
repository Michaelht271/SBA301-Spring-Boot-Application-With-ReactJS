package com.michael.a3nguyenvanan18d04.dtos.booking.request;

import com.michael.a3nguyenvanan18d04.enums.BookingStatus;
import lombok.Data;

@Data
public class BookingStatusUpdateDTO {
	
	private BookingStatus status;

}
