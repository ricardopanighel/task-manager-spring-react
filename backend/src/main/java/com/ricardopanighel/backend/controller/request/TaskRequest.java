package com.ricardopanighel.backend.controller.request;

public record TaskRequest(String title, String description, boolean completed) {
}
