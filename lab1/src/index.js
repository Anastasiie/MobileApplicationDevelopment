import React from 'react';
import { createRoot } from 'react-dom/client'; // Змінено імпорт
import App from './App';

const root = createRoot(document.getElementById('root')); // Створюємо корінь
root.render(<App />); // Використовуємо метод render на корені