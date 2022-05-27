import React from "react";
import { useSelector } from "react-redux";

import './portfolio-table.sass'

const EmptyTable = () => {
  return <div className="crypto-portfolio__warning">Портфель пуст :(</div>;
}

const TableContent = ({ body }) => {
  const content = body.map((item, index) => {
    return (
      <tr key={ index }>
        <th scope="row">{ item.label }</th>
        <td>{ item.symbol }</td>
        <td>{ item.price }</td>
        <td>{ item.amount }</td>
        <td>{ item.total }</td>
      </tr>
    );
  })

  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Позиция</th>
        <th scope="col">Код валюты</th>
        <th scope="col">Курс к USD</th>
        <th scope="col">Номинал</th>
        <th scope="col">Сумма в USD</th>
      </tr>
      </thead>
      <tbody>{ content }</tbody>
    </table>
  );
}

const PortfolioTable = () => {
  const coins = useSelector((state) => state.portfolio.coins);
  const coinsTotalPrice = useSelector((state) => state.portfolio.coinsTotalPrice);
  const content = !coins.length ? <EmptyTable /> : <TableContent body={ coins } />

  return (
    <div className="crypto-portfolio">
      <h2 className="crypto-portfolio__title">Портфель</h2>

      <div className="crypto-portfolio__content table-responsive-lg">
        { content }
        <div className="alert alert-secondary" role="alert">
          Итоговая оценка портфеля в USD: <strong>{ coinsTotalPrice }$</strong>
        </div>
      </div>
    </div>
  );
}

export default PortfolioTable;
