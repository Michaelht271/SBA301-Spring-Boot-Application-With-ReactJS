package com.michael.a2nguyenvanan18d04.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "SystemAccount")
@Getter
@Setter
@NoArgsConstructor
@Data

public class SystemAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accountId;
	
	@Column(name = "AccountName")
	private String accountName;
	
	@Column(name ="AccountEmail")
	private String accountEmail;
	
	@Column(name = "AccountPassword")
	private String accountPassword;
	
	@Column(name = "AccountRole")
	private String accountRole;
	
	@Column(name = "IsActive")
	private Boolean isActive;
	
	@OneToMany(mappedBy = "createdBy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<NewsArticle> newsArticlesCreated = new ArrayList<>();
	
	@OneToMany(mappedBy = "updatedBy", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<NewsArticle> newsArticlesUpdated = new ArrayList<>();
	
	public SystemAccount(String accountName, String accountEmail, String accountPassword, String accountRole, Boolean isActive) {
		this.accountName = accountName;
		this.accountEmail = accountEmail;
		this.accountPassword = accountPassword;
		this.accountRole = accountRole;
		this.isActive = isActive;
	}
}
