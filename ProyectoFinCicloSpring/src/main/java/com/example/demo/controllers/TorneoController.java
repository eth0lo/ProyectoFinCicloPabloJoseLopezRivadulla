package com.example.demo.controllers;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Torneo;


import com.example.demo.service.TorneoService;

@RestController
@RequestMapping("/api/torneos/")
@CrossOrigin(origins = "http://localhost:3000")
public class TorneoController {
	

	
	@Autowired
	private TorneoService torneoService;

	@GetMapping("/torneos")
	public Page <Torneo> findAll(Pageable page){
		return torneoService.findAll(page);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping ("/torneo/{url}")
	
	public ResponseEntity<Object> getTorneo(@PathVariable String url) {
		
		Optional <Torneo> torneo = torneoService.findByUrl(url);
		
	if(torneo != null) {
			
			return new ResponseEntity<>(torneo, HttpStatus.OK);
			
		}else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}	
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping ("/query/{name}")
	
	public Page<Torneo> deleteTorneo(@PathVariable String name, Pageable page) {
		

		return torneoService.findBynombre(name, page);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping ("/torneos/{id}")
	
	public ResponseEntity<Object> getTorneoById(@PathVariable long id) {
		
		Torneo torneo = torneoService.findById(id);
		
	if(torneo != null) {
			
			return new ResponseEntity<>(torneo, HttpStatus.OK);
			
		}else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}	
	}
	

	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@PostMapping("/torneo")
	
	public Torneo saveTorneo(@RequestBody Torneo torneo){
		return torneoService.save(torneo);
		
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@GetMapping("/admin")
	
	public Page <Torneo> findItemsAdmin(Pageable page){
		return torneoService.findAll(page);
		
	}
	
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/torneo/{id}")
	
	public void eliminarTorneo(@PathVariable long id) {
		
		torneoService.deleteById(id);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@PutMapping("/torneos/{id}")
	public ResponseEntity<?> update(@Valid @RequestBody Torneo torneo, @PathVariable Long id) {
		Torneo torneoActual = torneoService.findById(id);
		Torneo torneoModificado = null;

		Map<String, Object> response = new HashMap<>();

		if (torneoActual == null) {
			response.put("mensaje", "El Perfil ID: ".concat(id.toString()).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		torneoActual.setNombre(torneo.getNombre());
		torneoActual.setUrl(torneo.getUrl());
		torneoActual.setImg(torneo.getImg());

		torneoModificado = torneoService.save(torneoActual);

		response.put("mensaje", "El Torneo ha sido actualizado con éxito");
		response.put("perfil", torneoModificado);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	
}
