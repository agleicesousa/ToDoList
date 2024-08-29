import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function TaskForm({ onAddTask, editIndex, tasks }) {
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        if (editIndex !== null) {
            setNewTask(tasks[editIndex]);
        }
    }, [editIndex, tasks]);

    const handleSubmit = () => {
        if (newTask.trim()) {
            onAddTask({ task: newTask });
            setNewTask('');
        } else {
            alert('Por favor, escreva uma tarefa válida!');
        }
    };

    return (
        <div className="">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Escreva sua tarefa..."
                className=""
            />
            <button
                onClick={handleSubmit}
                className=""
            >
                {editIndex !== null ? 'Atualizar tarefa' : 'Adicionar tarefa'}
            </button>
        </div>
    );
}

TaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired,
    editIndex: PropTypes.number,
    tasks: PropTypes.array.isRequired,
};