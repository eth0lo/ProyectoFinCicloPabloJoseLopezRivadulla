package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Torneo;



public interface TorneoRepository extends JpaRepository <Torneo, Long>{

	Page <Torneo> findAll(Pageable page);
	Optional <Torneo> findById(long id);
	Page <Torneo> findByNombre(String nombre, Pageable page);
	
	Optional <Torneo> findByUrl(String url);
	
		@Query(
			
			value = "SELECT * FROM torneos WHERE nombre LIKE  %?1% OR url LIKE %?1%", nativeQuery = true)
	Page<Torneo> findBynombre(String name, Pageable page);
}
