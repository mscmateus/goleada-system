package com.goleada.goleada.models.dtos;

public class PasswordResetDto {
   private String codigo;
   private String email;
   private String novaSenha;

   public PasswordResetDto() {

   }

   public PasswordResetDto(String codigo, String email, String novaSenha) {
      this.codigo = codigo;
      this.email = email;
      this.novaSenha = novaSenha;
   }

   public String getCodigo() {
      return codigo;
   }

   public void setCodigo(String codigo) {
      this.codigo = codigo;
   }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getNovaSenha() {
      return novaSenha;
   }

   public void setNovaSenha(String novaSenha) {
      this.novaSenha = novaSenha;
   }

}
