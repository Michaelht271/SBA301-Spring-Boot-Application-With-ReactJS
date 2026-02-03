package com.michael.a2nguyenvanan18d04;

import java.util.List;

import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import com.michael.a2nguyenvanan18d04.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@Configuration
public class DataInitializer {
	
	private final SystemAccountRepository systemAccountRepository;
//	private final CategoryRepository categoryRepository;
//	private final TagRepository tagRepository;
//	private final NewsArticleRepository newsArticleRepository;
//	private final NewsTagRepository newsTagRepository;
	
	@Bean
	public CommandLineRunner commandLineRunner() throws Exception {
		return args -> {
			
			/* =======================
			 * SYSTEM ACCOUNTS
			 * ======================= */
			SystemAccount admin = new SystemAccount(
					"admin",
					"admin@example.com",
					"password123",
					"Admin",
					true
			);
			
			SystemAccount staff = new SystemAccount(
					"john.doe",
					"john.doe@example.com",
					"password456",
					"Staff",
					true
			);
			
			systemAccountRepository.saveAll(List.of(admin, staff));
			
//			/* =======================
//			 * CATEGORIES
//			 * ======================= */
//			Category technology = new Category(
//					"Technology",
//					"All about the latest in tech.",
//					null,
//					true
//			);
//
//			Category programming = new Category(
//					"Programming",
//					"Coding and development.",
//					technology,
//					true
//			);
//
//			Category sports = new Category(
//					"Sports",
//					"News from the world of sports.",
//					null,
//					false
//			);
//
//			categoryRepository.saveAll(List.of(technology, programming, sports));
//
//			/* =======================
//			 * TAGS
//			 * ======================= */
//			Tag react = new Tag("React", "A JavaScript library for building user interfaces");
//			Tag javascript = new Tag("JavaScript", "The programming language of the Web");
//			Tag api = new Tag("API", "Application Programming Interface");
//
//			tagRepository.saveAll(List.of(react, javascript, api));
//
//			/* =======================
//			 * NEWS ARTICLES
//			 * ======================= */
//			NewsArticle news1 = new NewsArticle(
//					"React 19 is Here!",
//					"The new version of React comes with exciting features.",
//					"The React team has officially released version 19...",
//					"Official React Blog",
//					programming,
//					"Published",
//					staff,
//					staff,
//					Instant.parse("2024-07-28T10:00:00Z"),
//					Instant.parse("2024-07-28T10:00:00Z")
//			);
//
//			NewsArticle news2 = new NewsArticle(
//					"Building a REST API with Node.js",
//					"A comprehensive guide to creating your first API.",
//					"In this tutorial, we will walk through the steps to build a RESTful API...",
//					"Dev Community",
//					programming,
//					"Draft",
//					admin,
//					admin,
//					Instant.parse("2024-07-27T14:30:00Z"),
//					Instant.parse("2024-07-27T14:30:00Z")
//			);
//
//			newsArticleRepository.saveAll(List.of(news1, news2));
//
//			/* =======================
//			 * NEWS - TAGS (MANY TO MANY)
//			 * ======================= */
//			newsTagRepository.saveAll(List.of(
//					new NewsTag(news1, react),
//					new NewsTag(news1, javascript),
//					new NewsTag(news2, javascript),
//					new NewsTag(news2, api)
//			));
			
			System.out.println("✅ Data initialization completed!");
		};
	}
}