import "./ToastNotification.css";

export default function ToastNotification({notify}) {
  if(!notify) return null
  return (
    <div className="toast-container">

      <div className="toast error">
        <div className="toast-icon">⚠️</div>
        <div className="toast-text">
          Task is overdue
        </div>
      </div>

    </div>
  );
}