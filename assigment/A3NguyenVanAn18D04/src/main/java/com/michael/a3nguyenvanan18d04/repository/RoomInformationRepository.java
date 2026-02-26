package com.michael.a3nguyenvanan18d04.repository;

import com.michael.a3nguyenvanan18d04.entites.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomInformationRepository extends JpaRepository<RoomInformation, Long> {
}
