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
  openModal: (id: ModalKey, payload?: any) => void;
  closeModal: (id: ModalKey) => void;
  toggleModal: (id: ModalKey) => void;
  closeAll: () => void;
  modalPayload: any;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const INITIAL_MODAL_STATE: ModalState = Object.keys({
    STRUCTURAL_COHERENCE: false, HOLOGRAPHIC_PROJECTION: false, CYMATIC_STABILIZATION: false,
    UNIFIED_FIELD: false, UNIFIELD_DIMENSIONS: false, SYNCHRONIZATION_ARC: false, MASTER_ALIGNMENT: false,
    META_SCIENCE: false, MATHEMATICAL_TIER: false, LOGOS_ATTUNEMENT: false, AXIOMATIC_PRIMACY: false,
    AXIONOMICS: false, ADAPTER_NETWORK: false, APPRONOMICS: false, RESONANCE_TENSOR: false,
    STRUCTURAL_INTEGRITY: false, LINGUISTIC_INTEGRITY: false, SYNTACTIC_INTEGRITY: false, SYNONOMICS: false, REGENERONOMICS: false, ETYMONOMICS: false,
    AUTONOMICS: false, GLYPH_CODE: false, NOMOS_EXPLAINED: false, MENOMICS_EXPLAINED: false,
    MONICS_PLATE: false, NOMICS_PLATE: false, MENOMICS_PLATE: false, GRAPHEMIC_LAW: false,
    PRIMORDIAL_CODE: false, RESONANCE_FIELD: false, UNIVERSAL_GRAMMAR: false,
    UNIVERSAL_DIRECTORY: false, COMMA_COROLLARY: false, GENESIS_ENGINE: false,
    NOMICS_INSPECTOR: false, GRAPHEME_DETAIL: false, SHAPE_DETAIL: false, CODEX_ENTRY_DETAIL: false, NOMIC_DETAIL: false,
    DUAL_ENGINE_STATE_MACHINE: false, DIRECTORY_MANAGER: false,
} as Record<ModalKey, boolean>).reduce((acc, key) => {
    acc[key as ModalKey] = false;
    return acc;
}, {} as ModalState);


export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalState>(INITIAL_MODAL_STATE);
  const [modalPayload, setModalPayload] = useState<any>(null);

  const openModal = useCallback((id: ModalKey, payload: any = null) => {
    setModalPayload(payload);
    setModals(prev => ({ ...prev, [id]: true }));
  }, []);

  const closeModal = useCallback((id: ModalKey) => {
    setModals(prev => ({ ...prev, [id]: false }));
    setModalPayload(null);
  }, []);

  const toggleModal = useCallback((id: ModalKey, payload: any = null) => {
    setModalPayload(payload);
    setModals(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const closeAll = useCallback(() => {
    setModals(prev => {
        const newState = { ...prev };
        for (const key in newState) {
            newState[key as ModalKey] = false;
        }
        return newState;
    });
    setModalPayload(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, toggleModal, closeAll, modalPayload }}
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