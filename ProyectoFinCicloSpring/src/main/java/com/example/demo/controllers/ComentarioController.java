package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Comentario;
import com.example.demo.service.ComentarioService;


@RestController
@RequestMapping("/api/comments/")
@CrossOrigin(origins = "http://localhost:3000")
public class ComentarioController {
	
	@Autowired
	private ComentarioService comentarioService;
	
	
	
	@GetMapping("/comments")
	public Page <Comentario> findAll(Pageable page){
		return comentarioService.findAll(page);
		
	}

	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured({"ROLE_ADMIN", "ROLE_MODERATOR"})
	@DeleteMapping("/comments/{id}")
	
	public void deleteComentario(@PathVariable long id) {
		
		comentarioService.deleteById(id);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured({"ROLE_ADMIN", "ROLE_USER" , "ROLE_MODERATOR"})
	@PostMapping("/comments/")
	
	public void saveComentario(@RequestBody Comentario comentario) {

		comentarioService.save(comentario);
		
	}
	
}
