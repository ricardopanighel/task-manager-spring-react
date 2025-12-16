package com.ricardopanighel.backend.exception;

public class TaskNotFoundException extends RuntimeException{

    public TaskNotFoundException(String errorMessage) {
        super(errorMessage);
    }

}
