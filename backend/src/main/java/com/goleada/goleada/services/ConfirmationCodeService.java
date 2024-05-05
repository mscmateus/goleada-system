package com.goleada.goleada.services;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.goleada.goleada.exceptions.InvalidConfirmationCodeException;
import com.goleada.goleada.models.entitys.ConfirmationCode;
import com.goleada.goleada.models.enums.ConfirmationType;
import com.goleada.goleada.repositories.ConfirmationCodeRepository;

@Service
public class ConfirmationCodeService extends GenericService<ConfirmationCode> {

   private ConfirmationCodeRepository repository;

   public ConfirmationCodeService(ConfirmationCodeRepository repository) {
      super(repository);
      this.repository = repository;
   }

   /*
    * Cria código de confirmação de email para o cadastro de usuario
    */
   @Transactional(readOnly = false)
   public ConfirmationCode createConfirmationCodeEmail(String email, String novoUsuarioNome,
         ConfirmationType tipoConfirmacao) {
      Optional<ConfirmationCode> codigoExistenteOpt = repository
            .findByDestinationEmailAndConfirmationType(email, tipoConfirmacao);
      if (codigoExistenteOpt.isPresent()) {
         repository.deleteById(codigoExistenteOpt.get().getId());
      }

      ConfirmationCode ConfirmationCode = new ConfirmationCode(email, novoUsuarioNome, tipoConfirmacao);
      ConfirmationCode = repository.save(ConfirmationCode);

      return ConfirmationCode;
   }

   /*
    * Esse método recebe os dados do codigo para valida-lo
    */
   public ConfirmationCode valideConfirmationCode(String codigo, String email, ConfirmationType tipoConfirmacao) {
      Optional<ConfirmationCode> codigoExistenteOpt = repository
            .findByCodeAndDestinationEmailAndConfirmationType(codigo, email, tipoConfirmacao);
      if (codigoExistenteOpt.isPresent()) {
         if (codigoExistenteOpt.get().isValid())
            return codigoExistenteOpt.get();
         throw new InvalidConfirmationCodeException("O código de confirmação não é válido");
      }
      throw new InvalidConfirmationCodeException("O código de confirmação não é válido");
   }

}
