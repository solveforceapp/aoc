import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

export interface AuditEntry {
    id: string;
    timestamp: number;
    type: 'ACTION' | 'ERROR' | 'API_ERROR' | 'SYSTEM';
    message: string;
    details?: string;
}

interface AuditContextType {
    logs: AuditEntry[];
    log: (type: AuditEntry['type'], message: string, details?: any) => void;
    clearLogs: () => void;
}

export const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [logs, setLogs] = useState<AuditEntry[]>([]);

    const log = useCallback((type: AuditEntry['type'], message: string, details?: any) => {
        const newEntry: AuditEntry = {
            id: `${Date.now()}-${Math.random()}`,
            timestamp: Date.now(),
            type,
            message,
            details: details ? (typeof details === 'string' ? details : JSON.stringify(details, null, 2)) : undefined,
        };
        setLogs(prevLogs => [...prevLogs, newEntry].slice(-100)); // Keep last 100 logs
    }, []);

    const clearLogs = useCallback(() => {
        setLogs([]);
    }, []);

    return (
        <AuditContext.Provider value={{ logs, log, clearLogs }}>
            {children}
        </AuditContext.Provider>
    );
};

export const useAudit = () => {
    const context = useContext(AuditContext);
    if (context === undefined) {
        throw new Error('useAudit must be used within an AuditProvider');
    }
    return context;
};
