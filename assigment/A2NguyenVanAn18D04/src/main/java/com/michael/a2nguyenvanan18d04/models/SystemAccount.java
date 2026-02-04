package com.michael.a2nguyenvanan18d04.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "SystemAccount")
@Getter
@Setter
@NoArgsConstructor
public class SystemAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accountId;
	
	@Column(name = "AccountName")
	private String accountName;
	
	@Column(name = "AccountEmail")
	private String accountEmail;
	
	@Column(name = "AccountPassword")
	private String accountPassword;
	
	
	
	@Column(name = "IsActive")
	private boolean active;
	
	
	@ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
	@CollectionTable(
			name = "UserRoles", // tên bảng phụ chứa các vai trò
			joinColumns = @JoinColumn(name = "userID")
	)
	@Enumerated(EnumType.STRING)
	@Column(name = "Role") // cột chứa giá trị enum
	private Set<Role> roles = new HashSet<>();
	
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OneToMany(mappedBy = "createdBy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<NewsArticle> newsArticlesCreated = new ArrayList<>();
	
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@OneToMany(mappedBy = "updatedBy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<NewsArticle> newsArticlesUpdated = new ArrayList<>();
	
	public SystemAccount(String accountName, String accountEmail, String accountPassword, Role role, Boolean active) {
		this.accountName = accountName;
		this.accountEmail = accountEmail;
		this.accountPassword = accountPassword;
		this.roles.add(role);
		this.active = active;
	}
	
	
	// Thêm role mới
	public void addRole(Role role) {
		if (this.roles == null) {
			this.roles = new HashSet<>();
		}
		this.roles.add(role);
	}
	
	// Xóa role
	public void removeRole(Role role) {
		if (this.roles != null) {
			this.roles.remove(role);
		}
	}
	
	// Check có role chưa
	public boolean hasRole(Role role) {
		return this.roles != null && this.roles.contains(role);
	}
	
	// Add news article created by this account
	public void addNewsArticleCreated(NewsArticle newsArticle) {
		if (this.newsArticlesCreated == null) {
			this.newsArticlesCreated = new ArrayList<>();
		}
		newsArticle.setCreatedBy(this);
		this.newsArticlesCreated.add(newsArticle);
	}
	
	// Add news article updated by this account
	public void addNewsArticleUpdated(NewsArticle newsArticle) {
		if (this.newsArticlesUpdated == null) {
			this.newsArticlesUpdated = new ArrayList<>();
		}
		newsArticle.setUpdatedBy(this);
		this.newsArticlesUpdated.add(newsArticle);
	}
}