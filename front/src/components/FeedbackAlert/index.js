export function FeedbackAlert({ type, message, onDismiss }) {
  if (!message) return null;

  const alertClass = type === 'error' ? 'alert-danger' : 'alert-success';

  return (
    <div className={`alert ${alertClass} alert-dismissible fade show mb-4`}>
      {message}
      {onDismiss && (
        <button
          type="button"
          className="btn-close"
          onClick={onDismiss}
        ></button>
      )}
    </div>
  );
}