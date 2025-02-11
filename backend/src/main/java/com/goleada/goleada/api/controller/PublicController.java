package com.goleada.goleada.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.goleada.goleada.models.dtos.ConfirmationCodeDto;
import com.goleada.goleada.models.dtos.PasswordResetDto;
import com.goleada.goleada.models.entitys.User;
import com.goleada.goleada.services.ConfirmationCodeService;
import com.goleada.goleada.services.UserService;

@RestController
@RequestMapping(path = "/public")
public class PublicController {

   @Autowired
   private UserService userService;

   @Autowired
   private ConfirmationCodeService confirmationCodeService;

   /**
    * End-point para cadastro de uma nova pessoa fisica
    */
   @PostMapping("/singup")
   public ResponseEntity<?> singup(@RequestBody User newUser,
         BindingResult bindingResult) {
      if (bindingResult.hasErrors()) {
         List<String> errors = bindingResult.getAllErrors()
               .stream()
               .map(ObjectError::getDefaultMessage)
               .collect(Collectors.toList());

         return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
      }
      try {
         userService.save(newUser);
      } catch (Exception e) {
         List<String> errorList = new ArrayList<>();
         errorList.add(e.getMessage());
         return new ResponseEntity<>(errorList, HttpStatus.BAD_REQUEST);
      }
      return new ResponseEntity<String>("Conta criada com sucesso!", HttpStatus.CREATED);
   }

   /**
    * End-point para envio do email de confirmação
    */
   @PostMapping("/singup/confirmation-email-request")
   public ResponseEntity<?> sendConfirmationEmail(@RequestParam("email") String enderecoEmail,
         @RequestParam String name) {
      userService.enviaConfirmacaoEmailNovoUsuario(enderecoEmail, name);
      return new ResponseEntity<String>("E-mail enviado com sucesso!", HttpStatus.OK);
   }

   /**
    * End-point para solicitação de redefinição de senha
    */
   @PostMapping(path = "/password-reset/request")
   public ResponseEntity<String> passwordResetRequest(@RequestParam String email) {
      userService.sendPasswordReset(email);
      return new ResponseEntity<String>("E-mail Enviado com sucesso!", HttpStatus.OK);
   }

   /**
    * End-point para a redefinição de senha
    */
   @PostMapping(path = "/password-reset/reset")
   public ResponseEntity<String> passwordReset(@RequestBody PasswordResetDto passwordResetDto) {
      userService.resetPassword(passwordResetDto);
      return new ResponseEntity<String>("Código confirmado!", HttpStatus.OK);
   }

   /**
    * End-point para validação de códigos de confirmação
    */
   @PostMapping(path = "/code-validation")
   public ResponseEntity<String> valideConfirmationCode(@RequestBody ConfirmationCodeDto codigoConfirmacao) {
      confirmationCodeService.valideConfirmationCode(codigoConfirmacao.getCode(), codigoConfirmacao.getEmail(),
            codigoConfirmacao.getConfirmationType());
      return new ResponseEntity<String>("Código confirmado!", HttpStatus.OK);
   }

}
