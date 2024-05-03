package com.goleada.goleada.models.entitys;

import org.hibernate.validator.constraints.br.CNPJ;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "clubs", schema = "club")
public class Club extends AbstractEntity {

   public Club() {

   }

   /**
    * CNPJ do clube
    */
   @NotBlank(message = "Informe o CNPJ")
   @NotNull(message = "Informe o CNPJ")
   @Column(name = "cpf", length = 14, unique = true, nullable = false)
   @CNPJ(message = "Informe um CNPJ válido")
   private String cnpj;

   @NotBlank(message = "Informe o nome")
   @NotNull(message = "Informe o nome")
   @Column(name = "name", length = 50, nullable = false)
   private String name;

}
