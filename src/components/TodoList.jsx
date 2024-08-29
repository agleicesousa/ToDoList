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
        <div className="">
            <div className="">
                <header className="">
                    <h1 className="">Lista de Tarefas</h1>
                </header>

                <main className="">
                    <Feedback message={feedback} />
                    <TaskForm
                        onAddTask={handleAddTask}
                        editIndex={editIndex}
                        tasks={tasks}
                    />

                    <div className="">
                        <button onClick={() => setFilter('all')} className="">Todas</button>
                        <button onClick={() => setFilter('completed')} className="">Concluídas</button>
                        <button onClick={() => setFilter('incomplete')} className="">Não Concluídas</button>
                    </div>

                    <ul className="">
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

                <footer className="">
                    <p className="">
                        Copyright &copy; {new Date().getFullYear()} de{' '}
                        <a href="#" target="_blank" rel="noopener noreferrer" className="">
                            Agleice Sousa
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
}