import React from "react";

function LoadingScreen({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid border-opacity-80"></div>
      <p className="absolute bottom-12 text-gray-500 text-sm">Loading, please wait...</p>
    </div>
  );
}

export default LoadingScreen;