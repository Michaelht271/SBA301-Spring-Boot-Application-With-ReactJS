package com.michael.a2nguyenvanan18d04.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Tag")
@Data
@Getter
@Setter

@NoArgsConstructor
public class Tag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tagId;

	@Column(name = "TagName")
	private String tagName;
	
	@Column(name = "Note")
	private String note;
	
	
	@OneToMany(mappedBy = "tag", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<NewsTag> newsTags = new ArrayList<>();
	
	public Tag(String tagName, String note, List<NewsTag> newsTags) {
		this.tagName = tagName;
		this.note = note;
		this.newsTags = newsTags;
	}
	
	public void addNewsTag(NewsTag newsTag){
		this.newsTags.add(newsTag);
		newsTag.setTag(this);
		}
	
}
