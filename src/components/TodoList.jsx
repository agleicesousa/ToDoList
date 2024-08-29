import { useState, useEffect } from "react";
import TaskForm from './TaskForm';

export default function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [feedback, setFeedback] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = ({ task }) => {
        if (task.trim() !== '') {
            if (editIndex !== null) {
                const updatedTasks = tasks.map((t, i) =>
                    i === editIndex ? task : t
                );
                setTasks(updatedTasks);
                setEditIndex(null);
                setFeedback('Tarefa atualizada com sucesso!');
            } else {
                setTasks([...tasks, task]);
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

    return (
        <div className="">
            <header className="">
                <h1 className="">Lista de Tarefas</h1>
            </header>

            <main className="">
                {feedback && <p>{feedback}</p>}
                <TaskForm 
                    onAddTask={handleAddTask} 
                    editIndex={editIndex} 
                    tasks={tasks} 
                />

                <ul className="">
                    {tasks.map((task, index) => (
                        <li key={index} className=""> 
                            {task}
                            <button onClick={() => handleEditTask(index)} className="">
                                Editar
                            </button>

                            <button onClick={() => handleRemoveTask(index)} className="">
                                Apagar
                            </button>
                        </li>
                    ))}
                </ul>
            </main>

            <footer className="">
                <p className="">Copyright &copy; {new Date().getFullYear()} de <a
                    href="#" target="_blank" rel="noopener noreferrer" className="">
                        Agleice Sousa
                    </a>
                </p>
            </footer>
        </div>
    );
}