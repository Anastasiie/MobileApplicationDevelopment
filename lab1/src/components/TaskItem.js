import React, { useContext, useCallback, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskItem = ({ task }) => {
    const { tasks, setTasks } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const toggleComplete = useCallback(() => {
        setTasks(tasks.map(t => (t.id === task.id ? { ...t, completed: !t.completed } : t)));
    }, [tasks, setTasks, task.id]);

    const deleteTask = useCallback(() => {
        setTasks(tasks.filter(t => t.id !== task.id));
    }, [tasks, setTasks, task.id]);

    const startEditing = useCallback(() => {
        setIsEditing(true);
        setEditText(task.text);
    }, [task.text]);

    const saveEditing = useCallback(() => {
        if (editText.trim() === "") return;
        setTasks(tasks.map(t => 
            t.id === task.id ? { ...t, text: editText } : t
        ));
        setIsEditing(false);
    }, [tasks, setTasks, task.id, editText]);

    const cancelEditing = useCallback(() => {
        setIsEditing(false);
        setEditText(task.text);
    }, [task.text]);

    return (
        <div className="task-item">
            <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={toggleComplete} 
            />
            
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-input"
                    />
                    <div className="task-actions">
                        <button onClick={saveEditing}>✅</button>
                        <button onClick={cancelEditing}>❌</button>
                    </div>
                </>
            ) : (
                <>
                    <span 
                        style={{ textDecoration: task.completed ? "line-through" : "none" }}
                        onDoubleClick={startEditing}
                        className="task-text"
                    >
                        {task.text}
                    </span>
                    <div className="task-actions">
                        <button onClick={startEditing}>✏️</button>
                        <button onClick={deleteTask}>❌</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;