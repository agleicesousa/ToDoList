import PropTypes from 'prop-types';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
}

export default function TaskItem({ task, onEdit, onRemove, index, onToggleComplete }) {
    return (
        <li className="flex items-start p-4 bg-white rounded shadow-sm hover:shadow-md transition-shadow w-full">
            <div className="flex-shrink-0">
                {task.completed ? 
                    <MdCheckBox className="text-blue-600 cursor-pointer" onClick={() => onToggleComplete(index)} /> :
                    <MdCheckBoxOutlineBlank className="text-blue-600 cursor-pointer" onClick={() => onToggleComplete(index)} />}
            </div>
            <div className="flex-1 ml-4 overflow-hidden">
                <div className="max-h-16 overflow-auto">
                    <span className={`block text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.task}
                    </span>
                    <span className="block text-sm text-gray-500 mt-1">
                        {formatDate(task.dueDate)}
                    </span>
                </div>
            </div>
            <div className="flex-shrink-0 flex space-x-2 ml-4">
                <button onClick={() => onEdit(index)} className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <FiEdit />
                </button>
                <button onClick={() => onRemove(index)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <FiTrash />
                </button>
            </div>
        </li>
    );
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        task: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
};