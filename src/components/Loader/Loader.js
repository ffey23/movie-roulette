import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { colors } from '@/styled/variables';

class Loader extends React.Component {
  render() {
    const {
      message,
      spinnerClass,
      spinnerPartClass,
      messageClass,
    } = this.props;

    const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
    `;

    const Spinner = styled.div`
      display: block;
      position: relative;
      margin: auto;
      width: 80px;
      height: 80px;
      margin-bottom: 15px;
    `;

    const Part = styled.div`
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid #fff;
      border-radius: 50%;
      animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${colors.primary} transparent transparent transparent;

      &:nth-child(1) {
        animation-delay: -0.45s;
      }
      &:nth-child(2) {
        animation-delay: -0.3s;
      }
      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    `;

    const Message = styled.div`
      text-align: center;
    `;

    return (
      <div>
        <Spinner className={spinnerClass}>
          <Part className={spinnerPartClass} />
          <Part className={spinnerPartClass} />
          <Part className={spinnerPartClass} />
          <Part className={spinnerPartClass} />
        </Spinner>
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
    if (this.props.blockScroll) {
      document.body.style.overflow = 'auto';
    }
  }
}

Loader.propTypes = {
  message: PropTypes.string,
  blockScroll: PropTypes.bool,
  spinnerClass: PropTypes.string,
  spinnerPartClass: PropTypes.string,
  messageClass: PropTypes.string,
};
export default Loader;
