import { connect } from 'react-redux'
import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import './MainLoader.css';

// Needed for conditionally show component
class LoaderWrapper extends Component {
  render() {
    const {message, show} = this.props;
    if(!show) return null
    return (
      <div className="loader-wrapper">
        <Loader message={message} />
      </div>

    );
  }
  componentDidUpdate() {
    // Disables scroll when component is shown
    if(this.props.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}

const mapStateToProps = state => {
  return {
    message: state.loading.message,
    show: state.loading.mainLoader,
  }
}

const MainLoader = connect(
    mapStateToProps,
)(LoaderWrapper);

export default MainLoader;