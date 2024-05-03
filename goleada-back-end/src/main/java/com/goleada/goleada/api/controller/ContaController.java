package com.goleada.goleada.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.goleada.goleada.models.dtos.EmailUpdateDto;
import com.goleada.goleada.models.dtos.PasswordUpdateDto;
import com.goleada.goleada.models.entitys.User;
import com.goleada.goleada.services.UserService;

@RestController
@RequestMapping(path = "/conta")
public class ContaController {

	@Autowired
	private UserService userService;

	@GetMapping("/user")
	public ResponseEntity<User> getUserAutenticado(@AuthenticationPrincipal User user) {
		user = userService.getByUsername(user.getUsername());
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@GetMapping("/permissoes")
	public ResponseEntity<List<String>> getUserAutenticadoPermissoes(
			@AuthenticationPrincipal User user) {
		user = userService.getByUsername(user.getUsername());
		return new ResponseEntity<List<String>>(user.getStringAuthorities(), HttpStatus.OK);
	}

	@DeleteMapping("/excluir")
	public ResponseEntity<?> delete(@AuthenticationPrincipal User user) {
		userService.removeById(user.getId());
		return new ResponseEntity<>("Conta excluida com sucesso!", HttpStatus.OK);
	}

	// Para a confirmação do email na hora da alteração
	@PostMapping("/alteracao-email/solicitacao")
	public ResponseEntity<?> enviaConfirmacaoAlteracaoEmail(@AuthenticationPrincipal User user,
			@RequestParam("email") String enderecoEmail) {
		userService.enviaCodigoAlteracaoEmail(enderecoEmail, user.getId());
		return new ResponseEntity<String>("E-mail enviado com sucesso!", HttpStatus.OK);
	}

	// Altera o email do user
	@PostMapping("/alteracao-email/alteracao")
	public ResponseEntity<?> alteraEmailDoUser(@RequestBody EmailUpdateDto emailUpdate,
			@AuthenticationPrincipal User user) {
		userService.updateEmail(emailUpdate, user.getId());
		return new ResponseEntity<String>("Email alterado com sucesso!", HttpStatus.OK);
	}

	@PostMapping(path = "/alteracao-senha")
	public ResponseEntity<String> alterSenhaDoUser(@RequestBody PasswordUpdateDto passwordReset,
			@AuthenticationPrincipal User user) {
		userService.updatePassword(passwordReset, user.getId());
		return new ResponseEntity<String>("Senha alterada com sucesso!", HttpStatus.OK);
	}

}
