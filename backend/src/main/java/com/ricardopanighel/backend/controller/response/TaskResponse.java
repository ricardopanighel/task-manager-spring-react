package com.ricardopanighel.backend.controller.response;

public record TaskResponse(Long id, String title, String description, boolean completed) {
}
