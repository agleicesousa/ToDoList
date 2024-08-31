import PropTypes from 'prop-types';

export default function Feedback({ message }) {
    return message ? (
        <p className="p-3 bg-green-100 text-green-700 border border-green-400 rounded shadow-sm">
            {message}
        </p>
    ) : null;
}

Feedback.propTypes = {
    message: PropTypes.string,
};