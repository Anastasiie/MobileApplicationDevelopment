import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext(); // Іменований експорт

export const TaskProvider = ({ children }) => { // Іменований експорт
    const [tasks, setTasks] = useState([]);
    
    // Завантаження з localStorage при ініціалізації
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Збереження у localStorage при зміні завдань
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
