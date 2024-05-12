package com.goleada.goleada.models.entitys;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder.SecretKeyFactoryAlgorithm;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.goleada.goleada.models.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

/**
 * Classe basica de usuario do sistema
 */
@Getter
@Setter
@Entity
@Table(name = "users", schema = "auth")
public class User extends AbstractEntity implements UserDetails {

    /**
     * Default constructor
     */
    public User() {

    }

    /**
     * CPF do Usuário
     */
    @NotBlank(message = "Informe o CPF")
    @NotNull(message = "Informe o CPF")
    @Column(name = "cpf", length = 11, unique = true, nullable = false)
    @CPF(message = "Informe um CPF válido")
    private String cpf;

    /**
     * Nome completo do Usuário
     */
    @NotBlank(message = "Informe o nome")
    @NotBlank(message = "Informe o nome")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    /**
     * Nome completo do Usuário
     */
    @NotBlank(message = "Informe o sobrenome")
    @NotNull(message = "Informe o sobrenome")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    /**
     * Apelido pelo qual o Usuário deseja ser chamado
     */
    @NotBlank(message = "Informe um nome de usuário")
    @NotNull(message = "Informe um nome de usuário")
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    /**
     * E-Mail do Usuário cadastrado
     */
    @NotBlank(message = "Informe o e-mail")
    @NotNull(message = "Informe o e-mail")
    @Email(message = "Informe um e-mail válido")
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    /**
     * Senha do Usuário para acessar o sistema
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Informe a senha")
    @NotNull(message = "Informe a senha")
    @Column(name = "password", nullable = false)
    private String password;

    /**
     * Flag que define se o Usuário está ativo no sistema
     */
    @NotNull(message = "Informe se o Usuário está ativo")
    @Column(name = "enabled", nullable = false)
    private Boolean enabled;

    /**
     * Flag que define se o Usuário está bloqueado no sistema
     */
    @NotNull(message = "Informe se o Usuário está bloqueado")
    @Column(name = "locked", nullable = false)
    private Boolean locked;

    /**
     * Perfil do usuarioF
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    // @ManyToOne
    // private List<ClubUser> clubRoles;

    /*
     * Padrão do UserDetails
     * Retorna uma lista com todas as permissoes de usuário, concatenando as
     * permissoes e as permissões dos grupos que ele está
     */
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(role);
        return authorities;
    }

    /*
     * Pega as autorização do usuario e de seus grupos em forma de string
     */
    public List<String> getStringAuthorities() {
        List<String> authorities = new ArrayList<String>();
        for (GrantedAuthority permissao : getAuthorities())
            authorities.add(permissao.toString());
        return authorities;
    }

    /*
     * Define a senha do usuario salvando-a codificada
     */
    public void setPassword(
            @Pattern(regexp = "/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/", message = "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial") @Length(min = 8, message = "A senha deve conter no mínimo 8 caracteres.") String senha) {
        if (!senha.isEmpty() || senha != null) {
            Map<String, PasswordEncoder> encoders = new HashMap<>();

            Pbkdf2PasswordEncoder pbkdf2Encoder = new Pbkdf2PasswordEncoder("", 8, 185000,
                    SecretKeyFactoryAlgorithm.PBKDF2WithHmacSHA256);

            encoders.put("pbkdf2", pbkdf2Encoder);
            DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("pbkdf2", encoders);
            passwordEncoder.setDefaultPasswordEncoderForMatches(passwordEncoder);

            this.password = passwordEncoder.encode(senha);
        }
    }

    /*
     * verifica se a senha informada é igual a do usuario
     */
    public boolean isPasswordCorrect(String senha) {
        Map<String, PasswordEncoder> encoders = new HashMap<>();

        Pbkdf2PasswordEncoder pbkdf2Encoder = new Pbkdf2PasswordEncoder("", 8, 185000,
                SecretKeyFactoryAlgorithm.PBKDF2WithHmacSHA256);

        encoders.put("pbkdf2", pbkdf2Encoder);
        DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("pbkdf2", encoders);
        return passwordEncoder.matches(senha, this.password);
    }

    /*
     * Padrão do UserDetails
     * Retorna a senha
     */
    @Override
    public String getPassword() {
        return this.password;
    }

    /*
     * Padrão do UserDetails
     * Retorna o userName no caso o cpf do usuario
     */
    @Override
    public String getUsername() {
        return this.username;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf.replaceAll("[^0-9]", "");
    }

    /*
     * Padrão do UserDetails
     * Retorna se a conta de usuario esta expirada
     * Afeta o login se false
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /*
     * Padrão do UserDetails
     * Retorna se a conta não esta bloqueada
     * Afeta o login se true
     */
    @Override
    public boolean isAccountNonLocked() {
        return !this.locked;
    }

    /*
     * Padrão do UserDetails
     * Retorna se as credenciais não estão expiradas
     * Afeta o login se false
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /*
     * Padrão do UserDetails
     * Retorna se o usuario esta ativo
     * Afeta o login se false
     */
    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}