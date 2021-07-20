package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long>{

}
