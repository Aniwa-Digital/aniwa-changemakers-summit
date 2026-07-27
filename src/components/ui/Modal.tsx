import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  zIndex?: number;
  maxWidth?: number;
  padding?: string;
  label: string;
  children: ReactNode;
}

/* Shared modal shell: glass panel (12px radius) over a blurred scrim.
   Click-outside, ×, and Escape all close; the inner card stops propagation. */
export function Modal({ open, onClose, zIndex = 80, maxWidth = 540, padding = '44px', label, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-scrim"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      style={{ zIndex }}
    >
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth, padding }}
      >
        <button type="button" onClick={onClose} aria-label="Close" className="modal-close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
