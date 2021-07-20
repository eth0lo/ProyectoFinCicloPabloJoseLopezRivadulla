package com.example.demo.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.models.Comentario;


public interface ComentarioService {

		Comentario save(Comentario comentario);
		void deleteById(long id);
		Page<Comentario> findAll(Pageable page);	
		
}

