package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.models.Comentario;
import com.example.demo.repository.ComentarioRepository;


@Service
public class ComentarioServiceImpl implements ComentarioService{

	@Autowired
	private ComentarioRepository comentarioRepository;
	
	
	@Override
	@Transactional
	public Comentario save(Comentario comentario) {
		// TODO Auto-generated method stub
		return comentarioRepository.save(comentario);
	}

	@Override
	@Transactional
	public void deleteById(long id) {


		comentarioRepository.deleteById(id);
		
	}

	@Override
	@Transactional
	public Page<Comentario> findAll(Pageable page) {
		// TODO Auto-generated method stub
		return comentarioRepository.findAll(page);
	}

	
	
	
}
