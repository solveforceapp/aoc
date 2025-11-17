import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-red-400">
            <h1 className="text-2xl font-orbitron">SYSTEM COHERENCE FAILURE</h1>
            <p className="mt-4">A critical error has occurred. Please refresh the application.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;