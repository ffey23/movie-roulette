import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '@/components/Loader/Loader';
import styled from 'styled-components';
import { popupOverlay } from '@/styled/mixins';

// Needed for conditionally show component
class MainLoader extends Component {
  render() {
    const { message } = this.props;
    if (message == null) return null;

    const Wrapper = styled.div`
      ${popupOverlay}
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
