import React, { Component } from 'react';
import Treemap from './components/Treemap';
import DataTableComponent from './components/DataTable';
import io from 'socket.io-client';
import axios from 'axios';
import update from 'immutability-helper';
import _live from './utils';
import Spinner from 'react-spinkit';
import Header from './components/Header';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3001'

let initialState = {
  isActive: true,
  selected: { '5m': 'active' },
  isLive: false,
  socket: null,
  data: {},
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    axios
      .get('/api/coins', {
      // .get('http://localhost:3231/api/coins', {
        params: {
          timestamp: '5m',
          limit: 48
        }
      })
      .then(response => {
        let res = response.data.result.reduce((acc, curr, i) => {
          acc[curr['symbol']] = curr[curr['symbol']];
          return acc;
        }, {});
        this.setState({ data: res });
      })
      .catch(err => err);
  }

  computeLimit = (time) => {
    // let minDiff = new Date().getTime() - new Date().setHours(0,0,0,0)
    // let mins = Math.floor(minDiff / 60000)
    switch (time) {
      case '1m': return 48
      case '5m': return 48
      case '15m': return 16
      case '30m': return 8
      case '1h': return 5
      case '4h': return 5
      case '8h': return 4
      case '1d': return 4
      case '1w': return 2
      case '1M': return 2
      default:
        break;
    }
  }

  connectSocket = t => {
    const socket = io('/');
    // const socket = io('http://localhost:3231/');
    this.setState({ socket });
    if (typeof t !== 'string') this.setState({ isLive: !this.state.isLive });

    socket.on('retrieve', res => {
      let symbolDataObject = res[res['symbol']]; // coin object containing all data for every timestamp
      let k = Object.keys(symbolDataObject); // all timestamp keys
      let lastTimestamp = k[k.length-1]
      let lastTickIndex = this.state.data[res['symbol']].length-1
        /**
         * using immutability helper here to update a nested state property
         */
        const newData = update(this.state, {
          data: {
            [res['symbol']]: {
              [lastTickIndex]: { volume: { $set: symbolDataObject[lastTimestamp].volume } }
            }
          }
        });
        this.setState({ data: newData.data });
    });

    const interval = Object.keys(this.state.selected)[0];

    axios
      .post('/', {
      // .post('http://localhost:3231/', {
        timestamp: t || interval,
        limit: this.computeLimit(t || interval)
      })
      .catch(err => err);
  };

  getTreemapData = () => {
    const { data } = this.state;
    const dataKeys = Object.keys(data);

    if (dataKeys.length) {
      const coins = dataKeys.map(i => {
        let name = i;
        let last_tick = data[i][data[i].length - 1];
        let pre_last_tick = data[i][0];
        let prevTicks = data[i].slice(0, -1);
        let medVol =
          prevTicks.reduce((acc, curr, x, arr) => {
            acc = acc + Number(curr.volume);
            return acc;
          }, 0) / prevTicks.length;
        let change = medVol !== 0 ? (last_tick.volume / medVol).toFixed(3) : 0;
        let loc = change > 0 ? Math.round(change * 100) / 100 : 0;
        let open = last_tick.open;
        let close = last_tick.close;
        let time = Math.abs(last_tick.time - pre_last_tick.time) / 36e5;
        let prch =
          open < close
            ? (close / open) * 100 - 100
            : 100 - (open / close) * 100;
        let color = this.computeColor(prch);

        return {
          time,
          open,
          name:
            name.slice(-4) == 'USDT' ? name.slice(0, -4) : name.slice(0, -3),
          loc,
          prch: prch.toFixed(2),
          color
        };
      });
      return coins;
    }
    return { name: 'g', loc: 32, prch: 3, color: 'red' };
  };

  computeColor = prch => {
    if (prch < 0) {
      return prch < -1
        ? prch < -3
          ? prch < -7
            ? '#DB4B38'
            : '#E97253'
          : '#EE9778'
        : '#fcd3bf';
    }
    return prch > 2
      ? prch > 5
        ? prch > 10
          ? '#5FA964'
          : '#ACD6A0'
        : '#CDE7C2'
      : '#e4efdc';
  };

  handleLiveClick = e => {
    if (this.state.isLive) {
      this.state.socket.disconnect();
      this.setState({ isLive: false });
      return;
    }
    this.connectSocket();
  };

  handleClick = e => {
    let self = this;
    this.setState({
      selected: { [e.target.value]: 'active' },
      isActive: false
    });
    if (this.state.isLive) {
      this.state.socket.disconnect();
      this.connectSocket(e.target.value);
    }
    axios
      .get('/api/coins', {
      // .get('http://localhost:3231/api/coins', {
        params: {
          timestamp: e.target.value,
          limit: this.computeLimit(e.target.value)
        }
      })
      .then(function(response) {
        let res = response.data.result.reduce((acc, curr, i) => {
          acc[curr['symbol']] = curr[curr['symbol']];
          return acc;
        }, {});
        self.setState({ data: res, isActive: true });
      })
      .catch(function(error) {});
  };

  render() {
    const { isLive, isActive, selected } = this.state;
    const { data: raw } = this.state;
    const data = Object.entries(raw).map(([key, arr]) => {
      const latest = arr.slice(-1)[0];
      const past = arr.slice(-2)[0];
      const price = point(latest.high);
      const p_avr = arr.slice(0, -2).reduce((acc, x) => acc + Number(x.low), 0) / (arr.length - 1);
      const p_margin = getPercentage(p_avr, Number(latest.high));

      const v_avr = arr.reduce((acc, x) => acc + Number(x.volume), 0) / arr.length;
      const v_margin_avr = getPercentage(v_avr, Number(latest.volume));
      const v_margin_past = getPercentage(v_avr, Number(past.volume));

      return {
        pair: key,
        // latest,
        // past,
        price,
        p_avr,
        p_margin,
        v_avr,
        v_margin_avr,
        v_margin_past,
      }
    })

    // let data = this.getTreemapData();
    return (
      <div className="App">
        <Header
          isLive={isLive}
          isActive={isActive}
          selected={selected}
          handleClick={this.handleClick}
          handleLiveClick={this.handleLiveClick}
        />
        <div className="tree">
          <DataTableComponent data={data} />
        </div>
        {/* {data.length > 90 && isActive ? (
          <div className="tree">
            <DataTableComponent data={data} />
          </div>
        ) : (
          <Spinner fadeIn="none" className="spinner" />
        )} */}
      </div>
    );
  }
}

export default App;


function point(num, p = 2) {
  const basedouble = p * p;
  return parseInt(num * basedouble - basedouble) / basedouble;
}

function getPercentage(num, n2) {
  return parseInt(num / n2 * 10000 - 10000) / 100;
}