package com.ricardopanighel.backend.mapper;

import com.ricardopanighel.backend.controller.request.TaskRequest;
import com.ricardopanighel.backend.controller.response.TaskResponse;
import com.ricardopanighel.backend.entity.Task;

// Utility Class
public class TaskMapper {

    private TaskMapper() {}

    // CREATE
    public static Task toTask(TaskRequest request){
        Task task = new Task();
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setCompleted(request.completed());
        return task;
    }

    // READ
    public static TaskResponse toTaskResponse(Task task){
        return new TaskResponse(task.getId(), task.getTitle(), task.getDescription(), task.isCompleted());
    }

    // UPDATE
    public static void updateTask(Task task, TaskRequest request){
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setCompleted(request.completed());
    }
}
