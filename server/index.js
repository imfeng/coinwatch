require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const lodash = require('lodash');
// const telegramBot = require('node-telegram-bot-api');
// const token = 'YOUR_TELEGRAM_BOT_TOKEN';
// const bot = new telegramBot(token, {polling: true});
const Notify_SDK = require('line-notify-sdk')
const LineSDK = new Notify_SDK(process.env.client_id, process.env.client_secret, process.env.redirect_uri)
var line_code = '3Ww7ZL7C5NGlPC8mxRLnkR'
var line_token = '';
const get_Oauth_URL = LineSDK.set_Oauth_URL('code', 'notify', 'im_a_state')
const Oauth_URL = get_Oauth_URL()
console.log(`======= LINE NOTIFY =======`);
console.log(Oauth_URL);


const OPTION = {
  monitoMiniute: 5,
}

// const token = await LineSDK.get_token_by_code(process.env.client_secret, client_code)



// bot.sendMessage()
const binance = require('node-binance-api')().options({
  APIKEY: process.env.APIKEY,
  APISECRET: process.env.APISECRET,
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
});

/**
 * `coins` array was computed using current (11/15/2018) top200 coinmarketcap.com coin list
 * from wich were retrieved the coins that are currently trading on Binance
 * https://jsbin.com/tolureluhe/edit?html,js,output
 */
const coins = [
  'BTCUSDT',
  'LUNAUSDT',
  'DEGOUSDT',
  'ALGOUSDT',
  'BADGERUSDT',
  'REEFUSDT',
  'FTTUSDT',
  'CHZUSDT',
  'MATICUSDT', // 長線購買
  'SOLUSDT',
  'MANAUSDT',
  'THETAUSDT',
  'COMPUSDT',
  'CTKUSDT',
  'DOGEUSDT',
  'ADAUSDT',
  'AXSUSDT',
  'RUNEUSDT',
  'DODOUSDT',
  'ETHUSDT',
  'DEXEUSDT',
  'CRVUSDT',
  'RENUSDT',
  'PERPUSDT',
  'CHRUSDT',
  'C98USDT',
  'FILUSDT',
  'AVAXUSDT',
  'IOTAUSDT',
  'DOTUSDT',
  'EPSUSDT',
  'PERPUSDT',
  'ANKRUSDT',
  'ICPUSDT',
  'FLOWUSDT',
  'SANDUSDT',
  'KAVAUSDT',
  'ZECUSDT',
  'FTMUSDT',
  'SRMUSDT',
  'BNBUSDT',
  'RAYUSDT',
  'NEARUSDT',
  'LUNAUSDT',
  'ENJUSDT',
  'COTIUSDT',
  'ALICEUSDT',
  'GRTUSDT',
  'KSMUSDT',
  'TRXUSDT',
  'BATUSDT',
  'SCUSDT',
  'AUDIOUSDT',
  'SXPUSDT',
  '1INCHUSDT',
  'UNIUSDT',
  'CAKEUSDT',
  'SUSHIUSDT',
  'THETAUSDT',
  'AKROUSDT',
  'SUNUSDT',
  'DERPUSDT',
  'PNTUSDT',
  'DENTUSDT',
  'VETUSDT',
  'SHIBUSDT',
  'OCEANUSDT',
];


const app = express();
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));
const PORT = process.env.PORT || 3231;

app.use(express.static(`build`));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
const isIterable = function (obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

const getCoinsBinanceRequests = (timestamp, limit) => {
  return coins.map((i, index, arr) => {
    return new Promise((resolve, reject) => binance.candlesticks(i, timestamp, (error, ticks, symbol) => {
      if (isIterable(ticks)) {
        let dayData = ticks.reduce((acc, curr, i, ar) => {
          acc[i] = {
            'time': ar[i][0],
            'open': ar[i][1],
            'high': ar[i][2],
            'low': ar[i][3],
            'close': ar[i][4],
            'volume': ar[i][5],
            'closeTime': ar[i][6],
            'assetVolume': ar[i][7],
            'trades': ar[i][8],
            'buyBaseVolume': ar[i][9],
            'buyAssetVolume': ar[i][10],
            'ignored': ar[i][11],
          }
          return acc
        }, [])
        resolve({
          [i]: dayData,
          symbol
        })
      }
    }, {
      limit: limit,
      endTime: new Date().getTime()
    }));
  })
}

const getBinanceCoinsResults = async (timestamp, limit) => {
  let promisesArray = getCoinsBinanceRequests(timestamp, limit);
  return await Promise.all(promisesArray);
}

app.get('/api/coins', async (req, res) => {
  const result = await getBinanceCoinsResults(req.query.timestamp, req.query.limit);
  res.send({
    result
  })
})

app.post('/', async (req, res) => {

  let endpoints = binance.websockets.subscriptions();
  for (let endpoint in endpoints) {
    binance.websockets.terminate(endpoint);
  }
  initBinanceSocket(req.body.timestamp, req.body.limit);
  res.sendStatus(200);
});

function initBinanceSocket(tstamp, limit) {
  tstamp = tstamp ? tstamp : '15m';
  limit = limit ? limit : 1;
  return binance.websockets.chart(coins, tstamp, (symbol, interval, chart) => {
    console.log({
      symbol,
      interval,
      chart
    });

    io.emit('retrieve', {
      nr: coins.length,
      interval,
      symbol,
      [symbol]: chart
    });
  }, limit);
}

server.listen(PORT);
// initBinanceSocket()

const runner = async () => {
  console.log('runner start!')
  const queryList = [{
      timestamp: '5m',
      limit: 3,
    },
    {
      timestamp: '15m',
      limit: 3,
    },
    {
      timestamp: '1h',
      limit: 3,
    },
    {
      timestamp: '4h',
      limit: 3,
    },
    {
      timestamp: '8h',
      limit: 2,
    },
    {
      timestamp: '1d',
      limit: 3,
    },
  ];
  const allRequests = queryList.map(item => getCoinsBinanceRequests(item.timestamp, item.limit));

  const coinsRate = {};

  for (let index = 0; index < allRequests.length; index++) {
    const promises = allRequests[index];
    const result = await Promise.all(promises);
    const timestamp = queryList[index].timestamp;
    const limit = queryList[index].limit;
    await delay(5000);
    console.log(`============= START timestamp=${timestamp}, limit=${limit} ==============`)
    // console.log(result);
    const tmp = result.map(coinItem => marginDetector(coinItem));
    tmp.forEach(item => {
      if(!coinsRate[item.pair]) {
        coinsRate[item.pair] = [];
      }
      coinsRate[item.pair].push({
        timestamp,
        limit,
        price_rate: item.price_rate,
        volume_rate: item.volume_rate,
      });
    })
    console.log(coinsRate);
    console.log(`============= END timestamp=${timestamp}, limit=${limit} ==============`)
  }

  var rateMap = Object.keys(coinsRate).map(pair => {
    return coinsRate[pair].reduce((acc, item) => {
      acc.p_mr_rate += item.price_rate;
      acc.v_mr_rate += item.volume_rate;
      return acc;
    }, {
      pair,
      p_mr_rate: 0,
      v_mr_rate: 0,
    })
  });
  rateMap = lodash.sortBy(rateMap, ['v_mr_rate', 'p_mr_rate']);
  // console.log(rateMap);
  const {
    volumePairs,
    PricePairs,
  } = pickGoodPair(rateMap)
  if(volumePairs.length > 0 || PricePairs.length > 0) {
    const msg = notifyPair(volumePairs, PricePairs);
    console.log(msg);
    await sendLineMessage(msg);
  } else {
    console.log(`${new Date().toLocaleDateString()} ${new Date().toTimeString()}: 無候選名單`)
  }
}
setInterval(runner, 1000 * 60 * OPTION.monitoMiniute);
sendLineMessage(`幣圈監控程式開始運行！(每 ${OPTION.monitoMiniute} 分鐘監控 1 次)`);
async function sendLineMessage(msg) {
  try {
    if(!line_token) {
      line_token= await LineSDK.get_token_by_code(process.env.client_secret, line_code)
    }
    await LineSDK.notify(line_token, msg)

  } catch (error) {
    console.log('line error:', error);
  }
}

function notifyPair(volumePairs, PricePairs) {
  return `[領先指標]
${new Date().toLocaleDateString()} ${new Date().toTimeString()}
------
最佳出量幣對：
${volumePairs.map(item => `${item.pair} = ${item.v_mr_rate}`).join('\n')}
------
最佳價格上漲幣對：
${PricePairs.map(item => `${item.pair} = ${item.p_mr_rate}`).join('\n')}
`
}

function pickGoodPair(rateMap) {
  const filterVolumeRate = 20;
  const filterPriceRate = 10;

  const volumePairs = rateMap.filter(item => item.v_mr_rate >= filterVolumeRate);
  const PricePairs = rateMap.filter(item => item.p_mr_rate >= filterPriceRate);

  return {
    volumePairs,
    PricePairs,
  };
}

function marginDetector(coinItem) {
  const symbolcoin = coinItem['symbol'];
  const datas = coinItem[symbolcoin];
  // console.log(`symbolcoin=${symbolcoin}:\n`);
  // console.log(datas);
  const p_mr = priceMarginCaculator(datas)
  const v_mr = volumeMarginCaculator(datas)
  return {
    pair: symbolcoin,
    price_min_high_margin: p_mr,
    volume_min_high_margin: v_mr,
    price_rate: marginRate(p_mr),
    volume_rate: marginRate(v_mr)
  }
}

function marginRate(mr) { // 量價指標
  var rate = 0;
  if(mr > 0) {
    rate += Math.ceil(mr / 10);
  } else {
    rate -= Math.min(Math.ceil(Math.abs(mr) / 10), 2);;
  }
  return rate;
}

function priceMarginCaculator(datas) {
  const firstLow = Math.min(...datas.map(item => item.low));
  const lastHigh = datas.slice(-1)[0].high;
  // const lastHigh = Math.max(...datas.map(item => item.high));
  return Math.round((lastHigh - firstLow) / firstLow * 1000) / 10; // %
}

function volumeMarginCaculator(datas) {
  const firstLow = datas[0].volume;
  const lastHigh = datas.slice(-1)[0].volume;
  // const firstLow = Math.min(...datas.map(item => item.volume));
  // const lastHigh = Math.max(...datas.map(item => item.volume));
  return Math.round((lastHigh - firstLow) / firstLow * 1000) / 10; // %
}


function delay(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}