import PropTypes from 'prop-types';

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
}

export default function TaskItem({ task, onEdit, onRemove, index }) {
    return (
        <li className="">
            <span className="">
                {task.task} - {formatDate(task.dueDate)}
            </span>
            <button onClick={() => onEdit(index)} className="">
                Editar
            </button>
            <button onClick={() => onRemove(index)} className="">
                Apagar
            </button>
        </li>
    );
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        task: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};