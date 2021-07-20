package com.example.demo.models;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property ="id")
@Table(name = "torneos")
public class Torneo{




	@Id	
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	
	private Long id;
	
	private String nombre;
	
	private String img;
	private String url;
	

	@OneToMany (mappedBy ="torneo")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	public List<Comentario> comentario;
	
	public Torneo() {
		
	}

	public Torneo(String nombre, String url, String img) {
		
		
		this.nombre = nombre;

		this.url = url;
		this.img = img;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<Comentario> getComentario() {
		return comentario;
	}

	public void setComentario(List<Comentario> comentario) {
		this.comentario = comentario;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}


	
}
