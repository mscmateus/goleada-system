package com.goleada.goleada.models.entitys;

import com.goleada.goleada.models.enums.ClubRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "club_users", schema = "auth")
public class ClubUser extends AbstractEntity {

   @ManyToOne
   @JoinColumn(name = "user_id")
   private User user;

   @ManyToOne
   @JoinColumn(name = "club_id")
   private Club club;

   @Column(name = "enabled")
   private Boolean enabled;

   @Enumerated(EnumType.STRING)
   @Column(name = "role")
   private ClubRole role;

   public boolean isEnabled() {
      return this.enabled;
   }
}
