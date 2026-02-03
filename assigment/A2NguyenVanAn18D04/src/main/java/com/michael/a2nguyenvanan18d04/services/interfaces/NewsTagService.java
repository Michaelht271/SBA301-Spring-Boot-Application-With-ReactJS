package com.michael.a2nguyenvanan18d04.services.interfaces;

import com.michael.a2nguyenvanan18d04.models.NewsTag;

import java.util.List;
import java.util.Optional;

public interface NewsTagService {
	List<NewsTag> getAllNewsTags();
	Optional<NewsTag> getNewsTagById(Long id);
	boolean createNewsTag(NewsTag newsTag);
	boolean updateNewsTag(NewsTag newsTag);
	boolean deleteNewsTagById(Long id);
	
}
