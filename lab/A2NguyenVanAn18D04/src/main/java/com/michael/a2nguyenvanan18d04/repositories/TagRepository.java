package com.michael.a2nguyenvanan18d04.repositories;

import com.michael.a2nguyenvanan18d04.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
