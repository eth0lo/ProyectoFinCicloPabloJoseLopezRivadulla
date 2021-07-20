package com.example.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Product;

public interface ProductRepository extends JpaRepository <Product, Long> {
	
	List <Product> findByName(String name);
	
	List <Product> findByPrice (double price);
	List <Product> findBydescription (String description);
	
	Page <Product> findAll(Pageable page);
	
		@Query(
			
			value = "SELECT * FROM PRODUCT WHERE name LIKE  %?1% OR description LIKE %?1% ", nativeQuery = true)
	Page <Product> findBynombre(String name, Pageable page);
		

}
