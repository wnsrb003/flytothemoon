const request = require('request');
const uuidv4 = require("uuid/v4");
const sign = require('jsonwebtoken').sign;
// const fetch = require('node-fetch');

module.exports = {
  getAPIKey:
    function () {
      const access_key = process.env.UPBIT_OPEN_API_ACCESS_KEY;
      const secret_key = process.env.UPBIT_OPEN_API_SECRET_KEY;
      const server_url = process.env.UPBIT_OPEN_API_SERVER_URL;

      const payload = {
          access_key: access_key,
          nonce: uuidv4(),
      };

      const token = sign(payload, secret_key);

      const options = {
          method: "GET",
          url: server_url + "/v1/api_keys",
          headers: {Authorization: `Bearer ${token}`},
      };

      request(options, (error, response, body) => {
          if (error) throw new Error(error);
          console.log(body);
      });
    },

  getCandleMin:
    function (minutes, market) {
      // const minutes = value;
      const url = `https://api.upbit.com/v1/candles/minutes/${minutes}?market=${market}&count=1`;
      const options = {method: 'GET', headers: {Accept: 'application/json'}};

      return new Promise(resolve=> {
        request(url, (error, response, body) => {
          if (error) throw new Error(error);
          resolve(body);
      });
    });
    },

  getCandleDay:
    function (market) {
      const url = `https://api.upbit.com/v1/candles/days?market=${market}&count=1`;
      const options = {method: 'GET', headers: {Accept: 'application/json'}};

      return new Promise(resolve=> {
        request(url, (error, response, body) => {
          if (error) throw new Error(error);
          resolve(body);
      });
    });
    },

  getCandleWeek:
    function (market) {
      const url = `https://api.upbit.com/v1/candles/weeks?market=${market}&count=1`;
      const options = {method: 'GET', headers: {Accept: 'application/json'}};

      return new Promise(resolve=> {
        request(url, (error, response, body) => {
          if (error) throw new Error(error);
          resolve(body);
      });
    });
    },

  getCandleMonth:
    function (market) {
      const url = `https://api.upbit.com/v1/candles/months?${market}&count=1`;
      const options = {method: 'GET', headers: {Accept: 'application/json'}};

      return new Promise(resolve=> {
        request(url, (error, response, body) => {
          if (error) throw new Error(error);
          resolve(body);
      });
    });
  },

  //?????? ?????? ??????
  // trade_price	?????? ??????	Double
  // trade_volume	?????????	Double
  getTicker:
    function (market) {
      const url = `https://api.upbit.com/v1/trades/ticks?market=${market}&count=1`;
      const options = {method: 'GET', headers: {Accept: 'application/json'}};

      return new Promise(resolve=> {
        request(url, (error, response, body) => {
          if (error) throw new Error(error);
          resolve(body);
      });
    });
  },

  //?????? ?????? ?????? ??????
  // total_ask_size	?????? ?????? ??? ??????	Double
  // total_bid_size	?????? ?????? ??? ??????  Double
  getOrderbook:
    function (market) {
      const url = `https://api.upbit.com/v1/orderbook?markets=${market}`;
      const options = {method: 'GET', headers: {Accept: 'application/json'}};

      return new Promise(resolve=> {
        request(url, (error, response, body) => {
          if (error) throw new Error(error);
          resolve(body);
      });
    });
  },
};
