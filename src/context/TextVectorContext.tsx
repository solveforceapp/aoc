import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
// FIX: Import GeometrySignature from types.ts where it is defined.
import { getGeometrySignature } from '../geometry/registry';
import { Dimension, GeometrySignature } from '../geometry/types';

export type CycleState = 'IDLE' | 'DISINTEGRATING' | 'REINTEGRATING';

export interface TextVectorState {
  text: string;
  setText: (value: string) => void;
  cycleState: CycleState;
  setCycleState: (state: CycleState) => void;
  geometry: GeometrySignature;
  dimension: Dimension;
}

interface TextVectorContextValue extends TextVectorState {
  setDimension: (d: Dimension) => void;
}

const TextVectorContext = createContext<TextVectorContextValue | undefined>(
  undefined
);

export const TextVectorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState<string>('ULRM+');
  const [cycleState, setCycleState] = useState<CycleState>('IDLE');
  const [dimension, setDimension] = useState<Dimension>(2);

  const geometry = useMemo(
    () =>
      getGeometrySignature({
        textLength: text.length || 1,
        dimension,
        preferPolygram: true,
      }),
    [text.length, dimension]
  );

  const value: TextVectorContextValue = {
    text,
    setText,
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
