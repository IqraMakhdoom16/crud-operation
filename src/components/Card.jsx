import React from "react";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">New Student Form</h2>
        {/* Add your form inputs for adding a new student here */}
        <button onClick={onClose} className="inline-flex items-center px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
