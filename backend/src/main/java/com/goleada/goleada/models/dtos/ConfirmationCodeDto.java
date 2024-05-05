package com.goleada.goleada.models.dtos;

import com.goleada.goleada.models.enums.ConfirmationType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmationCodeDto {
   private String code;
   private String email;
   private ConfirmationType confirmationType;
}
