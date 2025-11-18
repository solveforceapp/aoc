import React, { ErrorInfo, ReactNode } from "react";
import { AuditContext } from "../../contexts/AuditContext";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  // Using class field syntax for state removes the need for a constructor.
  state: State = { hasError: false };

  static contextType = AuditContext;
  declare context: React.ContextType<typeof AuditContext>;

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    if (this.context && this.context.log) {
        this.context.log('ERROR', `React Boundary: ${error.message}`, errorInfo.componentStack);
    }
  }

  // FIX: Converted from an arrow function to a standard class method to fix `this.props` being undefined.
  // React automatically binds `this` for lifecycle methods like render().
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
