import React from 'react';
import './Loader.scss';
import PropTypes from 'prop-types';

class Loader extends React.Component {
    render() {
        const { message} = this.props;
        return (
            <div className="loader">
                <div className="loader__spinner">
                </div>
                <div className="loader__message">
                    { message }
                </div>
            </div>
        );
    }
}

Loader.propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool,
}
export default Loader;