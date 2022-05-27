import { createSlice } from '@reduxjs/toolkit'

import ConvertService from "../../services/convert-service";

const convertService = new ConvertService();

const isKeyExist = (data, key) => {
  let id = 0;

  for (const coin of data) {
    if (coin.id === key) {
      return id;
    }
    id++;
  }
  return -1;
};

const setReducersVars = (state, action) => {
  return {
    currentAmount: action.payload.amount,
    coinID: action.payload.coinID,
    data: action.payload.data,
    coins: JSON.parse(JSON.stringify(state.coins)),
  }
}

const updateCoin = (state, currentAmount, price) => {
  state.coinsTotalPrice = convertService.round( state.coinsTotalPrice + currentAmount * price);
  state.coinsTotalAmount = convertService.round(state.coinsTotalAmount + currentAmount);
}

export const portfolioBuySlice = createSlice({
  name: 'portfolio',
  initialState: {
    coins: [],
    coinsTotalPrice: 0,
    coinsTotalAmount: 0,
  },
  reducers: {
    buy: (state, action) => {
      const { currentAmount, coinID, data, coins } = setReducersVars(state, action);
      const { price } = data;
      const id = isKeyExist(coins, coinID);

      if (!currentAmount) return;

      if (id === -1) {
        state.coins.push({
          ...data,
          amount: currentAmount,
          total: convertService.round(currentAmount * price),
        });
      } else {
        const coin = state.coins[id];

        coin.amount = convertService.round(coin.amount + currentAmount);
        coin.total = convertService.round(coin.amount * price);
      }
      updateCoin(state, currentAmount, price);
    },
    sell: (state, action) => {
      let currentAmount = action.payload.amount;
      const { coinID, data, coins } = setReducersVars(state, action);
      const { price } = data;
      const id = isKeyExist(coins, coinID);

      if (!currentAmount) return;

      if (id !== -1) {
        const coin = state.coins[id];

        currentAmount = currentAmount > coin.amount ? coin.amount : currentAmount;
        updateCoin(state, -currentAmount, price);
        if (coin.amount - currentAmount <= 0) {
          state.coins.splice(id, 1);
        } else {
          coin.amount = convertService.round(coin.amount - currentAmount);
          coin.total = convertService.round(coin.total - currentAmount * price);
        }
      }
    }
  }
});

export const {
  buy,
  sell,
} = portfolioBuySlice.actions;

export default portfolioBuySlice.reducer;