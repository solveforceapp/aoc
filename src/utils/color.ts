import { ModalKey } from '../types';
import { PHASE_SPECTRUM, POLYGROUP_OFFSET } from '../config/spectronomics';
import { MODAL_METADATA } from './modal-metadata';

export function getSpectralColor(modalKey: ModalKey | undefined): string {
    if (!modalKey || !MODAL_METADATA[modalKey]) {
        // Fallback color
        return 'hsl(180, 100%, 50%)'; // Default cyan
    }

    const metadata = MODAL_METADATA[modalKey];
    const baseProfile = PHASE_SPECTRUM[metadata.phase];
    const offset = POLYGROUP_OFFSET[metadata.polyGroup];

    let hue = baseProfile.hue;
    let saturation = baseProfile.saturation + (offset.saturation ?? 0);
    let lightness = baseProfile.lightness + (offset.lightness ?? 0);

    // Apply ring offset
    if (metadata.ring === 'INNER') {
        lightness -= 3;
    } else {
        lightness += 3;
    }

    // Clamp values
    saturation = Math.max(0, Math.min(100, saturation));
    lightness = Math.max(0, Math.min(100, lightness));

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
