import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function TaskForm({ onAddTask, editIndex, tasks }) {
    const [newTask, setNewTask] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (editIndex !== null) {
            const taskToEdit = tasks[editIndex];
            setNewTask(taskToEdit.task);
            setDueDate(taskToEdit.dueDate || '');
        } else {
            setNewTask('');
            setDueDate('');
        }
    }, [editIndex, tasks]);

    const handleSubmit = () => {
        if (newTask.trim() && new Date(dueDate) >= new Date()) {
            onAddTask({ task: newTask, dueDate });
            setNewTask('');
            setDueDate('');
        } else {
            alert('Por favor, escreva uma tarefa válida e selecione uma data futura!');
        }
    };

    return (
        <div className="">
            <input type="text" value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
                placeholder="Escreva sua tarefa..."
                className=""/>
            <input type="date" value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
                className=""/>
            <button onClick={handleSubmit} className="">
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