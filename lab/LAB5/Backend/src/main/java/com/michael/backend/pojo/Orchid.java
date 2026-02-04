package com.michael.backend.pojo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Orchid")
@Getter
@Setter
@NoArgsConstructor
public class Orchid {
	@Id
	@GeneratedValue (strategy =  GenerationType.IDENTITY)
	@Column(name = "OrchidId")
	private Long orchidId;
	
	@Column(name = "OrchidName")
	private String orchidName;
	
	@Column(name = "IsNatural", columnDefinition = "bit default 0")
	private boolean natural;
	
	
	@Column(name = "OrchidDescription")
	private String orchidDescription;
	
	
	@ManyToOne
	@JoinColumn(name = "CategoryId")
	private Category orchidCategory;
	
	@Column( name = "IsAttractive", columnDefinition = "bit default 0")
	private boolean attractive;

	@Column( name = "OchidURL")
	private String orchidURL;
	
	public Orchid(String orchidURL, boolean attractive,  String orchidDescription, boolean natural, String orchidName) {
		this.orchidURL = orchidURL;
		this.attractive = attractive;
		this.orchidDescription = orchidDescription;
		this.natural = natural;
		this.orchidName = orchidName;
	}
	
	
}
