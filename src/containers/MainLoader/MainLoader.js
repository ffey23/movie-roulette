import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '@/components/Loader/Loader';

// Needed for conditionally show component
class MainLoader extends Component {
  render() {
    const { message } = this.props;
    if (message == null) return null;
    return (
      <div className='loader-wrapper'>
        <Loader blockScroll={true} message={message} />
      </div>
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
