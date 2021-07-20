package com.example.demo.models;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;





@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property ="id")
@Table(name = "comentarios")
public class Comentario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Lob
	private String texto;
	
	
	@Column(name = "create_at")
	@Temporal(TemporalType.DATE)
	private Date createAt;
	

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	private Torneo torneo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Comentario() {

	}
	
	@PrePersist
	public void prePersist() {
		
		this.createAt = new Date();
		
	}

	public Comentario(Long id, String texto, Date createAt, Torneo torneo, User user) {
		this.id = id;
		this.texto = texto;
		this.createAt = createAt;
		this.torneo = torneo;
		this.user = user;
	}

	public Comentario(String texto) {
		this.texto = texto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Torneo getTorneoComentarios() {
		return torneo;
	}

	public void setTorneoComentarios(Torneo torneo) {
		this.torneo= torneo;
	}

	
	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}



}
