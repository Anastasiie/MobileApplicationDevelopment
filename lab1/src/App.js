import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import './App.css';

const App = () => {
    return (
        <TaskProvider>
            <div className="container">
                <h1>Менеджер завдань</h1>
                <TaskForm />
                <TaskList />
            </div>
        </TaskProvider>
    );
};

export default App;