import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

export type ModalId =
  | 'STRUCTURAL_COHERENCE'
  | 'HOLOGRAPHIC_PROJECTION'
  | 'CYMATIC_STABILIZATION'
  | 'UNIFIED_FIELD'
  | 'UNIFIELD_DIMENSIONS'
  | 'SYNCHRONIZATION_ARC'
  | 'MASTER_ALIGNMENT'
  | 'META_SCIENCE'
  | 'MATHEMATICAL_TIER'
  | 'LOGOS_ATTUNEMENT'
  | 'AXIOMATIC_PRIMACY'
  | 'AXIONOMICS'
  | 'ADAPTER_NETWORK'
  | 'APPRONOMICS'
  | 'RESONANCE_TENSOR'
  | 'STRUCTURAL_INTEGRITY'
  | 'LINGUISTIC_INTEGRITY'
  | 'REGENERONOMICS'
  | 'ETYMONOMICS'
  | 'AUTOMOMICS'
  | 'GLYPH_CODE'
  | 'NOMOS_EXPLAINED'
  | 'MENOMICS_EXPLAINED'
  | 'MONICS_PLATE'
  | 'NOMICS_PLATE'
  | 'MENOMICS_PLATE'
  | 'GRAPHEMIC_LAW'
  | 'PRIMORDIAL_CODE'
  | 'RESONANCE_FIELD';

type ModalState = Record<ModalId, boolean>;

interface ModalContextValue {
  modals: ModalState;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
  toggleModal: (id: ModalId) => void;
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
} as Record<ModalId, boolean>).reduce((acc, key) => {
    acc[key as ModalId] = false;
    return acc;
}, {} as ModalState);


export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<ModalState>(INITIAL_MODAL_STATE);

  const openModal = useCallback((id: ModalId) => {
    setModals(prev => ({ ...prev, [id]: true }));
  }, []);

  const closeModal = useCallback((id: ModalId) => {
    setModals(prev => ({ ...prev, [id]: false }));
  }, []);

  const toggleModal = useCallback((id: ModalId) => {
    setModals(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const closeAll = useCallback(() => {
    setModals(INITIAL_MODAL_STATE);
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
