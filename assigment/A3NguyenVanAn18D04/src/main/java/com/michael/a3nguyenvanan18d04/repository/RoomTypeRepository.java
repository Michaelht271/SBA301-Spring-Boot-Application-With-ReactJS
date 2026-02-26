package com.michael.a3nguyenvanan18d04.repository;

import com.michael.a3nguyenvanan18d04.entites.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {
}
