import React from "react";
import { PageWrapper } from "../index";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <PageWrapper>
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3"><span className="text-danger">Упс :(</span> Что-то пошло не так.</p>
          <p className="lead">
           Такой страницы не существует!
          </p>
          <Link to="/" className="btn btn-primary">Вернуться на главную</Link>
        </div>
      </div>
    </PageWrapper>
  );
}

export default NotFoundPage;