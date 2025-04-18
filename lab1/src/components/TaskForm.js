import React, { useState, useContext, useRef } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const [taskText, setTaskText] = useState("");
    const inputRef = useRef(null);

    const addTask = () => {
        if (taskText.trim() === "") return;
        setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
        setTaskText("");
        inputRef.current.focus();
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Нове завдання..."
            />
            <button onClick={addTask}>Додати</button>
        </div>
    );
};

export default TaskForm;
