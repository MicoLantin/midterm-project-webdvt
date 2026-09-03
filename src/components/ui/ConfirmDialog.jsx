export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="confirm-box panel">
        <h3 id="confirm-title">{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button type="button" className="btn" onClick={onCancel}>
            cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
