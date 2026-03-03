package com.michael.a3nguyenvanan18d04.controllers;

import com.michael.a3nguyenvanan18d04.dtos.rooms.request.UpdateRoomRequest;
import com.michael.a3nguyenvanan18d04.services.impl.RoomInformationServiceImpl;
import com.michael.a3nguyenvanan18d04.services.interfaces.RoomInformationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rooms")
@Slf4j
public class RoomInformationController {
	private final RoomInformationService roomInformationService;
	
	public RoomInformationController(RoomInformationService roomInformationService) {
		this.roomInformationService = roomInformationService;
	}
	
	@GetMapping
	public Object getRoomInformation() {
		return roomInformationService.getRoomInformationServices();
	}
	
	@PutMapping("/{id}")
	public Object updateRoomInformation(@PathVariable Long id, @RequestBody UpdateRoomRequest updateRoomRequest) {
		return roomInformationService.updateRoomInformation(id, updateRoomRequest);
	}
	
	@PostMapping()
	public Object createRoomInformation( @RequestBody UpdateRoomRequest updateRoomRequest) {
		return roomInformationService.createRoomInformation(updateRoomRequest);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteRoomInformation(@PathVariable Long id) {
		 roomInformationService.deleteRoomInformation(id);
		 return ResponseEntity.ok().build();
	}
	
	
}
