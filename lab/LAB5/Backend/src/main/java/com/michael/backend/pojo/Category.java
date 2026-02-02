package com.michael.backend.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Category")
@NoArgsConstructor
@Getter
@Setter
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long categoryId;
	
	@Column(name = "CategoryName")
	private String categoryName;
	
	@OneToMany(mappedBy = "orchidCategory", fetch = FetchType.LAZY,  cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Orchid> orchids = new ArrayList<>();
	
	public void addOrchid(Orchid orchid) {
		orchids.add(orchid);
		orchid.setOrchidCategory(this);
	}
	public Category( String categoryName) {
		this.categoryName = categoryName;
	}
}
