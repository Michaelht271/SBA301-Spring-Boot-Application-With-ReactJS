package com.michael.a2nguyenvanan18d04.services.impl;

import com.michael.a2nguyenvanan18d04.models.Tag;
import com.michael.a2nguyenvanan18d04.repositories.TagRepository;
import com.michael.a2nguyenvanan18d04.services.interfaces.TagService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagServiceImpl implements TagService {
	private final TagRepository tagRepository;
	
	public TagServiceImpl(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}
	
	@Override
	public List<Tag> getAllTags() {
		return tagRepository.findAll();
	}
	@Override
	public Optional<Tag> getTagById(Long id) {
		return tagRepository.findById(id);
	}
	@Override
	public boolean createTag(Tag tag) {
		return tagRepository.save(tag) != null;
	}
	@Override
	public boolean updateTag(Tag tag) {
		return tagRepository.save(tag) != null;
	}
	@Override
	public boolean deleteTagById(Long id) {
		if( tagRepository.existsById(id) ) {
			tagRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
		
	}
}
