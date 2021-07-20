package com.example.demo.controllers;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.ERole;
import com.example.demo.models.Role;
import com.example.demo.models.User;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.SignupRequest;
import com.example.demo.payload.response.JwtResponse;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.repository.RoleRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.security.services.UserDetailsImpl;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	

	@PostMapping("/signin")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 userDetails.getName(),
												 userDetails.getLastname(),
												 userDetails.getBirthdate(),
												 roles));
	}

	@PostMapping("/signup")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		
		Map<String, Object> response = new HashMap<>();
		
		if (userService.existsByUsername(signUpRequest.getUsername())) {

			response.put("error", "Error: El email del usuario ya está en uso");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		if (userService.existsByEmail(signUpRequest.getEmail())) {
			
			response.put("error", "Error: El email del usuario ya está en uso");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		// Creamos un nuevo usuario
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),
							 signUpRequest.getName(),
							 signUpRequest.getLastname(),
							 signUpRequest.getBirthdate());

		Set<String> strRoles = signUpRequest.getRole();
		System.out.println(strRoles);
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userService.save(user);

		return ResponseEntity.ok(new MessageResponse("Se ha registrado el usuario de forma correcta."));
	}

	
	@PostMapping("/signupAdmin")
	@CrossOrigin(origins = "http://localhost:3000")
	@Secured("ROLE_ADMIN")
	public ResponseEntity<?> registerUserAdmin(@Valid @RequestBody SignupRequest signUpRequest) {
		
		Map<String, Object> response = new HashMap<>();
		
		if (userService.existsByUsername(signUpRequest.getUsername())) {

			response.put("error", "Error: El email del usuario ya está en uso");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		if (userService.existsByEmail(signUpRequest.getEmail())) {
			
			response.put("error", "Error: El email del usuario ya está en uso");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}

		// Creamos un nuevo usuario
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),
							 signUpRequest.getName(),
							 signUpRequest.getLastname(),
							 signUpRequest.getBirthdate());

		Set<String> strRoles = signUpRequest.getRole();
		System.out.println(strRoles);
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userService.save(user);

		return ResponseEntity.ok(new MessageResponse("Se ha registrado el usuario de forma correcta."));
	}
}

