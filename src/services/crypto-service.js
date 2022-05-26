export default class CryptoService {
  _apiBase = 'https://api.coingecko.com/api/v3/';

  constructor(...coinIds) {
    this._coinIds = coinIds.join(',');
  }

  _transformObjToUrl(obj) {
    if (!obj) {
      return null;
    }

    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
  }

  _getResources = async (apiPath, params) => {
    const apiUrl = `${this._apiBase}${apiPath}?${this._transformObjToUrl(params)}`;
    const data = await fetch(apiUrl);

    if (!data.ok) {
      throw new Error(`Could not fetch ${apiUrl}` +
        `, received ${data.status}`)
    }

    return data.json();
  }

  _getCoinsData = async () => {
    const params = {
      vs_currency: 'usd',
      ids: this._coinIds,
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false
    };

    return this._getResources('coins/markets', params)
  }

  _coinsDataTransform = (coins) => {
    const data = new Map();

    for (const item of coins) {
      data.set(item.id, {
        id: item.id,
        symbol: item.symbol.toUpperCase(),
        label: item.name,
        price: item.current_price,
      })
    }

    data.set('usd', {
      id: 'usd',
      symbol: 'USA',
      label: 'USD',
      price: 1,
    });
    return data;
  }

  getCoins = async () => {
    const data = await this._getCoinsData();

    return this._coinsDataTransform(data);
  }

  _getMarketsData = async (coinId) => {
    const params = {
      vs_currency: 'usd',
      days: 14,
      interval: 'daily',
    };

    return this._getResources(`/coins/${coinId}/market_chart`, params);
  }

  _marketsDataTransform = (data) => {
    const result = new Map();

    for (const [key, value] of data.entries()) {
      const val = value.prices;
      const params = {
        prices: [],
        timestamp: [],
      };

      for (const price of val) {
        params.timestamp.push(price[0]);
        params.prices.push(price[1]);
        result.set(key, params);
      }
    }

    return result;
  }

  getMarketsExchange = async () => {
    const coinIds = this._coinIds.split(',');
    const result = new Map();

    for (const coinID of coinIds) {
      result.set(coinID, await this._getMarketsData(coinID));
    }

    return this._marketsDataTransform(result);
  }
}