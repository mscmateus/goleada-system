package com.goleada.goleada.models.dtos;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * 
 */
@Getter
@Setter
@AllArgsConstructor
public class UserListItemDto {

    /**
     * Default constructor
     */
    public UserListItemDto() {
    }

    private Long id;
    @DateTimeFormat(iso = ISO.DATE)
    private LocalDateTime insertDate;
    private String cpf;
    private String fullName;
    private String userName;
    private String email;

}