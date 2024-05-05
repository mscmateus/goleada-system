package com.goleada.goleada.models.enums;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;

/**
 * Enum utilizado para listar os módulos do sistema para servir como permissoes
 * de acesso no usuario e grupos de usuario
 */
@Getter
public enum ClubRole implements GrantedAuthority {
    // Perfis de Uusario do campo
    CLUB_ADMINISTRATOR("CLUB_ADMINISTRATOR", "Administrator de Clube"),
    CLUB_OPERATOR("CLUB_OPERATOR", "Operador de Clube");

    private String authority;
    private String title;

    private ClubRole(String authority, String titulo) {
        this.authority = authority;
        this.title = titulo;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

    @Override
    public String toString() {
        return this.authority;
    }
}