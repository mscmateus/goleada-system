package com.goleada.goleada.models.enums;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;

/**
 * Enum utilizado para listar os módulos do sistema para servir como permissoes
 * de acesso no usuario e grupos de usuario
 */
@Getter
public enum GoleadaRole implements GrantedAuthority {
    GOLEADA_ADMINISTRATOR("GOLEADA_ADMINISTRATOR", "Administrator do Goleada"),
    GOLEADA_OPERATOR("GOLEADA_OPERATOR", "Operador do Goleada");

    private String authority;
    private String title;

    private GoleadaRole(String authority, String titulo) {
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