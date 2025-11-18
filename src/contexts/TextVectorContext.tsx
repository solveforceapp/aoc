import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { getGeometrySignature } from '../geometry/registry';
import { Dimension, GeometrySignature } from '../geometry/types';
// FIX: Corrected import path for useSystemContext
import { useSystemContext } from '../../contexts/SystemContext';

export type CycleState = 'IDLE' | 'DISINTEGRATING' | 'REINTEGRATING';

export interface TextVectorContextValue {
  activeConcept: string;
  setActiveConcept: (value: string) => void;
  cycleState: CycleState;
  setCycleState: (state: CycleState) => void;
  geometry: GeometrySignature;
  dimension: Dimension;
  setDimension: (d: Dimension) => void;
}

const TextVectorContext = createContext<TextVectorContextValue | undefined>(
  undefined
);

export const TextVectorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { activeConcept, setActiveConcept } = useSystemContext();
  const [cycleState, setCycleState] = useState<CycleState>('IDLE');
  const [dimension, setDimension] = useState<Dimension>(2);

  const geometry = useMemo(
    () =>
      getGeometrySignature({
        textLength: activeConcept.length || 1,
        dimension,
        preferPolygram: true,
      }),
    [activeConcept.length, dimension]
  );

  const value: TextVectorContextValue = {
    activeConcept,
    setActiveConcept,
    cycleState,
    setCycleState,
    geometry,
    dimension,
    setDimension,
  };

  return (
    <TextVectorContext.Provider value={value}>
      {children}
    </TextVectorContext.Provider>
  );
};

export const useTextVector = (): TextVectorContextValue => {
  const ctx = useContext(TextVectorContext);
  if (!ctx) {
    throw new Error('useTextVector must be used within a TextVectorProvider');
  }
  return ctx;
};