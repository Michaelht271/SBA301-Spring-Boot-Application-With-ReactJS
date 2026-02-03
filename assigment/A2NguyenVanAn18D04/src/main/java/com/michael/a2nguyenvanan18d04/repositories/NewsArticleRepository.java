package com.michael.a2nguyenvanan18d04.repositories;

import com.michael.a2nguyenvanan18d04.models.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {
    Optional<NewsArticle> findByNewsTitle(String newsTitle);
}
