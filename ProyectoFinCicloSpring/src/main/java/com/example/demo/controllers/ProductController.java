package com.example.demo.controllers;


import java.util.HashMap;
import java.util.Map;


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


import com.example.demo.models.Product;
import com.example.demo.service.ProductService;


@RestController
@RequestMapping("/api/products/")
public class ProductController {


	@Autowired
	private ProductService productService;
	

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/carrusel")
	
	public Page <Product> findItems(Pageable page){
		return productService.findAll(page);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/products")
	
	public Page <Product> findPagedItems(Pageable page){
		return productService.findAll(page);
		
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping ("/product/{id}")
	
	public ResponseEntity<Object> getProduct(@PathVariable long id) {
		
		Product product = productService.findById(id);
		
	if(product != null) {
			
			return new ResponseEntity<>(product, HttpStatus.OK);
			
		}else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}	
	
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@PutMapping("/products/{id}")
	public ResponseEntity<?> updateProduct(@Valid @RequestBody Product product, @PathVariable Long id) {
		Product actualProduct = productService.findById(id);
		Product modifiedProduct = null;

		Map<String, Object> response = new HashMap<>();

		if (actualProduct == null) {
			response.put("mensaje", "El Perfil ID: ".concat(id.toString()).concat(" no existe en la base de datos"));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		actualProduct.setName(product.getName());
		actualProduct.setDescription(product.getDescription());
		actualProduct.setPrice(product.getPrice());
		actualProduct.setImg(product.getImg());
		modifiedProduct = productService.save(actualProduct);

		response.put("mensaje", "El Producto ha sido actualizado con éxito");
		response.put("perfil", modifiedProduct);

		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@PostMapping("/products")
	
	public Product saveProducts(@RequestBody Product product){
		return productService.save(product);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@GetMapping("/admin")
	
	public Page <Product> findItemsAdmin(Pageable page){
		return productService.findAll(page);
		
	}
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@DeleteMapping ("/products/{id}")
	
	public void deleteProduct(@PathVariable long id) {
		productService.deleteById(id);
	}
	
}
	