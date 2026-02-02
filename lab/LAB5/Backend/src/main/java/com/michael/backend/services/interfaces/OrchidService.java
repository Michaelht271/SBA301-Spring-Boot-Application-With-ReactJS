package com.michael.backend.services.interfaces;

import com.michael.backend.pojo.Orchid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface OrchidService {
	
	List<Orchid> getAllOrchids();
	Optional<Orchid> insertOrchid(Orchid orchid);
	Optional<Orchid> updateOrchid(Orchid orchid);
	void deleteOrchid(Long orchidId);
	Optional<Orchid> getOrchidById(Long orchidId);
}
