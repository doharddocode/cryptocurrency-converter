import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </div>
  );
}

export default LoadingIndicator;