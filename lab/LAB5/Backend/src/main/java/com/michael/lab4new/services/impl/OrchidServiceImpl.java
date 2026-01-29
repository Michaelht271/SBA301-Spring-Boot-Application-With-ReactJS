package com.michael.lab4new.services.impl;

import com.michael.lab4new.pojo.Orchid;
import com.michael.lab4new.repositories.OrchidRepository;
import com.michael.lab4new.services.interfaces.OrchidService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class OrchidServiceImpl implements OrchidService {
	
	private final OrchidRepository orchidRepository;
	
	public OrchidServiceImpl(OrchidRepository orchidRepository) {
		this.orchidRepository = orchidRepository;
	}
	
	
	@Override
	public List<Orchid> getAllOrchids() {
		return orchidRepository.findAll();
	}
	@Override
	public Optional<Orchid> insertOrchid(Orchid orchid) {
		return orchidRepository.findById(orchidRepository.save(orchid).getOrchidId());
	}
	@Override
	public Optional<Orchid> updateOrchid(Orchid orchid) {
		return orchidRepository.findById(orchidRepository.save(orchid).getOrchidId());
	}
	@Override
	public void deleteOrchid(Long orchidId) {
		 orchidRepository.deleteById(orchidId);
	}
	@Override
	public Optional<Orchid> getOrchidById(Long orchidId) {
		return orchidRepository.findById(orchidId);
	}
}
