package com.goleada.goleada.models.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordUpdateDto {
   private String currentPassword;
   private String newPassword;

   public PasswordUpdateDto() {

   }

   public PasswordUpdateDto(String currentPassword, String newPassword) {
      this.currentPassword = currentPassword;
      this.newPassword = newPassword;
   }
}
