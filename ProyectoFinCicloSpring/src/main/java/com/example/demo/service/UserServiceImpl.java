package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	@Transactional
	public Optional<User> findByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.findByUsername(username);
	}

	@Override
	@Transactional
	public Boolean existsByUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.existsByUsername(username);
	}

	@Override
	@Transactional
	public Boolean existsByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.existsByEmail(email);
	}

	@Override
	@Transactional
	public User save(User user) {
		return userRepository.save(user);
		
	}

	@Override
	@Transactional
	public User findById(Long id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Page<User> findAll(Pageable page) {
		// TODO Auto-generated method stub
		return userRepository.findAll(page);
	}

	@Override
	@Transactional
	public void deleteById(long id) {
		userRepository.deleteById(id);
		
	}

	
	
	
	

}