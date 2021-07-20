package com.example.demo.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "productos")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private long id;

	private String name;

	private String description;

	private double price;
	
	@Lob
	private String img;

	public Product(String name, double price, String img, String description) {

		this.name = name;

		this.price = price;
		this.img = img;
		this.description = description;
	}

	public Product() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
