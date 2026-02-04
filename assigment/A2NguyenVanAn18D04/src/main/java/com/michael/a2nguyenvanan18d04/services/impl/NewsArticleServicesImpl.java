package com.michael.a2nguyenvanan18d04.services.impl;

import com.michael.a2nguyenvanan18d04.dto.NewsArticleDTO;
import com.michael.a2nguyenvanan18d04.models.Category;
import com.michael.a2nguyenvanan18d04.models.NewsArticle;
import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import com.michael.a2nguyenvanan18d04.repositories.CategoryRepository;
import com.michael.a2nguyenvanan18d04.repositories.NewsArticleRepository;
import com.michael.a2nguyenvanan18d04.repositories.SystemAccountRepository;
import com.michael.a2nguyenvanan18d04.services.interfaces.NewsArticleServices;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class NewsArticleServicesImpl implements NewsArticleServices {
	private final NewsArticleRepository newsArticleRepository;
	private final CategoryRepository categoryRepository;
	private final SystemAccountRepository systemAccountRepository;
	
	public NewsArticleServicesImpl(NewsArticleRepository newsArticleRepository,
	                               CategoryRepository categoryRepository,
	                               SystemAccountRepository systemAccountRepository) {
		this.newsArticleRepository = newsArticleRepository;
		this.categoryRepository = categoryRepository;
		this.systemAccountRepository = systemAccountRepository;
	}

	@Override
	public List<NewsArticle> getAllNewsArticles() {
		return newsArticleRepository.findAll();
	}

	@Override
	public Optional<NewsArticle> getNewsArticlesById(Long id) {
		return newsArticleRepository.findById(id);
	}

	@Override
	public NewsArticle createNewsArticles(NewsArticleDTO newsArticleDTO) {
		NewsArticle newsArticle = new NewsArticle();
		newsArticle.setNewsTitle(newsArticleDTO.getNewsTitle());
		newsArticle.setHeadLine(newsArticleDTO.getHeadLine());
		newsArticle.setNewsContent(newsArticleDTO.getNewsContent());
		newsArticle.setNewsSource(newsArticleDTO.getNewsSource());
		newsArticle.setNewsStatus(newsArticleDTO.getNewsStatus());
		
		// Set category if provided
		if (newsArticleDTO.getCategoryId() != null) {
			Optional<Category> category = categoryRepository.findById(newsArticleDTO.getCategoryId());
			category.ifPresent(newsArticle::setCategory);
		}
		
		// Set created by - get from provided ID and update bidirectional relationship
		Long createdByID = newsArticleDTO.getCreatedByID();
		if (createdByID != null) {
			systemAccountRepository.findById(createdByID)
					.ifPresent(account -> account.addNewsArticleCreated(newsArticle));
		}
		
		// Set timestamp
		newsArticle.setCreateDate(LocalDateTime.now());
		newsArticle.setModifyDate(LocalDateTime.now());
		
		return newsArticleRepository.save(newsArticle);
	}

	@Override
	public NewsArticle updateNewsArticles(NewsArticleDTO newsArticleDTO) {
		if (newsArticleRepository.existsById(newsArticleDTO.getNewArticleId())) {
			NewsArticle newsArticle = newsArticleRepository.findById(newsArticleDTO.getNewArticleId()).orElse(null);
			if (newsArticle != null) {
				newsArticle.setNewsTitle(newsArticleDTO.getNewsTitle());
				newsArticle.setHeadLine(newsArticleDTO.getHeadLine());
				newsArticle.setNewsContent(newsArticleDTO.getNewsContent());
				newsArticle.setNewsSource(newsArticleDTO.getNewsSource());
				newsArticle.setNewsStatus(newsArticleDTO.getNewsStatus());
				
				// Update category if provided
				if (newsArticleDTO.getCategoryId() != null) {
					Optional<Category> category = categoryRepository.findById(newsArticleDTO.getCategoryId());
					category.ifPresent(newsArticle::setCategory);
				}
				
			// Update updated by and maintain bidirectional relationship
			if (newsArticleDTO.getUpdatedByID() != null) {
				systemAccountRepository.findById(newsArticleDTO.getUpdatedByID())
						.ifPresent(account -> account.addNewsArticleUpdated(newsArticle));
			}
				
				// Update timestamp
				newsArticle.setModifyDate(LocalDateTime.now());
				
				return newsArticleRepository.save(newsArticle);
			}
		}
		return null;
	}

	@Override
	public boolean deleteNewsArticlesById(Long id) {
		if (newsArticleRepository.existsById(id)) {
			newsArticleRepository.deleteById(id);
			return true;
		}
		return false;
	}
}
