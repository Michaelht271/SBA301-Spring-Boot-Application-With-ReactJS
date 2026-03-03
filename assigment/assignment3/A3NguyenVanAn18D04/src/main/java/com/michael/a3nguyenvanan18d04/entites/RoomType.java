package com.michael.a3nguyenvanan18d04.entites;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.ArrayList;

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
	
	@OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	@JsonIgnoreProperties("roomType")
	private List<RoomInformation> roomInformation = new ArrayList<>();
	
	public void addRoomInformation(RoomInformation roomInformation) {
		if (roomInformation == null) return;
		if (this.roomInformation == null) this.roomInformation = new ArrayList<>();
		if (!this.roomInformation.contains(roomInformation)) {
			this.roomInformation.add(roomInformation);
			roomInformation.setRoomType(this);
		}
	}
	
	public void removeRoomInformation(RoomInformation roomInformation) {
		if (roomInformation == null || this.roomInformation == null) return;
		if (this.roomInformation.remove(roomInformation)) {
			roomInformation.setRoomType(null);
		}
	}
}
