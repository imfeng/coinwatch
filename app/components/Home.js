// @flow
import React, { Component } from 'react';
import { map } from 'lodash';
import CoinSettings from '../modules/settings/components/CoinsSettings';

class Home extends Component {
  render() {
    return (
      <div>
        <CoinSettings />
      </div>
    );
  }
}

export default Home;
