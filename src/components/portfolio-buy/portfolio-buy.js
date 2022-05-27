import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { buy, sell } from "../../features/portfolio/portfolioSlice";

import CryptoService from "../../services/crypto-service";
import ConvertService from "../../services/convert-service";
import Select from "../select";

import './portfolio-buy.sass'

const PortfolioBuy = () => {
  const [selectData, updateSelectData] = useState();
  const [coinID, updateCoinID] = useState(null);
  const [amount, updateAmount] = useState(0);
  const [payload, setPayload] = useState({
    coinID,
    amount,
  })
  const dispatch = useDispatch();

  const onSelectChange = (event) => {
    updateCoinID(event.target.value);
  }

  const onAmountChange = (event) => {
    updateAmount(event.target.value);
  }

  useEffect(() => {
    const coinIDs = ['bitcoin', 'ethereum'];
    const cryptoService = new CryptoService(...coinIDs);

    cryptoService.getCoins()
      .then((data) => {
        setPayload((prevState) => {
          return {
            ...prevState,
            coinID: coinIDs[0],
            data: data.get(coinIDs[0]),
          }
        })
        updateSelectData(data);
        updateCoinID(coinIDs[0])
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  useEffect(() => {
    setPayload((prevState) => {
      const convertService = new ConvertService();

      return {
        ...prevState,
        amount: convertService.round(Number(amount)),
        coinID,
      }
    });
  }, [coinID, amount]);

  useEffect(() => {
    if (selectData) {
      setPayload((prevState) => {
        return {
          ...prevState,
          data: selectData.get(coinID),
        }
      });
    }
  }, [coinID, selectData]);

  return (
    <div className="buy-crypto">
      <h2 className="buy-crypto__title">Купить/Продать валюту</h2>

      <form className="col-md-6">
        <div className="mb-3">
         <Select
           data={ selectData }
           onChange={ onSelectChange }
         />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Количество</label>
          <input
            type="number"
            className="form-control" id="amount" aria-describedby="amount" value={ amount } min="0"
            onChange={ onAmountChange }
          />
          <div id="amountHelp" className="form-text">Введите число</div>
        </div>

        <div className="col-mb-3">
          <button type="button" className="btn btn-success me-3" onClick={ () => dispatch(buy(payload)) }>Купить</button>
          <button type="button" className="btn btn-danger" onClick={ () => dispatch(sell(payload)) }>Продать</button>
        </div>
      </form>
    </div>
  );
}

export default PortfolioBuy;