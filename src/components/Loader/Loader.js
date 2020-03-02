import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

class Loader extends React.Component {
  render() {
    const { message, spinnerClass, messageClass } = this.props;

    const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
    `;

    const Spinner = styled.div`
      background: url('/logo.png') no-repeat center center;
      background-size: contain;
      margin: auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      animation: ${spin} 2s linear infinite;
      margin-bottom: 15px;
    `;

    const Message = styled.div`
      text-align: center;
    `;

    return (
      <div>
        <Spinner className={spinnerClass} />
        <Message className={messageClass}>{message}</Message>
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
  spinnerClass: PropTypes.string,
  messageClass: PropTypes.string,
};
export default Loader;
