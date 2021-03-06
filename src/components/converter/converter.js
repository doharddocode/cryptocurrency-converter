import React, { Component } from "react";

import CryptoService from "../../services/crypto-service";
import LoadingIndicator from "../loading-indicator";
import Select from "../select";

import './converter.sass'

const ConvertForm = ({ data: formData, handleAmountChange, handleSelectChange }) => {
  return (
    <form className="crypto-converter-form">
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="amount" className="form-label">Количество</label>
          <input type="number"
                 className="form-control"
                 id="amount" aria-describedby="amount" value={ formData.amount } min="0"
                 onChange={ handleAmountChange }
          />
          <div id="amountHelp" className="form-text">Введите число</div>
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-5">
          <Select
            dataTarget="from"
            onChange={ handleSelectChange }
            data={ formData.data }
          />
        </div>

        <div className="crypto-converter-form__exchange-icon col-md-2">
          <i className="fa-solid fa-right-left"></i>
        </div>

        <div className="col-md-5">
          <Select
            dataTarget="to"
            onChange={ handleSelectChange }
            data={ formData.data }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="crypto-converter-form__result alert alert-secondary" role="alert">
            <div className="result-text">{ formData.amount } { formData.coinFrom.label } ({ formData.coinFrom.symbol })</div>

            <div className="del">=</div>

            <div className="result-text">
              <strong>{ formData.convertedResult }</strong> { formData.coinTo.label } ({ formData.coinTo.symbol })
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

class Converter extends Component {
  constructor(props) {
    super(props);
    this.cryptoService = new CryptoService('bitcoin', 'ethereum');
    this.fetchNewData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState) {
      const isAmountChanged = prevState.amount !== this.state.amount;
      const isCoinTypeChanged = (prevState.coinFrom !== this.state.coinFrom) || (prevState.coinTo !== this.state.coinTo)

      if (isAmountChanged || isCoinTypeChanged) {
        this.updateData();
      }
    }
  }

  updateData() {
    this.cryptoService.getCoins()
      .then((data) => {
        this.setState({
          ...this.state,
          data,
        })
      })
      .catch((err) => {
        console.log('Error:', err);
      })
  }

  fetchNewData() {
    this.cryptoService.getCoins()
      .then((data) => {
        this.setState({
          data,
          amount: 1,
          coinFrom: this._setupCoinData(data.get('bitcoin')),
          coinTo: this._setupCoinData(data.get('bitcoin')),
          convertedResult: this.convert(1, 1),
          loading: false
        });
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }

  convert(from, to) {
    return from / to;
  }

  _setupCoinData(data) {
    return {
      id: data.id,
      label: data.label,
      symbol:data.symbol,
      price: data.price,
    }
  }

  _handleAmountChange = (event) => {
    const amount = event.target.value;

    this.setState({
      ...this.state,
      amount,
      convertedResult: this.convert(this.state.coinFrom.price * amount, this.state.coinTo.price)
    })
  }

  _handleSelectChange = (event) => {
    const dataTarget = event.target.attributes['data-target'].nodeValue;
    const coinType = event.target.value;
    const coin = this.state.data.get(coinType);

    switch (dataTarget) {
      case 'from':
        const { coinTo, amount } = this.state;

        this.setState({
          ...this.state,
          coinFrom: this._setupCoinData(coin),
          convertedResult: this.convert(coin.price * amount, coinTo.price),
        })
        break;
      case 'to':
        const coinFrom = this.state.coinFrom;

        this.setState({
          ...this.state,
          coinTo: this._setupCoinData(this.state.data.get(coinType)),
          convertedResult: this.convert(coinFrom.price * this.state.amount, coin.price),
        })
        break;
      default:
        this.setState({
          ...this.state,
          coinToType: null,
        })
    }
  }

  render() {
    const title = this.props.title;
    const formData = this.state;
    const content = !formData
      ? <LoadingIndicator />
      : <ConvertForm
          data={ formData }
          handleAmountChange={ this._handleAmountChange }
          handleSelectChange={ this._handleSelectChange }
      />;

    return (
      <div className="crypto-converter">
        <h2 className="crypto-converter__title">{ title }</h2>
        { content }
      </div>
    );
  }
}

export default Converter