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
        <div className="flex flex-col space-y-4 bg-gray-50 p-4 rounded-lg shadow-md">
            <input type="text" value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Escreva sua tarefa..."
                className="p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="date" value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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