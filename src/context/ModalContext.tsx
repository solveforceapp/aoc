import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { ModalKey } from '../types';

type ModalState = Record<ModalKey, boolean>;

interface ModalContextValue {
  modals: ModalState;
  openModal: (id: ModalKey) => void;
  closeModal: (id: ModalKey) => void;
  toggleModal: (id: ModalKey) => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const INITIAL_MODAL_STATE: ModalState = Object.keys({
    STRUCTURAL_COHERENCE: false, HOLOGRAPHIC_PROJECTION: false, CYMATIC_STABILIZATION: false,
    UNIFIED_FIELD: false, UNIFIELD_DIMENSIONS: false, SYNCHRONIZATION_ARC: false, MASTER_ALIGNMENT: false,
    META_SCIENCE: false, MATHEMATICAL_TIER: false, LOGOS_ATTUNEMENT: false, AXIOMATIC_PRIMACY: false,
    AXIONOMICS: false, ADAPTER_NETWORK: false, APPRONOMICS: false, RESONANCE_TENSOR: false,
    STRUCTURAL_INTEGRITY: false, LINGUISTIC_INTEGRITY: false, REGENERONOMICS: false, ETYMONOMICS: false,
    AUTOMOMICS: false, GLYPH_CODE: false, NOMOS_EXPLAINED: false, MENOMICS_EXPLAINED: false,
    MONICS_PLATE: false, NOMICS_PLATE: false, MENOMICS_PLATE: false, GRAPHEMIC_LAW: false,
    PRIMORDIAL_CODE: false, RESONANCE_FIELD: false
} as Record<ModalKey, boolean>).reduce((acc, key) => {
    acc[key as ModalKey] = false;
    return acc;
}, {} as ModalState);


export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalState>(INITIAL_MODAL_STATE);

  const openModal = useCallback((id: ModalKey) => {
    setModals(prev => ({ ...prev, [id]: true }));
  }, []);

  const closeModal = useCallback((id: ModalKey) => {
    setModals(prev => ({ ...prev, [id]: false }));
  }, []);

  const toggleModal = useCallback((id: ModalKey) => {
    setModals(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const closeAll = useCallback(() => {
    // A bit of a hack to ensure modals are closed before opening new ones in a sequence
    setModals(prev => {
        const newState = { ...prev };
        for (const key in newState) {
            newState[key as ModalKey] = false;
        }
        return newState;
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, toggleModal, closeAll }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
};
