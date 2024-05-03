package com.goleada.goleada.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidValidationCodeException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InvalidValidationCodeException(String ex) {
        super(ex);
    }
}
