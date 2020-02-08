import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import './MainLoader.scss';

// Needed for conditionally show component
class MainLoader extends Component {
  render() {
    const { message, show } = this.props;
    if (!show) return null;
    return (
      <div className='loader-wrapper'>
        <Loader message={message} />
      </div>
    );
  }
  componentDidUpdate() {
    // Disables scroll when component is shown
    if (this.props.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}

MainLoader.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    message: state.loading.message,
    show: state.loading.mainLoader,
  };
};

export default connect(mapStateToProps)(MainLoader);
