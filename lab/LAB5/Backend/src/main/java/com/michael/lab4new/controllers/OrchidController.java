package com.michael.lab4new.controllers;

import com.michael.lab4new.pojo.Orchid;
import com.michael.lab4new.services.interfaces.OrchidService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orchids")
@CrossOrigin
public class OrchidController {
	
	private final OrchidService orchidService;
	
	public OrchidController(OrchidService orchidService) {
		this.orchidService = orchidService;
	}
	
	@GetMapping("")
	public ResponseEntity<List<Orchid>> fetchAll() {
		return ResponseEntity.ok(orchidService.getAllOrchids());
	}
	@PostMapping("")
	public Optional<Orchid> saveOrchid(@RequestBody Orchid orchid) {
		return orchidService.insertOrchid(orchid);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Optional<Orchid>> updateOrchid(@PathVariable Long id, @RequestBody Orchid orchid) {
		return ResponseEntity.ok(orchidService.updateOrchid(orchid));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteOrchid(@PathVariable Long id) {
		orchidService.deleteOrchid(id);
		return ResponseEntity.ok("Orchid deleted successfully");
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Orchid>> getOrchidById(@PathVariable Long id) {
		return ResponseEntity.ok(orchidService.getOrchidById(id));
	}
	
}
