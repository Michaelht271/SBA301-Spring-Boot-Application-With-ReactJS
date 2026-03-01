package com.michael.a3nguyenvanan18d04.services.impl;

import com.michael.a3nguyenvanan18d04.dtos.rooms.request.UpdateRoomRequest;
import com.michael.a3nguyenvanan18d04.entites.RoomInformation;
import com.michael.a3nguyenvanan18d04.entites.RoomType;
import com.michael.a3nguyenvanan18d04.enums.RoomStatus;
import com.michael.a3nguyenvanan18d04.repository.BookingDetailRepository;
import com.michael.a3nguyenvanan18d04.repository.RoomInformationRepository;
import com.michael.a3nguyenvanan18d04.services.interfaces.RoomInformationService;
import com.michael.a3nguyenvanan18d04.services.interfaces.RoomTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Slf4j
public class RoomInformationServiceImpl implements RoomInformationService {
	private final RoomInformationRepository roomInformationRepository;
	private final RoomTypeService roomTypeService;
	private final BookingDetailRepository bookingDetailRepository;
	
	public RoomInformationServiceImpl(RoomInformationRepository roomInformationRepository, RoomTypeService roomTypeService, BookingDetailRepository bookingDetailRepository) {
		this.roomInformationRepository = roomInformationRepository;
		this.roomTypeService = roomTypeService;
		this.bookingDetailRepository = bookingDetailRepository;
	}
	
	@Override
	public List<RoomInformation> getRoomInformationServices() {

		return roomInformationRepository.findAll();
	}
	@Override
	public RoomInformation getRoomInformationById(Long id) {
		return roomInformationRepository.getReferenceById(id);
	}
	@Override
	public RoomInformation createRoomInformation(UpdateRoomRequest updateRoomRequest) {
		
		if(updateRoomRequest == null) return null;
		RoomInformation roomInformation = new RoomInformation();
		roomInformation.setRoomNumber(updateRoomRequest.getRoomNumber());
		roomInformation.setRoomDetailDescription(updateRoomRequest.getRoomDescription());
		roomInformation.setRoomPricePerDay(updateRoomRequest.getRoomPrice());
		roomInformation.setRoomStatus(updateRoomRequest.getRoomStatus());
		
		RoomType roomType = roomTypeService.getRoomTypeById(updateRoomRequest.getRoomTypeId());
		roomType.addRoomInformation(roomInformation);
		roomTypeService.updateRoomType(updateRoomRequest.getRoomTypeId(), roomType);
		return roomInformationRepository.save(roomInformation);
	}
	@Override
	public RoomInformation updateRoomInformation(Long id, UpdateRoomRequest updateRoomRequest) {
	
		if(updateRoomRequest == null) return null;
		RoomInformation roomInformation = roomInformationRepository.getReferenceById(id);
		roomInformation.setRoomNumber(updateRoomRequest.getRoomNumber());
		roomInformation.setRoomDetailDescription(updateRoomRequest.getRoomDescription());
		roomInformation.setRoomPricePerDay(updateRoomRequest.getRoomPrice());
		roomInformation.setRoomStatus(updateRoomRequest.getRoomStatus());
		return roomInformationRepository.save(roomInformation);
	}
	@Override
	public void deleteRoomInformation(Long id) {
		if (bookingDetailRepository.existsByRoomInformation_RoomID(id)) {
			RoomInformation roomInformation = roomInformationRepository.findById(id).orElseThrow();
			roomInformation.setRoomStatus(RoomStatus.DELETE);
			roomInformationRepository.save(roomInformation);
		} else {
			roomInformationRepository.deleteById(id);
		}
	}
}
