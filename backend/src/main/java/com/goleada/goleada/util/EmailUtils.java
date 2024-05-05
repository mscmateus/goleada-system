package com.goleada.goleada.util;

import java.util.HashMap;
import java.util.Map;

import com.goleada.goleada.models.Email;
import com.goleada.goleada.models.entitys.User;

public abstract class EmailUtils {
   public static Email getPasswordResetEmail(String code, User user) {
      Email email = new Email();
      email.setTo(user.getEmail());
      email.setFrom("teste.email.ac@gmail.com");
      email.setSubject("Redefinição de Senha");
      email.setContent("Redefinicao de Senha");
      email.setTemplate("email/code-email.flth");
      Map<String, Object> model = new HashMap<>();
      model.put("code", code);
      model.put("name", user.getFirstName());
      model.put("message", "Para proseguir com a redefinição de senha basta informar o código.");
      email.setModel(model);
      return email;
   }

   public static Email getEmailConfirmationEmail(String emailAdress, String code, String nome) {
      Email email = new Email();
      email.setTo(emailAdress);
      email.setFrom("teste.email.ac@gmail.com");
      email.setSubject("Confirmação de Email");
      email.setContent("Confirmação de Email");
      email.setTemplate("email/code-email.flth");
      Map<String, Object> model = new HashMap<>();
      model.put("code", code);
      model.put("name", nome);
      model.put("message", "Para confirmar seu email basta informar o código.");
      email.setModel(model);
      return email;
   }
}
