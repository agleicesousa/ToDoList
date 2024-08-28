import { useState, useEffect } from "react";

export default function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [feedback, setFeedback] = useState('');
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            if (editIndex !== null) {
                const updatedTasks = tasks.map((task, i) =>
                    i === editIndex ? newTask : task
                );
                setTasks(updatedTasks);
                setEditIndex(null);
                setFeedback('Tarefa atualizada com sucesso!');
            } else {
                setTasks([...tasks, newTask]);
                setFeedback('Tarefa adicionada com sucesso!');
            }
            setNewTask('');
        } else {
            setFeedback('Por favor, insira uma tarefa.');
        }
    };

    const handleEditTask = (index) => {
        setNewTask(tasks[index]);
        setEditIndex(index);
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setFeedback('Task removed successfully');
    };

    return (
        <div className="">
            <header className="">
                <h1 className="">Lista de Tarefas</h1>
            </header>

            <main className="">
                {feedback && <p>{feedback}</p>}
                <input
                    type="text" value={newTask}onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Digite uma nova tarefa..."
                    className=""
                />
                <button onClick={handleAddTask} className="">
                    {editIndex !== null ? 'Atualizar tarefa' : 'Adicionar tarefa'}
                </button>

                <ul className="">
                    {tasks.map((task, index) => (
                        <li key={index} className="">
                            {task}
                            <button onClick={() => handleEditTask(index)}
                            className="">
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>

                <button onClick={handleRemoveTask}>Apagar tarefa</button>
            </main>

            <footer className="">
                <p className="">Agleice Sousa, todos os direitos reservados</p>
            </footer>
        </div>
    );
}