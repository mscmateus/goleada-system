package com.goleada.goleada.models.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailUpdateDto {
   private String codigo;
   private String email;
   private String senha;

   public EmailUpdateDto() {

   }

   public EmailUpdateDto(String codigo, String email, String senha) {
      this.codigo = codigo;
      this.email = email;
      this.senha = senha;
   }

}
