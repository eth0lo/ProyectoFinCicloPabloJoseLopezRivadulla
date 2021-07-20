package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.models.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ProductRepository productRepository;

	@Override
	@Transactional
	public List<Product> findByName(String name) {
		// TODO Auto-generated method stub
		return productRepository.findByName(name);
	}


	@Override
	@Transactional
	public List<Product> findByPrice(double price) {
		// TODO Auto-generated method stub
		return productRepository.findByPrice(price);
	}

	@Override
	@Transactional
	public List<Product> findBydescription(String description) {
		// TODO Auto-generated method stub
		return productRepository.findBydescription(description);
	}

	@Override
	@Transactional
	public Page<Product> findAll(Pageable page) {
		// TODO Auto-generated method stub
		return productRepository.findAll(page);
	}

	@Override
	@Transactional
	public Page<Product> findBynombre(String name, Pageable page) {
		// TODO Auto-generated method stub
		return productRepository.findBynombre(name, page);
	}

	@Override
	@Transactional
	public Product findById(long id) {
		// TODO Auto-generated method stub
		return productRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Product save(Product product) {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	@Override
	public void deleteById(long id) {
		productRepository.deleteById(id);
		
	}

}
