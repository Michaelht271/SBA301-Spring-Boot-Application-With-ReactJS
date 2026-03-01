package com.michael.a3nguyenvanan18d04.services.impl;

import com.michael.a3nguyenvanan18d04.entites.BookingDetail;
import com.michael.a3nguyenvanan18d04.entites.RoomInformation;
import com.michael.a3nguyenvanan18d04.enums.RoomStatus;
import com.michael.a3nguyenvanan18d04.repository.BookingDetailRepository;
import com.michael.a3nguyenvanan18d04.repository.RoomInformationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class RoomInformationServiceTest {

    @Mock
    private RoomInformationRepository roomInformationRepository;

    @Mock
    private RoomTypeServiceImpl roomTypeService;

    @Mock
    private BookingDetailRepository bookingDetailRepository;

    @InjectMocks
    private RoomInformationServiceImpl roomInformationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deleteRoomInformation_WhenNoBooking_ShouldDeleteFromRepo() {
        Long roomId = 1L;
        when(bookingDetailRepository.existsByRoomInformation_RoomID(roomId)).thenReturn(false);

        roomInformationService.deleteRoomInformation(roomId);

        verify(roomInformationRepository, times(1)).deleteById(roomId);
        verify(roomInformationRepository, never()).save(any());
    }

    @Test
    void deleteRoomInformation_WhenHasBooking_ShouldUpdateStatus() {
        Long roomId = 1L;
        RoomInformation room = new RoomInformation();
        room.setRoomID(roomId);
        room.setRoomStatus(RoomStatus.AVAILABLE);

        when(bookingDetailRepository.existsByRoomInformation_RoomID(roomId)).thenReturn(true);
        when(roomInformationRepository.findById(roomId)).thenReturn(Optional.of(room));

        roomInformationService.deleteRoomInformation(roomId);

        assertEquals(RoomStatus.DELETE, room.getRoomStatus());
        verify(roomInformationRepository, times(1)).save(room);
        verify(roomInformationRepository, never()).deleteById(roomId);
    }
}
