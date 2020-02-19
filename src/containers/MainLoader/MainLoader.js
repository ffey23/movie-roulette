import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '@/components/Loader/Loader';
import styled from 'styled-components';

// Needed for conditionally show component
class MainLoader extends Component {
  render() {
    const { message } = this.props;
    if (message == null) return null;

    const Wrapper = styled.div`
      /**
       * Makes loader-wrapper cover whole screen
       */
      position: fixed;
      z-index: 10000;
      top: 0;
      width: 100%;
      height: 100vh;
      /**
       * Centers loader
       */
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: rgba(0, 0, 0, 0.6);
      cursor: wait;
    `;

    return (
      <Wrapper>
        <Loader blockScroll={true} message={message} />
      </Wrapper>
    );
  }
}

MainLoader.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    message: state.loader,
  };
};

export default connect(mapStateToProps)(MainLoader);
