package com.michael.a3nguyenvanan18d04.entites;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.michael.a3nguyenvanan18d04.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "RoomInformation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomInformation {
	@Id
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
	private Long roomID;

	private String roomNumber;

	private String roomDetailDescription;

	private int roomMaxCapacity;

	private RoomStatus roomStatus;

	private double roomPricePerDay;

	@ManyToOne
	@JoinColumn(name = "roomTypeID")
	@JsonIgnoreProperties("roomInformation")
	private RoomType roomType;
	
	@OneToMany(mappedBy = "roomInformation", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnoreProperties("roomInformation")
	private List<BookingDetail> bookingDetails = new ArrayList<>();

	
	public void addBookingDetail(BookingDetail bookingDetail) {
		this.bookingDetails.add(bookingDetail);
		bookingDetail.setRoomInformation(this);
	}
	public void removeBookingDetail(BookingDetail bookingDetail) {
		this.bookingDetails.remove(bookingDetail);
		bookingDetail.setRoomInformation(null);
	}
	
}
