package com.michael.a2nguyenvanan18d04.controller;

import com.michael.a2nguyenvanan18d04.dto.NewsArticleDTO;
import com.michael.a2nguyenvanan18d04.dto.NewsArticleMapper;
import com.michael.a2nguyenvanan18d04.models.NewsArticle;
import com.michael.a2nguyenvanan18d04.services.interfaces.NewsArticleServices;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/news")
public class NewsArticleController {
	
        private final NewsArticleServices newsArticleServices;
        private final NewsArticleMapper newsArticleMapper;

        public NewsArticleController(NewsArticleServices newsArticleServices, NewsArticleMapper newsArticleMapper) {
                this.newsArticleServices = newsArticleServices;
                this.newsArticleMapper = newsArticleMapper;
        }

        @GetMapping("")
        public ResponseEntity<List<NewsArticleDTO>> getAllNewsArticles() {
                List<NewsArticle> articles = newsArticleServices.getAllNewsArticles();
                List<NewsArticleDTO> dtos = articles.stream()
                        .map(newsArticleMapper::toDTO)
                        .collect(Collectors.toList());
                return ResponseEntity.ok(dtos);
        }

        @GetMapping("/{id}")
        public ResponseEntity<NewsArticleDTO> getNewsArticleById(@PathVariable Long id) {
                return newsArticleServices.getNewsArticlesById(id)
                                .map(newsArticleMapper::toDTO)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build());
        }

        @PostMapping("")
        public ResponseEntity<NewsArticleDTO> createNewsArticle(@RequestBody NewsArticleDTO newsArticleDTO) {
                NewsArticle newsArticle = newsArticleServices.createNewsArticles(newsArticleDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(newsArticleMapper.toDTO(newsArticle));
        }

        @PutMapping("/{id}")
        public ResponseEntity<NewsArticleDTO> updateNewsArticle(@PathVariable Long id, @RequestBody NewsArticleDTO newsArticleDTO) {
                newsArticleDTO.setNewArticleId(id);
                NewsArticle updatedArticle = newsArticleServices.updateNewsArticles(newsArticleDTO);
                if (updatedArticle != null) {
                        return ResponseEntity.ok(newsArticleMapper.toDTO(updatedArticle));
                }
                return ResponseEntity.notFound().build();
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteNewsArticle(@PathVariable Long id) {
                if (newsArticleServices.deleteNewsArticlesById(id)) {
                        return ResponseEntity.noContent().build();
                }
                return ResponseEntity.notFound().build();
        }
}