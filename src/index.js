import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const LENDER_ADDRESS = "0x23614cad46228c932caef635ca5279"
const TOKENS = {
  '0x73de023fc01ab': {
    'symbol': 'OMG',
    'name': 'Omisego',
    'decimals': 18
  },
  '0x023e1abfc073d': {
    'symbol': 'ETH',
    'name': 'Ethereum',
    'decimals': 18
  },
  '0x048e1a2d7803a': {
    'symbol': 'ZRX',
    'name': '0x Protocol Token',
    'decimals': 18
  },
}
const MARKETS = [
    {
      pair: 'OMG/ETH',
      baseTokenAddress: '0x73de023fc01ab',
      quoteTokenAddress: '0x023e1abfc073d'
    },
    {
      pair: 'ZRX/ETH',
      baseTokenAddress: '0x048e1a2d7803a',
      quoteTokenAddress: '0x023e1abfc073d'
    }
]
ReactDOM.render(
  <App markets={MARKETS} tokens={TOKENS} lenderAddress={LENDER_ADDRESS}/> ,
  document.getElementById('root')
);
registerServiceWorker();
