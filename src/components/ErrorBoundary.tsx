import Loader from "./common/Loader";
import { Component, ErrorInfo, ReactNode, Suspense } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, errorMessage: null }, () => {
      window.location.reload();
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-white rounded-lg p-6 md:p-12">
            <h1 className="text-5xl font-semibold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-700 text-2xl mb-4">
              An unexpected error occurred. Please try again later.
            </p>
            {this.state.errorMessage && (
              <div className="text-xl text-red-500 mb-4">
                <strong>Error:</strong> {this.state.errorMessage}
              </div>
            )}
            <button
              onClick={this.handleReload}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return <Suspense fallback={<Loader />}>{this.props.children}</Suspense>;
  }
}

export default ErrorBoundary;
