package com.ricardopanighel.backend.controller;

import com.ricardopanighel.backend.controller.request.TaskRequest;
import com.ricardopanighel.backend.controller.response.TaskResponse;
import com.ricardopanighel.backend.entity.Task;
import com.ricardopanighel.backend.mapper.TaskMapper;
import com.ricardopanighel.backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskResponse> getAllTasks() {
        List<Task> tasks = taskService.findAll();
        return tasks.stream()
                .map(task -> {
                    return TaskMapper.toTaskResponse(task);
                })
                .toList();
    }

    @GetMapping("/{id}")
    public TaskResponse getTaskById(@PathVariable Long id) {
        Task task = taskService.findTaskById(id)
                .orElseThrow(() -> new RuntimeException("Task not found."));

        return TaskMapper.toTaskResponse(task);
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody TaskRequest request) {
        Task newTask = TaskMapper.toTask(request);
        Task savedTask = taskService.saveTask(newTask);
        return TaskMapper.toTaskResponse(savedTask);
    }

    @PutMapping("/{id}")
    public TaskResponse updateTask(@PathVariable Long id, @RequestBody TaskRequest requestDetails) {
        Task task = taskService.findTaskById(id)
                .orElseThrow(() -> new RuntimeException("Task not found."));

        TaskMapper.updateTask(task, requestDetails);
        Task savedUpdate = taskService.saveTask(task);
        return TaskMapper.toTaskResponse(savedUpdate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}