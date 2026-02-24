package com.michael.lab7.pojos;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	private String author;
	
	private String isbn;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "StudentID")
	private Student student;
	
	
	
}
