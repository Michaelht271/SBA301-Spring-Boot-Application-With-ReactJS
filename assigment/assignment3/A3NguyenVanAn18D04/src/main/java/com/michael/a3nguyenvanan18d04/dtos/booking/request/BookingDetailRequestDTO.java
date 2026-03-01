package com.michael.a3nguyenvanan18d04.dtos.booking.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingDetailRequestDTO {
	
	@NotNull
	private Long roomID;
	@NotNull
	private LocalDateTime startDate;
	@NotNull
	private LocalDateTime endDate;
	@NotNull
	private double actualPrice;
}
