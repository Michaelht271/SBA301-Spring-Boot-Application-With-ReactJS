package com.michael.lab4new.repositories;

import com.michael.lab4new.pojo.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrchidRepository extends JpaRepository<Orchid, Long> {

}
