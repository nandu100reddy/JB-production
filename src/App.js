import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from './app/Layout';
import { FaSpinner } from "react-icons/fa";
import ErrorBoundary from "./app/components/common/errorBoundary/ErrorBoundary";


import './App.scss'


const App = props => {

  /**
   * useEffect react hooks 
   */
  useEffect(() => {
  }, [])

  return <>
    {
      props.showLoader &&
      <div className="loader">
        <FaSpinner />
      </div>
    }
    <ErrorBoundary>
      <Layout></Layout>
    </ErrorBoundary>
  </>
}

const mapStateToProps = (state, ownProps) => {
  return {
    showLoader: state.loader.showLoader
  }
};

const mapDispatchToAction = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToAction)(App));

