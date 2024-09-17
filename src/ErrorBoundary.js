import React, {Component} from 'react';

class ErrorBoundary extends Component {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, info) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred!</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
