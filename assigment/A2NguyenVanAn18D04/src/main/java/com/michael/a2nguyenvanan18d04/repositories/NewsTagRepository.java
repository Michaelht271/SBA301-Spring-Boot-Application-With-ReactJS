package com.michael.a2nguyenvanan18d04.repositories;

import com.michael.a2nguyenvanan18d04.models.NewsArticle;
import com.michael.a2nguyenvanan18d04.models.NewsTag;
import com.michael.a2nguyenvanan18d04.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsTagRepository extends JpaRepository<NewsTag, Long> {
    Optional<NewsTag> findByNewsArticleAndTag(NewsArticle newsArticle, Tag tag);
}
