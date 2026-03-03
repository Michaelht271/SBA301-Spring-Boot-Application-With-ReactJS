package com.michael.pe_sba301_sp25_be_nguyenvanan.entites;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "Car")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Car {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long carId;
	private String carName;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "countryId")
	private Country country;
	
	private Long unitsInStock;
	
	private double unitPrice;
	
	
	@CreatedDate
	private LocalDateTime createdAt;
	
	@LastModifiedDate
	private LocalDateTime updatedAt;
	
	
}
