package com.ricardopanighel.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks") // PostgreSQL table name
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique identifier

    @Column(length = 100, nullable = false)
    private String title;    // Task title

    @Column(length = 500, nullable = true)
    private String description; // Task description

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean completed;  // status

    // Empty constructor necessary to JPA
    public Task() {}

    // Constructor
    public Task(String title, String description, boolean completed) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    //Getters and Setters
    public Long getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public Boolean isCompleted(){
        return completed;
    }

    public void setCompleted(boolean completed){
        this.completed = completed;
    }
}
