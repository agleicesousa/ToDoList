import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import Feedback from './Feedback';

const useTasks = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskDetails, editIndex) => {
        if (editIndex !== null) {
            const updatedTasks = tasks.map((t, i) =>
                i === editIndex ? { ...t, ...taskDetails } : t
            );
            setTasks(updatedTasks);
        } else {
            setTasks([...tasks, { ...taskDetails, completed: false }]);
        }
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    return { tasks, addTask, removeTask, toggleComplete };
};

const useFeedback = () => {
    const [feedback, setFeedback] = useState('');

    const showFeedback = (message) => {
        setFeedback(message);
        setTimeout(() => setFeedback(''), 3000);
    };

    return { feedback, showFeedback };
};

export default function ToDoList() {
    const { tasks, addTask, removeTask, toggleComplete } = useTasks();
    const { feedback, showFeedback } = useFeedback();
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState('all');

    const handleAddTask = (taskDetails) => {
        addTask(taskDetails, editIndex);
        showFeedback(editIndex !== null ? 'Tarefa atualizada com sucesso!' : 'Tarefa adicionada com sucesso!');
        setEditIndex(null);
    };

    const handleEditTask = (index) => {
        setEditIndex(index);
    };

    const handleRemoveTask = (index) => {
        removeTask(index);
        showFeedback('Tarefa removida com sucesso!');
    };

    const handleToggleComplete = (index) => {
        toggleComplete(index);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="container p-6 bg-white rounded-lg shadow-lg max-w-md w-full overflow-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-center text-blue-600">Lista de Tarefas</h1>
                </header>

                <main className="space-y-6">
                    <Feedback message={feedback} />
                    <TaskForm
                        onAddTask={handleAddTask}
                        editIndex={editIndex}
                        tasks={tasks}
                    />

                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={() => setFilter('all')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Todas</button>
                        <button onClick={() => setFilter('completed')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">Concluídas</button>
                        <button onClick={() => setFilter('incomplete')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Não Concluídas</button>
                    </div>

                    <ul className="space-y-4">
                        {filteredTasks.map((task, index) => (
                            <TaskItem
                                key={index}
                                task={task}
                                index={index}
                                onEdit={handleEditTask}
                                onRemove={handleRemoveTask}
                                onToggleComplete={handleToggleComplete}
                            />
                        ))}
                    </ul>
                </main>

                <footer className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Copyright © {new Date().getFullYear()} de{' '}
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Agleice Sousa
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
}