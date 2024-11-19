import React from "react";


export default function ZoomButton() {
  const fitScreen = () => {
    // Set body height to viewport size and ensure no overflow
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  return (
    <button
      onClick={fitScreen}
      className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
    >
      Fit Screen
    </button>
  );
}
