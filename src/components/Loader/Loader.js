import React from 'react';
import './Loader.scss';
import PropTypes from 'prop-types';

class Loader extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className='loader'>
        <div className='loader__spinner'></div>
        <div className='loader__message'>{message}</div>
      </div>
    );
  }

  componentDidMount() {
    // Disables scroll when component is shown
    if (this.props.blockScroll) {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }
}

Loader.propTypes = {
  message: PropTypes.string,
  blockScroll: PropTypes.bool,
};
export default Loader;
