import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '@/components/Loader/Loader';
import styled from 'styled-components';
import PopupOverlay from '@/styled/PopupOverlay';

// Needed for conditionally show component
class MainLoader extends Component {
  render() {
    // msg is real prop and msgState is from the state
    const { msg, msgState } = this.props;
    const message = msg || msgState;

    if (message == null) return null;

    const Wrapper = styled(PopupOverlay)`
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
  msg: PropTypes.string,
  msgState: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    msgState: state.loader,
  };
};

export default connect(mapStateToProps)(MainLoader);
