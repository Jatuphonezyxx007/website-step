// CustomAlert.jsx
import React from 'react';

export default function CustomAlert({ message }) {
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-red-600 text-white rounded shadow-lg">
      {message}
    </div>
  );
}
