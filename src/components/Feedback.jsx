import PropTypes from 'prop-types';

export default function Feedback({ message }) {
    return message ?
        <p className="">
            {message}
        </p> : null;
}

Feedback.propTypes = {
    message: PropTypes.string,
};