const cron = require('node-cron');

const api = require('./api');
const CandleOne = require('./schemas/candleOne');
const Orderbook = require('./schemas/orderbook');
const Ticker = require('./schemas/ticker');

async function scheduler() {
  cron.schedule('*/1 * * * *', async function() {
    //1분 봉
      try{
          const data = await api.getCandleMin(5, 'KRW-BTC');

          const candleOne = await CandleOne.create({
            market: JSON.parse(data)[0].market,
            tradePrice: JSON.parse(data)[0].trade_price,
            lowPrice: JSON.parse(data)[0].low_price,
            highPrice: JSON.parse(data)[0].high_price,
            tradeVolume: JSON.parse(data)[0].candle_acc_trade_volume,
          });
          console.log(candleOne);
      } catch (err) {
        console.error(err);
      }
  });

  //호가 정보
  try{
      const data = await api.getOrderbook('KRW-BTC');
      const orderbook = await Orderbook.create({
        market: JSON.parse(data)[0].market,
        totalAskSize: JSON.parse(data)[0].total_ask_size,
        totalBidSize: JSON.parse(data)[0].total_bid_size,
      });
      console.log(orderbook);
  } catch (err) {
    console.error(err);
  }

  //ticker 조회
  try{
      const data = await api.getTicker('KRW-BTC');
      const ticker = await Ticker.create({
        market: JSON.parse(data)[0].market,
        tradePrice: JSON.parse(data)[0].trade_price,
        tradeVolume: JSON.parse(data)[0].trade_volume,
      });
      console.log(ticker);
  } catch (err) {
    console.error(err);
  }

}

module.exports.scheduler = scheduler;
