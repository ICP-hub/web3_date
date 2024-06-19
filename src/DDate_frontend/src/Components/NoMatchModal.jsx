import React from "react";
import "./NoMatchModal.css"; // Make sure to create a corresponding CSS file for styling

const NoMatchModal = ({ onClose }) => {
  //   if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>No Matches Found</h2>
        <p>Sorry, there are no matches found as per your preferences.</p>
        <p>Please try adjusting your filters or come back later.</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NoMatchModal;
