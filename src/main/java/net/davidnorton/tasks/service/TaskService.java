package net.davidnorton.tasks.service;

import net.davidnorton.tasks.domain.Task;

public interface TaskService {

    Iterable<Task> list();

    Task save(Task task);
}
