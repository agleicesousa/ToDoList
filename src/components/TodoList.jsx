import { useState, useEffect } from "react";

export default function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [feedback, setFeedback] = useState('');
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask]);
            setNewTask('');
            setFeedback('Tarefa adicionada com sucesso!');
        } else {
            setFeedback('Por favor, insira uma tarefa.');
        }
    };

    return (
        <div className="">
            <header className="">
                <h1 className="">Lista de Tarefas</h1>
            </header>

            <main>
                {feedback && <p className="">{feedback}</p>}
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task..."
                    className=""
                />
                <button onClick={handleAddTask}>Adicionar tarefa</button>

                <ul className="">
                    {tasks.map((task, index) => (
                        <li key={index} className="">
                            {task}
                        </li>
                    ))}
                </ul>
            </main>

            <footer className="">
                <p className="">Agleice Sousa, todos os direitos reservados</p>
            </footer>
        </div>
    );
}