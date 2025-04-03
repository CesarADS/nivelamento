import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Alert = ({ message, type, onClose }) => {
  const alertClasses = `alert alert-${type} alert-dismissible fade show`;

  return (
    <div className={alertClasses} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
