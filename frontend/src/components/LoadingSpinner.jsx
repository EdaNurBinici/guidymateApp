// Loading Spinner Component
import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'medium', text = '' }) {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}
