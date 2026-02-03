package com.michael.a2nguyenvanan18d04.services.interfaces;

import com.michael.a2nguyenvanan18d04.models.Tag;

import java.util.List;
import java.util.Optional;

public interface TagService {
	
	List<Tag> getAllTags();
	Optional<Tag> getTagById(Long id);
	boolean createTag(Tag tag);
	boolean updateTag(Tag  tag);
	boolean deleteTagById(Long id);
	
	
	
}
