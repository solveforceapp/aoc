import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type HealthIssueType =
  | 'MISSING_ASSET'
  | 'MISSING_CSS_TOKEN'
  | 'RUNTIME_ERROR';

export interface HealthIssue {
  id: string;
  type: HealthIssueType;
  message: string;
  details?: Record<string, any>;
  timestamp: number;
  severity: 'info' | 'warning' | 'error';
}

interface HealthContextValue {
  issues: HealthIssue[];
  reportIssue: (issue: Omit<HealthIssue, 'id' | 'timestamp'>) => void;
  clearIssues: () => void;
}

const HealthContext = createContext<HealthContextValue | null>(null);

export const useHealth = (): HealthContextValue => {
  const ctx = useContext(HealthContext);
  if (!ctx) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return ctx;
};

export const HealthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [issues, setIssues] = useState<HealthIssue[]>([]);

  const reportIssue = useCallback(
    (raw: Omit<HealthIssue, 'id' | 'timestamp'>) => {
      const issue: HealthIssue = {
        ...raw,
        id: `${raw.type}-${Date.now().toString(36)}-${Math.random()
          .toString(36)
          .slice(2, 7)}`,
        timestamp: Date.now(),
      };
      console.warn('[HealthIssue]', issue);
      setIssues((prev) => [...prev, issue].slice(-20)); // Keep last 20 issues
    },
    [],
  );

  const clearIssues = useCallback(() => setIssues([]), []);

  return (
    <HealthContext.Provider value={{ issues, reportIssue, clearIssues }}>
      {children}
    </HealthContext.Provider>
  );
};
