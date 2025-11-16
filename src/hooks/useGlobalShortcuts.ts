import { useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { useTextVector } from '../context/TextVectorContext';

export function useGlobalShortcuts() {
  const { openModal, toggleModal } = useModal();
  const { setDimension } = useTextVector();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in input/textarea
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            // Alt+S → Structural Coherence modal
            e.preventDefault();
            openModal('STRUCTURAL_COHERENCE');
            break;
          case 'x':
            // Alt+X → Axionomics
            e.preventDefault();
            openModal('AXIONOMICS');
            break;
          case 'l':
            // Alt+L → Logos Attunement
            e.preventDefault();
            openModal('LOGOS_ATTUNEMENT');
            break;
          case 'g':
            // Alt+G → Glyph Code deep dive
            e.preventDefault();
            openModal('GLYPH_CODE');
            break;
          case '2':
            e.preventDefault();
            setDimension(2);
            break;
          case '3':
            e.preventDefault();
            setDimension(3);
            break;
          case '4':
            e.preventDefault();
            setDimension(4);
            break;
          case 'p':
            // Alt+P → toggle a "palette" modal if you want
            e.preventDefault();
            toggleModal('META_SCIENCE'); // or a dedicated palette component
            break;
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openModal, toggleModal, setDimension]);
}
