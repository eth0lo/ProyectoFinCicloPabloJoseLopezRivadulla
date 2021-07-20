package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.models.Product;
import com.example.demo.models.Torneo;

public interface TorneoService {

	
	Page <Torneo> findAll(Pageable page);
	List<Torneo> findAll();
	Torneo findById(long id);
	Torneo save(Torneo torneo);
	Page <Torneo> findByNombre(String nombre, Pageable page);
	Optional<Torneo> findByUrl(String url);
	Page <Torneo> findBynombre(String name, Pageable page);
	void deleteById(long id);
}
