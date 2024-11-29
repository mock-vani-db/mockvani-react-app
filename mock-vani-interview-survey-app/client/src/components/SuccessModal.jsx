import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SuccessModal.css";

export default function SuccessModal({ message, onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/insights"); // Redirect to Insights page
  };

  return (
    <div className="success-modal">
      <div className="success-modal-content">
        <p>{message}</p>
        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
}
