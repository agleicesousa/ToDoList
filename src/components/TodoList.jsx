import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import Feedback from './Feedback';

export default function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [feedback, setFeedback] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = ({ task, dueDate }) => {
        if (task.trim() !== '') {
            if (editIndex !== null) {
                const updatedTasks = tasks.map((t, i) =>
                    i === editIndex ? { ...t, task, dueDate } : t
                );
                setTasks(updatedTasks);
                setEditIndex(null);
                setFeedback('Tarefa atualizada com sucesso!');
            } else {
                setTasks([...tasks, { task, dueDate, completed: false }]);
                setFeedback('Tarefa adicionada com sucesso!');
            }
        } else {
            setFeedback('Por favor, insira uma tarefa.');
        }
    };

    const handleEditTask = (index) => {
        setEditIndex(index);
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setFeedback('Tarefa removida com sucesso!');
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
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
                    <button onClick={() => handleFilterChange('all')} className="">Todas</button>
                    <button onClick={() => handleFilterChange('completed')} className="">Concluídas</button>
                    <button onClick={() => handleFilterChange('incomplete')} className="">Não Concluídas</button>
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
    );
}