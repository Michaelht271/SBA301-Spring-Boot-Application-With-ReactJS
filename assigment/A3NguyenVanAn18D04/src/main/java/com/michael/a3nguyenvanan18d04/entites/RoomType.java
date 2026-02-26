package com.michael.a3nguyenvanan18d04.entites;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long roomTypeID;
	
	private String roomTypeName;
	
	private String roomTypeDescription;
	
	private String roomTypeNote;
	
	@OneToMany(mappedBy = "roomType")
	private List<RoomInformation> roomInformation;
	
	public void addRoomInformation(RoomInformation roomInformation) {
		this.roomInformation.add(roomInformation);
		roomInformation.setRoomType(this);
	}
	
	public void removeRoomInformation(RoomInformation roomInformation) {
		this.roomInformation.remove(roomInformation);
		roomInformation.setRoomType(this);
	}
}
