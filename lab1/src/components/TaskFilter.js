import React from "react";

const TaskFilter = ({ filter, setFilter }) => {
    return (
        <div className="task-filter">
            <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
            >
                Всі
            </button>
            <button
                className={filter === "active" ? "active" : ""}
                onClick={() => setFilter("active")}
            >
                Активні
            </button>
            <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
            >
                Виконані
            </button>
        </div>
    );
};

export default TaskFilter;
