import React, { Component } from 'react';

export default class ErrorBoundary extends React.Component<{}, {error:any, errorInfo:any}> {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    //todo: support different error hierarchy: 1) app level error. eg. refresh token expired.  2) view level eg. no access to a content/action.
    // maybe need different error boundary components / error types.
    if (this.state.errorInfo) {
      return (
        <div className="error-main alert alert-warning">
          <h2>Error</h2>
          <div>{this.state.error && this.state.error.toString()}</div>
        </div>
      );
    }

    return this.props.children;
  }
}
