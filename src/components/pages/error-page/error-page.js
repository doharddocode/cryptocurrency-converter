import React from "react";

const ErrorPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-primary">
      <h1 className="display-1 fw-bold text-white">Что-то сломалось!</h1>
      <p className="display-6 text-white opacity-75">Мы скоро все починим</p>
    </div>
  );
}

export default ErrorPage;