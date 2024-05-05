package com.goleada.goleada.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.goleada.goleada.models.entitys.ConfirmationCode;
import com.goleada.goleada.models.enums.ConfirmationType;

public interface ConfirmationCodeRepository extends
            JpaRepository<ConfirmationCode, Long> {

      public Optional<ConfirmationCode> findByCodeAndDestinationEmailAndConfirmationType(String code,
                  String email,
                  ConfirmationType tipCodeConfirmacao);

      public Optional<ConfirmationCode> findByDestinationEmailAndConfirmationType(String email, ConfirmationType type);

      public Optional<ConfirmationCode> findByDestinationEmailAndConfirmationTypeAndUserId(String email,
                  ConfirmationType type, Long userId);

}
