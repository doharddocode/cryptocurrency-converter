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

  _getCoinsData = async () => {
    const params = {
      vs_currency: 'usd',
      ids: this._coinIds,
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false
    }
    const apiUrl = `${this._apiBase}coins/markets?${this._transformObjToUrl(params)}`;
    const data = await fetch(apiUrl);

    if (!data.ok) {
      throw new Error(`Could not fetch ${apiUrl}` +
        `, received ${data.status}`)
    }

    return data.json();
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

    return data;
  }

  getCoins = async () => {
    const data = await this._getCoinsData();

    return this._coinsDataTransform(data);
  }
}