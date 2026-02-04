package com.michael.a2nguyenvanan18d04.config;

import java.util.List;

import com.michael.a2nguyenvanan18d04.models.Category;
import com.michael.a2nguyenvanan18d04.models.NewsArticle;
import com.michael.a2nguyenvanan18d04.models.SystemAccount;
import com.michael.a2nguyenvanan18d04.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


import static com.michael.a2nguyenvanan18d04.models.Role.ADMIN;
import static com.michael.a2nguyenvanan18d04.models.Role.STAFF;


@Configuration
public class DataInitializer {

private final PasswordEncoder passwordEncoder;
	
	public DataInitializer(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	
	}
	
	@Bean
	public CommandLineRunner commandLineRunner( SystemAccountRepository systemAccountRepository, CategoryRepository categoryRepository) throws Exception {
		return args -> {
			
			/* =======================
			 * SYSTEM ACCOUNTS
			 * ======================= */
			SystemAccount admin = new SystemAccount(
					"admin",
					"admin@example.com",
					passwordEncoder.encode("password123"),
					ADMIN,
					true
			);
//			admin.addRole(ADMIN);
			
			SystemAccount staff = new SystemAccount(
					"john.doe",
					"john.doe@example.com",
					passwordEncoder.encode("password456"),
					STAFF,
					true
			);
//			staff.addRole(STAFF);
			
			systemAccountRepository.saveAll(List.of(admin, staff));
			
			/* =======================
			 * CATEGORIES
			 * ======================= */
			Category technology = new Category(
					"Technology",
					"All about the latest in tech.",
					null,
					true
			);

			Category programming = new Category(
					"Programming",
					"Coding and development.",
					technology,
					true
			);

			Category sports = new Category(
					"Sports",
					"News from the world of sports.",
					null,
					false
			);
			technology.addChildCategory(programming);
			
			
			NewsArticle news1 = new NewsArticle(
					"React 19 is Here!",
					"The new version of React comes with exciting features.",
					"The React team has officially released version 19...",
					"Official React Blog",
					"Published"
			);
			programming.addNewsArticle(news1);
			
			
		

			NewsArticle news2 = new NewsArticle(
					"Building a REST API with Node.js",
					"A comprehensive guide to creating your first API.",
					"In this tutorial, we will walk through the steps to build a RESTful API...",
					"Dev Community",
					"Draft"
			);

			programming.addNewsArticle(news2);
			
			categoryRepository.saveAll(List.of(technology, programming, sports));
			

			
		};
	}
}