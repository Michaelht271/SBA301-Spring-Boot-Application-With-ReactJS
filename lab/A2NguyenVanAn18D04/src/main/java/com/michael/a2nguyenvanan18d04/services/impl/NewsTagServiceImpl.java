package com.michael.a2nguyenvanan18d04.services.impl;

import com.michael.a2nguyenvanan18d04.models.NewsTag;
import com.michael.a2nguyenvanan18d04.services.interfaces.NewsTagService;

import java.util.List;
import java.util.Optional;

public class  NewsTagServiceImpl implements NewsTagService {
	@Override
	public List<NewsTag> getAllNewsTags() {
		return List.of();
	}
	@Override
	public Optional<NewsTag> getNewsTagById(Long id) {
		return Optional.empty();
	}
	@Override
	public boolean createNewsTag(NewsTag tag) {
		return false;
	}
	@Override
	public boolean updateNewsTag(NewsTag newsTag) {
		return false;
	}
	@Override
	public boolean deleteNewsTagById(Long id) {
		return false;
	}
}
