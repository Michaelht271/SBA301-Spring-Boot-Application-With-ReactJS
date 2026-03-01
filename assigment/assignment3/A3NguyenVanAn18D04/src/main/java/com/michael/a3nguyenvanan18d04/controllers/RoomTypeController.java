package com.michael.a3nguyenvanan18d04.controllers;

import com.michael.a3nguyenvanan18d04.entites.RoomType;
import com.michael.a3nguyenvanan18d04.services.interfaces.RoomTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/room-types")
@CrossOrigin(origins = "*")
@Slf4j
public class RoomTypeController {
	private final RoomTypeService roomTypeService;
	
	public RoomTypeController(RoomTypeService roomTypeService) {
		this.roomTypeService = roomTypeService;
	}

	@GetMapping
	public ResponseEntity<Object> getRoomTypes() {
		return ResponseEntity.ok(roomTypeService.getRoomTypeServices());
	}
	
	@PostMapping
	public ResponseEntity<Object> createRoomType(@RequestBody RoomType roomType) {
		return ResponseEntity.ok(roomTypeService.createRoomType(roomType));
	}
	
}
