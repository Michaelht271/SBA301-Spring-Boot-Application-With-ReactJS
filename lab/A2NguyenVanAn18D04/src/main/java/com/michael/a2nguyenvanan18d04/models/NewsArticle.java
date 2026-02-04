package com.michael.a2nguyenvanan18d04.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "NewsArticle")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class NewsArticle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long newArticleId;
	
	private String newsTitle;
	
	private String headLine;
	
	@Column(name = "CreateDate")
	@CreatedBy
	private LocalDate createDate;
	private String newsContent;
	private String newsSource;
	
	private String newsStatus;
	
	@OneToMany(mappedBy = "newsTag", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<NewsTag> newsTags = new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name = "CategoryId")
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "CreatedByID")
	@CreatedBy
	private SystemAccount CreatedBy;
	
	@ManyToOne
	@JoinColumn(name = "UpdateByID")
	@LastModifiedBy
	private SystemAccount updateBy;
	
	
	@Column(name = "ModifyDate")
	@LastModifiedDate
	private LocalDate modifyDate;
	
	
	
	public NewsArticle(String newsSource, String newsTitle, String headLine, String newsContent, String newsStatus, Category category) {
		this.newsSource = newsSource;
		this.newsTitle = newsTitle;
		this.headLine = headLine;
		this.newsContent = newsContent;
		this.newsStatus = newsStatus;
		this.category = category;
	}
	
	
	public void addNewsTag(NewsTag newsTag) {
		this.newsTags.add(newsTag);
		newsTag.setNewsArticle(this);
	}
	
	public void removeNewsTag(NewsTag newsTag) {
		this.newsTags.remove(newsTag);
		newsTag.setNewsArticle(null);
	}
}

