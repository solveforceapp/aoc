// src/system/AppErrorBoundary.tsx
import React from 'react';
import { useHealth } from './HealthContext';

type AppErrorBoundaryInnerProps = {
  report: (msg: string, err: any) => void;
};

interface State {
  hasError: boolean;
}

class AppErrorBoundaryInner extends React.Component<React.PropsWithChildren<AppErrorBoundaryInnerProps>, State> {
  // Using class field syntax for state removes the need for a constructor.
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // FIX: Converted from an arrow function to a standard class method. React binds `this` for lifecycle methods.
  componentDidCatch(error: any, info: any) {
    this.props.report(`React error boundary caught`, { error: error.toString(), info: info.componentStack });
  }

  // FIX: Converted from an arrow function to a standard class method. React binds `this` for lifecycle methods.
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center text-center p-4 text-xs text-red-300 font-mono bg-black">
          <div>
            <p>A recoverable error occurred.</p>
            <p>The system has logged the issue to the Health Panel.</p>
            <p className="mt-2">Please refresh the application.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const AppErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { reportIssue } = useHealth();
  return (
    <AppErrorBoundaryInner
      report={(msg, err) =>
        reportIssue({
          type: 'RUNTIME_ERROR',
          severity: 'error',
          message: msg,
          details: err,
        })
      }
    >
      {children}
    </AppErrorBoundaryInner>
  );
};
