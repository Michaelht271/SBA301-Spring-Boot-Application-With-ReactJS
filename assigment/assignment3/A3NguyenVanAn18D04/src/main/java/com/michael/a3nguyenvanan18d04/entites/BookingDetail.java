package com.michael.a3nguyenvanan18d04.entites;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "BookingDetail")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class BookingDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookingDetailID;

	@ManyToOne
	@JoinColumn(name = "bookingReservationID")
	private BookingReservation bookingReservation;
	
	@ManyToOne
	@JoinColumn(name = "roomID")
	@JsonIgnoreProperties("bookingDetails")
	private RoomInformation roomInformation;
	
	private LocalDateTime startDate;
	
	private LocalDateTime endDate;
	
	private double actualPrice;
	

}
