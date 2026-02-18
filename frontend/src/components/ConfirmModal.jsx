import { useEffect } from 'react';
import './ConfirmModal.css';

/**
 * Modern confirm/prompt modal component
 * @param {boolean} isOpen - Modal açık mı?
 * @param {function} onClose - Modal kapatma fonksiyonu
 * @param {function} onConfirm - Onay butonu callback
 * @param {string} title - Modal başlığı
 * @param {string} message - Modal mesajı
 * @param {string} confirmText - Onay butonu metni (default: "Evet")
 * @param {string} cancelText - İptal butonu metni (default: "Hayır")
 * @param {string} type - Modal tipi: 'confirm' veya 'prompt'
 * @param {string} inputValue - Prompt için input değeri
 * @param {function} onInputChange - Prompt input değişikliği
 * @param {string} inputPlaceholder - Prompt input placeholder
 */
function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Emin misin?",
  message = "",
  confirmText = "Evet",
  cancelText = "Hayır",
  type = "confirm", // 'confirm' veya 'prompt'
  inputValue = "",
  onInputChange = () => {},
  inputPlaceholder = "Yeni değer..."
}) {
  // ESC tuşu ile kapat
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Body scroll'u engelle
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'prompt') {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && type === 'prompt') {
      handleConfirm();
    }
  };

  return (
    <div 
      className="confirm-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div 
        className="confirm-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-modal-title" className="confirm-modal-title">{title}</h3>
        
        {message && <p className="confirm-modal-message">{message}</p>}
        
        {type === 'prompt' && (
          <input
            type="text"
            className="confirm-modal-input"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            autoFocus
            aria-label={inputPlaceholder}
          />
        )}
        
        <div className="confirm-modal-buttons">
          <button 
            className="confirm-modal-btn cancel-btn" 
            onClick={onClose}
            aria-label="İptal"
          >
            {cancelText}
          </button>
          <button 
            className="confirm-modal-btn confirm-btn" 
            onClick={handleConfirm}
            aria-label="Onayla"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
