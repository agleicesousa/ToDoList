import PropTypes from 'prop-types';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
}

export default function TaskItem({ task, onEdit, onRemove, index, onToggleComplete }) {
    return (
        <li className="">
            <div className="">
                {task.completed ? 
                    <MdCheckBox className="" onClick={() => onToggleComplete(index)} /> :
                    <MdCheckBoxOutlineBlank className="" onClick={() => onToggleComplete(index)} />}
            </div>
            <div className="">
                <div className="">
                    <span className="">
                        {task.task}
                    </span>
                    <span className="">
                        {formatDate(task.dueDate)}
                    </span>
                </div>
            </div>
            <div className="">
                <button onClick={() => onEdit(index)} className="">
                    <FiEdit />
                </button>
                <button onClick={() => onRemove(index)} className="">
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