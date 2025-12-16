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
    public ResponseEntity<List<TaskResponse>> getAllTasks() {
        List<Task> tasks = taskService.findAll();
        List<TaskResponse> list = tasks.stream()
                .map(task -> {
                    return TaskMapper.toTaskResponse(task);
                })
                .toList();

        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        Task task = taskService.findTaskById(id)
                .orElseThrow(() -> new RuntimeException("Task not found."));

        TaskResponse taskResponse = TaskMapper.toTaskResponse(task);

        return ResponseEntity.ok(taskResponse);
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@RequestBody TaskRequest request) {
        Task newTask = TaskMapper.toTask(request);
        Task savedTask = taskService.saveTask(newTask);
        TaskResponse taskResponse = TaskMapper.toTaskResponse(savedTask);

        return ResponseEntity.status(HttpStatus.CREATED).body(taskResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @RequestBody TaskRequest requestDetails) {
        Task task = taskService.findTaskById(id)
                .orElseThrow(() -> new RuntimeException("Task not found."));

        TaskMapper.updateTask(task, requestDetails);
        Task savedUpdate = taskService.saveTask(task);
        TaskResponse taskResponse = TaskMapper.toTaskResponse(savedUpdate);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(taskResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) {
        taskService.deleteTaskById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}