package com.ricardopanighel.backend.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TaskRequest(
        @NotBlank(message="The title can't be empty.")
        @Size(max=100)
        String title,

        @Size(max=500)
        String description,

        boolean completed) { }
