import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <h1 className="mb-4 text-4xl font-black text-purple-600 dark:text-purple-400">Oops!</h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">Something went wrong on our end.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="rounded-full bg-purple-600 px-8 py-3 font-bold text-white hover:bg-purple-700 transition-colors"
          >
            Go back home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
