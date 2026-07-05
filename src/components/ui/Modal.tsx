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

/* Shared modal shell: fixed blurred scrim, bone card at house radius.
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
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        background: 'rgba(19,17,37,0.7)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth,
          background: '#FAF6EC',
          borderRadius: 'var(--radius-house)',
          padding,
          boxShadow: '0 40px 110px rgba(0,0,0,0.55)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 18,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(46,40,32,0.5)',
            fontSize: '1.6rem',
            lineHeight: 1,
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
