import React, { Component } from 'react';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      errorMessage: error
    })
    // You can also log the error to an error reporting service
    console.log("Error Boundary", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render your fallBack UI Here
      return <div className="unauthorized_Error">
        <h1>Something went wrong</h1>
        <h5>Please contact your Business Admin</h5>
      </div>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;