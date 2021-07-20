package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.models.Torneo;
import com.example.demo.repository.TorneoRepository;

@Service
public class TorneoServiceImpl implements TorneoService{

	@Autowired
	private TorneoRepository torneoRepository;

	@Override
	@Transactional
	public Page<Torneo> findAll(Pageable page) {
		
		return torneoRepository.findAll(page);
	}

	@Override
	@Transactional
	public Torneo findById(long id) {
		
		return torneoRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Torneo save(Torneo torneo) {
		return torneoRepository.save(torneo);
		
	}

	@Override
	@Transactional
	public List<Torneo> findAll() {
		return torneoRepository.findAll();
	}

	@Override
	@Transactional
	public Page <Torneo> findByNombre(String nombre, Pageable page) {
	
		return torneoRepository.findByNombre(nombre, page);
	}

	@Override
	@Transactional
	public Optional<Torneo> findByUrl(String url) {
		// TODO Auto-generated method stub
		return torneoRepository.findByUrl(url);
	}

	@Override
	@Transactional
	public Page<Torneo> findBynombre(String name, Pageable page) {
		// TODO Auto-generated method stub
		return  torneoRepository.findBynombre(name, page);
	}

	@Override
	public void deleteById(long id) {
		
		torneoRepository.deleteById(id);
		
	}
	
	
	
}
