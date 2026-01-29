package com.michael.lab4new.services.interfaces;

import com.michael.lab4new.pojo.Orchid;
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
