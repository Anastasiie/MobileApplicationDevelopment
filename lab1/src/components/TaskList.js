import React, { useContext, useMemo, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";

const TaskList = () => {
    const { tasks } = useContext(TaskContext);
    const [filter, setFilter] = useState("all");

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "active") return !task.completed;
            return true;
        });
    }, [tasks, filter]);

    const taskCount = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);

    return (
        <div className="task-list">
            <TaskFilter filter={filter} setFilter={setFilter} />
            {filteredTasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
            <div className="task-counter">Завдань залишилось: {taskCount}</div>
        </div>
    );
};

export default TaskList;
