package com.example.demo.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.models.User;

public interface UserService {

	
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	User save(User user);

	User findById(Long id);

	Page<User> findAll(Pageable page);

	void deleteById(long id);
	

}
