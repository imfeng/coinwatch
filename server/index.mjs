/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http'
import socket from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'
import BinanceAPI from 'node-binance-api'
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const lodash = require('lodash');
// const telegramBot = require('node-telegram-bot-api');
// const token = 'YOUR_TELEGRAM_BOT_TOKEN';
// const bot = new telegramBot(token, {polling: true});

// LINE
import Notify_SDK from 'line-notify-sdk'
// const Notify_SDK = require('line-notify-sdk')
const LineSDK = new Notify_SDK(process.env.client_id, process.env.client_secret, process.env.redirect_uri)
var line_code = 'yA3NvbWUtvFfGkfIk2wMMZ'
var line_token = '8Tgu9VktPaRQ3nsotvkoEKbmd50GY8zMUbb5C8BPMnv';
const get_Oauth_URL = LineSDK.set_Oauth_URL('code', 'notify', 'im_a_state')
const Oauth_URL = get_Oauth_URL()
console.log(`======= LINE NOTIFY =======`);
console.log(Oauth_URL);

// INFO: LowDB
// console.log(__dirname)
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)
// const file = join(dirname(fileURLToPath(import.meta.url)), 'db.json')
const lowdb_key_map = {
  notifies:'notifies',
  history:'history',
  pairRankMap: 'pairRankMap',
}
const initLowDB = async () => {
  await db.read()
  Object.keys(lowdb_key_map).forEach(key => {
    if(!db.data[key]) {
      writeDB(key, []);
      console.log(key, 'missing')
    }
  })
  await db.read()
  console.log(db.data);
}
initLowDB();

const pushDB = async (key, data) => {
  db.data[key].push(data);
  await db.write()
}

const writeDB = async (key, data) => {
  db.data[key] = data;
  await db.write()
}

const readDB = (key, dvalue = {}) => {
  const data = db.data[key];
  return data ? data : dvalue;
}

// Use JSON file for storage


const OPTION = {
  // mode: 'debug',
  monitoMiniute: 3,
  filterVolumeRate: 500,
  filterMinPrice: 1,
  filterPriceRate: 2.5,
  filterPriceLowRate: 2.5,
}

// const token = await LineSDK.get_token_by_code(process.env.client_secret, client_code)



// bot.sendMessage()
const binance = BinanceAPI().options({
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
  'TRUUSDT',
  'PNTUSDT',
  'DENTUSDT',
  'VETUSDT',
  'SHIBUSDT',
  'OCEANUSDT',
  'TOMOUSDT',
  'XRPUSDT',
  'XLMUSDT',
  'ATAUSDT',
  'BURGERUSDT',
  // 'ARUSDT',
  // 'NEOSDT',


];


const app = express();
const server = http.Server(app);
const io = socket(server);
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

const requestCoinBinance = (i, index, arr, timestamp, limit) => {
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
}

const getCoinsBinanceRequests = async (timestamp, limit) => {
  const results = [];
  const con_reqs = 12;

  for (let index = 0; index < coins.length; index++) {
    const i = coins[index];
    results.push(requestCoinBinance(i, index, coins, timestamp, limit));
    if((index+1) % con_reqs === 0) {
      await delay(1000);
    }
  }

  return results;
}

const getBinanceCoinsResults = async (timestamp, limit) => {
  let promisesArray = await getCoinsBinanceRequests(timestamp, limit);
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
// 急漲 vs 緩漲
const queryList = [
  // {
  //   timestamp: '1d',
  //   limit: 3,
  //   weight: 0.2,
  // },
  // {
  //   timestamp: '8h',
  //   limit: 2,
  //   weight: 0.2,
  // },
  // {
  //   timestamp: '4h',
  //   limit: 3,
  //   weight: 0.2,
  // },
  {
    timestamp: '1h',
    limit: 4,
    weight: 0.3,
  },
  {
    timestamp: '15m',
    limit: 4,
    weight: 0.7,
  },
  {
    timestamp: '5m',
    limit: 5,
    weight: 1,
  },
  {
    timestamp: '1m',
    limit: 10,
    weight: 1,
  },
];
const runner = async () => {
  console.log('runner start!')
  
  const allRequests = []; // queryList.map(item => getCoinsBinanceRequests(item.timestamp, item.limit));
  for (let index = 0; index < queryList.length; index++) {
    const element = queryList[index];
    const r = await getCoinsBinanceRequests(element.timestamp, element.limit);
    allRequests.push(r);
  }

  const coinsRate = {};

  for (let index = 0; index < allRequests.length; index++) {
    const promises = allRequests[index];
    const result = await Promise.all(promises);
    const timestamp = queryList[index].timestamp;
    const limit = queryList[index].limit;
    const weight = queryList[index].weight;
    console.log(`============= ${new Date().toTimeString()} START timestamp=${timestamp}, limit=${limit} ==============`)
    // console.log(result);
    const tmp = result.map(coinItem => marginDetector(coinItem));
    tmp.forEach(item => {
      if(!coinsRate[item.pair]) {
        coinsRate[item.pair] = [];
      }
      coinsRate[item.pair].push({
        timestamp,
        limit,
        price_rate: item.price_rate * weight,
        volume_rate: item.volume_rate * weight,
      });
    })
    // debugLogger(coinsRate);
    // console.log(`============= END timestamp=${timestamp}, limit=${limit} ==============`)
    await delay(3000);
  }
  debugLogger(coinsRate)
  const totalWeight = queryList.reduce((acc, q) => acc + q.weight, 0)
  var rateMap = Object.keys(coinsRate).map(pair => {
    return coinsRate[pair].reduce((acc, item) => {
      acc.p_mr_rate += item.price_rate / totalWeight;
      acc.v_mr_rate += item.volume_rate / totalWeight;
      return acc;
    }, {
      pair,
      p_mr_rate: 0,
      v_mr_rate: 0,
    })
  });
  rateMap = rateMap.sort((a, b) => (a.v_mr_rate + a.p_mr_rate) - (b.v_mr_rate + b.p_mr_rate)) // lodash.sortBy(rateMap, ['v_mr_rate', 'p_mr_rate']);
  debugLogger(rateMap);
  pushDB(lowdb_key_map.history, rateMap);
  const {
    volumePairs,
    PricePairs,
    PriceLowPairs,
    btcusdt,
  } = pickGoodPair(rateMap)
  if(volumePairs.length > 0 || PricePairs.length > 0) {
    setPairRankMap(volumePairs, PricePairs, PriceLowPairs);
    const msg = notifyPair(volumePairs, PricePairs, PriceLowPairs, btcusdt);
    pushDB(lowdb_key_map.notifies, {
      volumePairs, PricePairs, btcusdt, queryList,
      OPTION,
    });
    logger(msg);
    await sendLineMessage(msg);
  } else {
    logger(`${new Date().toLocaleDateString()} ${new Date().toTimeString()}: 無候選名單`)
  }
}
runner();
setInterval(runner, 1000 * 60 * OPTION.monitoMiniute);
sendLineMessage(`
幣圈監控程式開始運行！(每 ${OPTION.monitoMiniute} 分鐘監控 1 次)
K線監控範圍：  ${queryList.map(q => `${q.timestamp}(${q.weight})`).join(', ')}
指標敏感度：
出量指標 >= ${OPTION.filterVolumeRate}
上漲指標 >= ${OPTION.filterPriceRate}`);
async function sendLineMessage(msg) {
  if(OPTION.mode === 'debug') return;
  try {
    if(!line_token) {
      line_token= await LineSDK.get_token_by_code(process.env.client_secret, line_code)
      console.log(line_token);
    }
    await LineSDK.notify(line_token, msg)

  } catch (error) {
    console.log('line error:', error);
  }
}
const pairRankMap = readDB('pairRankMap', {volumePairs: {}, PricePairs: {}, PriceLowPairs: {}});
function setPairRankMap(volumePairs, PricePairs, PriceLowPairs) {
  ['volumePairs', 'PricePairs', 'PriceLowPairs'].forEach(key => {
    volumePairs.forEach(item => {
      addOne(pairRankMap[key], item.pair)
    });
  });
  function addOne(obj, key) {
    if(!obj[key]) {
      obj[key] = 0;
    }
    obj[key] += 1;
  }
  writeDB(pairRankMap);
}
function notifyPair(volumePairs, PricePairs, PriceLowPairs, btcusdt) {

  return `[領先指標]
${new Date().toLocaleDateString()} ${new Date().toTimeString()}
BTCUSDT: p-rate = ${getRate(btcusdt.p_mr_rate)}, v-rate = ${getRate(btcusdt.v_mr_rate)}
------
短期出量：
${volumePairs.map(item => `${item.pair} = ${getRate(item.v_mr_rate)}, p-rate = ${getRate(item.p_mr_rate)} (${pairRankMap['volumePairs'][item.pair] ? pairRankMap['volumePairs'][item.pair] : 0})`).join('\n')} 
------
上漲：
${PricePairs.map(item => `${item.pair} = ${getRate(item.p_mr_rate)}, v-rate = ${getRate(item.v_mr_rate)} (${pairRankMap['volumePairs'][item.pair] ? pairRankMap['volumePairs'][item.pair] : 0})`).join('\n')}
------
下跌：
${PriceLowPairs.map(item => `${item.pair} = ${getRate(item.p_mr_rate)}, v-rate = ${getRate(item.v_mr_rate)} (${pairRankMap['PriceLowPairs'][item.pair] ? pairRankMap['PriceLowPairs'][item.pair] : 0})`).join('\n')}
------
出量上漲：
${findSame(volumePairs, PricePairs).map(item => `${item.pair}: v-rate = ${getRate(item.v_mr_rate)}, p-rate = ${getRate(item.p_mr_rate)}`).join('\n')}
------
出量下跌：
${findSame(volumePairs, PriceLowPairs).map(item => `${item.pair}: v-rate = ${getRate(item.v_mr_rate)}, p-rate = ${getRate(item.p_mr_rate)}`).join('\n')} 
`
  function findSame(a, b) {
    return a.filter(item => b.includes(item.pair));
  }
}

function getRate(rate) {
  return Math.round(rate * 100) / 100
}

function pickGoodPair(rateMap) {
  const volumePairs = rateMap.filter(item => item.v_mr_rate >= OPTION.filterVolumeRate && item.p_mr_rate >= OPTION.filterMinPrice);
  const PricePairs = rateMap.filter(item => item.p_mr_rate >= OPTION.filterPriceRate);
  const PriceLowPairs = rateMap.filter(item => item.p_mr_rate <= OPTION.filterPriceLowRate);
  const btcusdt = rateMap.find(item => item.pair === 'BTCUSDT');
  return {
    volumePairs,
    PricePairs,
    PriceLowPairs,
    btcusdt,
  };
}

function marginDetector(coinItem) {
  const symbolcoin = coinItem['symbol'];
  const datas = coinItem[symbolcoin];
  // console.log(`symbolcoin=${symbolcoin}:\n`);
  // debugLogger(datas);
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
  rate += mr;
  // if(mr > 0) {
  //   rate += Math.ceil(mr / 10);
  // } else {
  //   rate -= Math.min(Math.ceil(Math.abs(mr) / 10), 2);;
  // }
  return rate;
}

function priceMarginCaculator(datas) {
  const firstLow = Math.min(...datas.map(item => item.low));
  const lastHigh = datas.slice(-1)[0].high;
  // const lastHigh = Math.max(...datas.map(item => item.high));
  return Math.round((lastHigh - firstLow) / firstLow * 1000) / 10; // %
}

function volumeMarginCaculator(datas) {
  // const firstLow = datas[0].volume;
  var firstLow = Math.min(...datas.slice(0, -1).map(d => d.volume));
  firstLow = firstLow > 0 ? firstLow : 1;
  const lastHigh = datas.slice(-1)[0].volume;
  // const firstLow = Math.min(...datas.map(item => item.volume));
  // const lastHigh = Math.max(...datas.map(item => item.volume));
  return Math.round((lastHigh - firstLow) / firstLow * 1000) / 10; // %
}


async function slowPromiseAll(promises) {
  const third = Math.ceil(promises.length / 3);
  
  const a = await Promise.all(promises.slice(0, third));
  await delay(1000)
  const b = await Promise.all(promises.slice(third, third * 2));
  await delay(1000)
  const c = await Promise.all(promises.slice(third * 2));
  return [...a, ...b, ...c]
}

function delay(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}

function debugLogger(msg) {
  return logger(msg, 'debug');
}
function logger(msg, mode = 'info') {
  if(OPTION.mode === 'debug') {
    return console.log(msg)
  }
  if(mode === 'info') {
    return console.log(msg)
  }
}