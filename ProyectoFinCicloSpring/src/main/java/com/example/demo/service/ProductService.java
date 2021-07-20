package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import com.example.demo.models.Product;

public interface ProductService {

	
	List <Product> findByName(String name);
	List <Product> findByPrice (double price);
	List <Product> findBydescription (String description);
	
	Page <Product> findAll(Pageable page);
	
	Page <Product> findBynombre(String name, Pageable page);
	Product findById(long id);
	Product save(Product product);
	void deleteById(long id);
		
	
}
