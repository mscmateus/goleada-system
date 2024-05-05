package com.goleada.goleada.models.entitys;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.goleada.goleada.models.enums.ConfirmationType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "confirmation_code", schema = "auth")
public class ConfirmationCode extends AbstractEntity {

   @NotNull(message = "Informe o código de confirmação")
   @Size(min = 6, max = 6, message = "O código de validação deve ter 6 digítos")
   @Column(name = "codigo", updatable = false, nullable = false)
   private String code;

   @NotBlank(message = "Informe o email de destino")
   @Column(name = "destination_email", updatable = false, nullable = false)
   private String destinationEmail;

   @NotBlank(message = "Informe o name do destinatário")
   @Column(name = "recipient_name", updatable = false, nullable = false)
   private String recipientName;

   @NotNull(message = "Informe a data de validade")
   @DateTimeFormat(iso = ISO.DATE_TIME)
   @Column(name = "validade", updatable = false, nullable = false)
   private LocalDateTime validity;

   @NotNull(message = "Informe o tipo de confirmação")
   @Column(name = "confirmation_type", updatable = false, nullable = false)
   @Enumerated(EnumType.STRING)
   private ConfirmationType confirmationType;

   @ManyToOne
   @JoinColumn(name = "user_id")
   private User user;

   public ConfirmationCode() {
      this.validity = LocalDateTime.now().plusDays(1);
      codeGenerator();
   }

   public ConfirmationCode(String destinationEmail, String name, ConfirmationType confirmationType) {
      this.destinationEmail = destinationEmail;
      this.recipientName = name;
      this.validity = LocalDateTime.now().plusDays(1);
      this.confirmationType = confirmationType;
      codeGenerator();
   }

   /*
    * Confirma se o código está correto e se é válido
    */

   public boolean confirmCode(String destinationEmail, String codigo) {
      return destinationEmail.equals(this.destinationEmail) && codigo.equals(this.code) && isValid();
   }

   public boolean isValid() {
      return this.validity.isAfter(LocalDateTime.now());
   }

   /*
    * Essa função gera um código aleatorio de 6 digítos para ser enviado ao
    * solicitante para confirmação
    */
   public void codeGenerator() {
      this.code = "";
      Random gerador = new Random();
      for (int i = 0; i < 6; i++) {
         this.code += String.valueOf(gerador.nextInt(9));
      }
   }

}
