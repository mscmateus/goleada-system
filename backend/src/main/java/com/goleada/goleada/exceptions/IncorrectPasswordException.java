package com.goleada.goleada.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IncorrectPasswordException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public IncorrectPasswordException(String ex) {
        super(ex);
    }
}
