package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserService userService;

	//Modificar un usuario creado
	@CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("{id}")
    public ResponseEntity <?> updateUsuario(@Valid @RequestBody User usuario, BindingResult result, @PathVariable Long id ) {
        User usuarioActual = userService.findById(id);
        User usuarioModificado = null;

        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(err -> err.getField() + ": " + err.getDefaultMessage()).collect(Collectors.toList());

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (usuarioActual == null) {
            response.put("mensaje", "El Usuario ID: ".concat(id.toString()).concat(" no existe en la base de datos"));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }


            usuarioActual.setName(usuario.getName());
            usuarioActual.setLastname(usuario.getLastname());
           
            usuarioActual.setBirthdate(usuario.getBirthdate());

            usuarioModificado = userService.save(usuarioActual);
        

        response.put("mensaje", "El usuario ha sido actualizado con éxito. La página se rederigirá al login, vuelve a acceder a la aplicación");
        response.put("user", usuarioModificado);

        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/users")
	@Secured("ROLE_ADMIN")
	public Page <User> findAll(Pageable page){
		return userService.findAll(page);
		
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	@DeleteMapping("/users/{id}")
	
	public void eliminarUsuario(@PathVariable long id) {
		
		userService.deleteById(id);
		
	}
	
	
	
	
}
